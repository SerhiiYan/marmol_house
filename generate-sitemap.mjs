// generate-sitemap.mjs

import fs from 'fs';
// Импортируем ваши проекты. Убедитесь, что путь правильный!
// Если файл лежит, например, в src/data/projects.js, измените путь.
import projects from './src/data/projects.js'; // <-- ИЗМЕНИТЕ ПУТЬ ПРИ НЕОБХОДИМОСТИ

// --- Функция для транслитерации и создания SEO-дружественного слага ---
function slugify(text) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  // Русские символы
  const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const lat = ["a","b","v","g","d","e","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","shch", "","y","", "e","yu","ya"];

  let slug = text.toString().toLowerCase()
    // Заменяем русские символы
    .replace(/[а-яё]/g, i => lat[rus.indexOf(i)])
    // Заменяем остальные спецсимволы
    .replace(p, c => b.charAt(a.indexOf(c))) 
    .replace(/[^a-z0-9 -]/g, '') // Удаляем все, что не буквы, цифры или дефис
    .replace(/\s+/g, '-') // Заменяем пробелы на -
    .replace(/-+/g, '-')   // Заменяем несколько -- на один -

  return slug;
}

// Статичные страницы (как в прошлый раз)
const staticPages = [
  { loc: '', priority: '1.0', lastmod: '2025-07-01', changefreq: 'monthly' },
  { loc: '/about', priority: '0.8', lastmod: '2025-06-01', changefreq: 'yearly' },
  { loc: '/gallery', priority: '0.9', lastmod: '2025-07-10', changefreq: 'weekly' },
  // ... и так далее для всех ваших статичных страниц
];

const domain = 'https://marmolhouse.by';
const today = new Date().toISOString().split('T')[0]; // Сегодняшняя дата для lastmod

async function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Статичные страницы -->
  ${staticPages.map(page => `
  <url>
    <loc>${domain}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('')}

  <!-- Динамические страницы проектов (с SEO-слагами) -->
  ${projects.map(project => `
  <url>
    <loc>${domain}/projects/${slugify(project.title)}</loc>
    <lastmod>${today}</lastmod> 
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('sitemap.xml успешно сгенерирован со слагами!');
}

generateSitemap();