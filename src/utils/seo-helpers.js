// src/utils/seo-helpers.js

/**
 * Генерирует JSON-LD микроразметку для FAQPage на основе данных о комплектациях.
 * @param {Array<string>} packages - Массив названий комплектаций (напр., ["Стандарт", "Комфорт"]).
 * @param {Array<Object>} categories - Массив категорий с описаниями для каждой комплектации.
 * @returns {string} - Готовая строка JSON-LD для вставки в <script>.
 */
export const generateFaqSchema = (packages, categories) => {
  if (!packages || !categories) return '';

  const mainEntity = packages.map(pkgName => {
    // Находим индекс текущей комплектации, чтобы получить нужные данные
    const pkgIndex = packages.findIndex(p => p === pkgName);
    
    // Формируем детальный ответ на вопрос о содержимом комплектации
    const answerText = categories.map(cat => 
      `${cat.title}: ${cat.items[pkgIndex]}`
    ).join('; ').replace(/<[^>]*>?/gm, ''); // Убираем HTML-теги из ответа

    return {
      "@type": "Question",
      "name": `Что входит в комплектацию "${pkgName}"?`, // Формируем вопрос
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answerText // Формируем ответ
      }
    };
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };

  return JSON.stringify(faqSchema);
};