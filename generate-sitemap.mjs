// generate-sitemap.mjs

import fs from 'fs';
import projects from './src/data/projects.js';


function slugify(text) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const lat = ["a","b","v","g","d","e","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","shch", "","y","", "e","yu","ya"];

  return text.toString().toLowerCase()
    .replace(/[а-яё]/g, i => lat[rus.indexOf(i)])
    .replace(p, c => b.charAt(a.indexOf(c))) 
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}


const staticPages = [

  { loc: '', priority: '1.0', lastmod: '2025-07-13', changefreq: 'monthly' },
  { loc: '/gallery', priority: '0.9', lastmod: '2025-07-13', changefreq: 'weekly' },
  { loc: '/completed', priority: '0.8', lastmod: '2025-07-10', changefreq: 'monthly' },
  
  { loc: '/services/frame-houses', priority: '0.9', lastmod: '2025-07-10', changefreq: 'monthly' },
  { loc: '/services/gas-silicate-houses', priority: '0.9', lastmod: '2025-07-10', changefreq: 'monthly' },
  { loc: '/services/design', priority: '0.9', lastmod: '2025-07-10', changefreq: 'monthly' },


  { loc: '/about', priority: '0.7', lastmod: '2025-06-01', changefreq: 'yearly' },
  { loc: '/contact', priority: '0.6', lastmod: '2025-06-01', changefreq: 'yearly' },
  

  { loc: '/privacy', priority: '0.3', lastmod: '2025-05-01', changefreq: 'yearly' },
];

const domain = 'https://marmolhouse.by';
const today = new Date().toISOString().split('T')[0];

async function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Статичные страницы -->
${staticPages.map(page => `
  <url>
    <loc>${domain}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}

  <!-- Динамические страницы проектов (с SEO-слагами) -->
${projects.map(project => `
  <url>
    <loc>${domain}/projects/${slugify(project.title)}</loc>
    <lastmod>${today}</lastmod> 
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf-8');
  console.log('✅ sitemap.xml успешно сгенерирован со ВСЕМИ статичными страницами!');
}

generateSitemap();