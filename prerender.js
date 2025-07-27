// prerender.js (Улучшенная версия)

import handler from 'serve-handler';
import http from 'http';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';

// УЛУЧШЕНИЕ 1: Автоматически собираем все роуты
import projects from './src/data/projects.js'; // Убедитесь, что путь к вашим проектам правильный
import { slugify } from './src/utils/slugify.js'; // Импортируем вашу же функцию slugify

// Статические страницы, которые есть всегда
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/gallery',
  '/completed',
  '/services/frame-houses',
  '/services/gas-silicate-houses',
  '/services/landscape-design',
  '/services/design',
  '/privacy'
];

// Динамически создаем роуты для каждого проекта
const projectRoutes = projects.map(p => `/projects/${slugify(p.title)}`);

// Финальный массив всех роутов для пререндеринга
const allRoutes = [...staticRoutes, ...projectRoutes];

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

const prerender = async () => {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true });

  console.log(`Начинаем пререндеринг ${allRoutes.length} страниц...`);

  // УЛУЧШЕНИЕ 2: Распараллеливаем обработку страниц
  const CONCURRENT_PAGES = 4; // Количество одновременно обрабатываемых страниц. Подберите под мощность вашего ПК.
  
  // Создаем "пул" обещаний (promises)
  const promises = allRoutes.map(async (route) => {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    
    try {
      console.log(`- Обрабатываем: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.waitForSelector('#root > *', { timeout: 10000 });
      
      const content = await page.content();
      const filePath = route === '/' 
        ? path.join(distPath, 'index.html')
        : path.join(distPath, route, 'index.html');
        
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content);
      console.log(`  > Сохранено: ${filePath}`);
    } catch (err) {
      console.error(`  ! Ошибка при обработке ${url}:`, err.message);
    } finally {
      await page.close(); // Важно закрыть каждую страницу после использования
    }
  });

  // Запускаем все обещания на выполнение
  await Promise.all(promises);

  console.log('Пререндеринг успешно завершен.');
  await browser.close();
  
  server.close(() => {
    console.log('Сервер остановлен.');
    process.exit(0); // Успешное завершение процесса
  });
};

prerender().catch(err => {
  console.error("КРИТИЧЕСКАЯ ОШИБКА В ПРОЦЕССЕ ПРЕРЕНДЕРИНГА:", err);
  process.exit(1); // Завершение процесса с ошибкой
});