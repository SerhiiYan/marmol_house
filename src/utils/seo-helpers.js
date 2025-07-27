// src/utils/seo-helpers.js

/**
 * 
 * @param {Array<string>} packages 
 * @param {Array<Object>} categories 
 * @returns {string} 
 */
export const generateFaqSchema = (packages, categories) => {
  if (!packages || !categories) return '';

  const mainEntity = packages.map(pkgName => {

    const pkgIndex = packages.findIndex(p => p === pkgName);
    
    const answerText = categories.map(cat => 
      `${cat.title}: ${cat.items[pkgIndex]}`
    ).join('; ').replace(/<[^>]*>?/gm, ''); 

    return {
      "@type": "Question",
      "name": `Что входит в комплектацию "${pkgName}"?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answerText 
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