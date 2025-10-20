// prerender.js

import handler from 'serve-handler';
import http from 'http';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';

// Импортируем все наши данные
import projects from './src/data/projects.js';
import { blogPosts } from './src/data/blogData.js';
import { slugify } from './src/utils/slugify.js';

// Статические страницы, которые есть всегда
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/gallery',
  '/completed',
  '/services/frame-houses',
  '/services/gas-silicate-houses',
  '/services/business',
  '/services/design',
  '/blog',
  '/privacy'
];

// Динамически создаем роуты для каждого проекта
const projectRoutes = projects.map(p => `/projects/${slugify(p.title)}`);

// Динамически создаем роуты для каждой статьи блога
const blogPostRoutes = blogPosts.map(p => `/blog/${p.slug}`);

// Финальный массив теперь включает ВСЕ роуты
const allRoutes = [...staticRoutes, ...projectRoutes, ...blogPostRoutes];

const distPath = 'dist';
const PORT = 3000;

// Функция startServer остается без изменений
const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      return handler(request, response, { 
        public: distPath,
        rewrites: [ { source: '**', destination: '/index.html' } ]
      });
    });
    server.on('error', reject);
    server.listen(PORT, () => {
      console.log(`Сервер для пререндеринга запущен на http://localhost:${PORT}`);
      resolve(server);
    });
  });
};

// =================================================================
//      ИСПРАВЛЕННАЯ ФУНКЦИЯ ПРЕРЕНДЕРИНГА (ПОСЛЕДОВАТЕЛЬНАЯ)
// =================================================================
const prerender = async () => {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true });
  // Создаем ОДНУ вкладку, которую будем переиспользовать. Это эффективнее.
  const page = await browser.newPage(); 

  console.log(`Начинаем пререндеринг ${allRoutes.length} страниц...`);
  
  // ИСПОЛЬЗУЕМ ЦИКЛ FOR...OF ДЛЯ ПОСЛЕДОВАТЕЛЬНОЙ ОБРАБОТКИ
  for (const route of allRoutes) {
    const url = `http://localhost:${PORT}${route}`;
    
    try {
      console.log(`- Обрабатываем: ${url}`);
      
      // Переходим на новый URL в той же вкладке
      await page.goto(url, { 
        waitUntil: 'networkidle2', // Более мягкое и надежное условие
        timeout: 60000             // Увеличенный таймаут до 60 секунд
      });
      
      await page.waitForSelector('#root > *', { timeout: 10000 });
      
      const content = await page.content();
      const filePath = route === '/' 
        ? path.join(distPath, 'index.html')
        : path.join(distPath, route, 'index.html');
        
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content);
      console.log(`  > Сохранено: ${filePath}`);
    } catch (err) {
      // Если одна страница упала, мы не останавливаем весь процесс
      console.error(`  ! Ошибка при обработке ${url}:`, err.message);
    }
    // Вкладку не закрываем, она нам нужна для следующей итерации
  }

  console.log('Пререндеринг успешно завершен.');
  
  // Закрываем всё в самом конце
  await browser.close();
  server.close(() => {
    console.log('Сервер остановлен.');
    process.exit(0);
  });
};


prerender().catch(err => {
  console.error("КРИТИЧЕСКАЯ ОШИБКА В ПРОЦЕССЕ ПРЕРЕНДЕРИНГА:", err);
  process.exit(1);
});