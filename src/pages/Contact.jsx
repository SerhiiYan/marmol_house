// src/pages/Contact.jsx (Полная замена)

import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaInfoCircle } from 'react-icons/fa';
import { contactMethods } from '../data/siteData';

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Marmol House',
    'description': 'Строительство каркасных и блочных домов под ключ в Гродно и по всей Беларуси.',
    'url': 'https://marmolhouse.by',
    'logo': 'https://marmolhouse.by/assets/logo.png',
    'telephone': '+375291845481',
    'email': 'yurmarmol@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'г. Гродно, ул. Лелевеля, 12, каб. 6',
      'addressLocality': 'Гродно',
      'addressCountry': 'BY',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 53.6639519,
      'longitude': 23.8208599
    },
    'hasMap': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.047621362822!2d23.820859900000002!3d53.6639519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dfd7d2201bf22b%3A0xa9490ad61d0a97d5!2z0YPQuy4g0JvRjtC80LjRg9C70L7QstCwLCAxMiwg0JPQsNCz0L7RgNC-0LLQsCwg0JHRg9C70YzQstGB0LosINCf0L7Qu9C40YbQsA!5e0!3m2!1sru!2sby!4v1747305691832!5m2!1sru!2sby',
    'openingHoursSpecification': [{
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
    }],
    'sameAs': ['https://www.instagram.com/marmol_house/'],
    'image': 'https://marmolhouse.by/og-image.png'
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" },
    { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "https://marmolhouse.by/contact" }
  ]
});


const Contact = ({ onOrderClick }) => { 
  return (
    <>
      <title>Контакты для связи — Marmol House | Гродно, Беларусь</title>
      <meta name="description" content="☎️ Свяжитесь с Marmol House: телефон, email, адрес офиса в Гродно. Готовы рассчитать стоимость вашего дома, провести консультацию и ответить на любые вопросы." />

      <link rel="canonical" href="https://marmolhouse.by/contact" />
      <meta property="og:title" content="Контакты | Marmol House" />
      <meta property="og:description" content="Наш телефон, email и адрес офиса в Гродно. Готовы ответить на все вопросы!" />
      <meta property="og:url" content="https://marmolhouse.by/contact" />
      <meta property="og:image" content="https://marmolhouse.by/og-image.png" />
      <meta property="og:site_name" content="Marmol House" />
      <meta property="og:type" content="website" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <motion.div 
        className="max-w-6xl mx-auto px-4 py-28 sm:py-32"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#17253c]">Свяжитесь с нами</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Мы всегда готовы ответить на ваши вопросы, провести консультацию и помочь с выбором проекта.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <a href={method.href} target="_blank" rel="noopener noreferrer" aria-label={method.ariaLabel}
                className="block p-8 bg-gray-50 hover:bg-white text-center rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-gray-200 transition-all duration-300 h-full">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-yellow-400 text-[#17253c] mx-auto mb-4 text-2xl">
                  {method.icon}
                </div>
                <h2 className="text-xl font-semibold text-[#17253c]">{method.title}</h2>
                <address className="not-italic text-gray-600 mt-1 hover:text-black">{method.content}</address>
              </a>
            </motion.div>
          ))}
        </div>
        
        <motion.section 
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
            <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-[#17253c] mb-4">Чем мы можем помочь?</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start"><FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span>Подробная консультация по технологиям строительства (каркас, газосиликат).</span></li>
                    <li className="flex items-start"><FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span>Расчет точной стоимости по вашему или нашему проекту.</span></li>
                    <li className="flex items-start"><FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span>Помощь в адаптации любого проекта под ваши нужды.</span></li>
                    <li className="flex items-start"><FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span>Запись на просмотр наших текущих и готовых объектов.</span></li>
                </ul>
            </div>
            <div className="bg-gray-900 text-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Юридическая информация</h2>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start"><FaBuilding className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span><strong>ООО "Мармоль Хаус"</strong></span></li>
                    <li className="flex items-start"><FaBuilding className="w-5 h-5 mr-3 mt-1 text-yellow-500" /><span>УНП 591536542</span></li>
                </ul>
            </div>
        </motion.section>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-[#17253c] mb-6">Наш офис на карте</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border">
            <iframe
              title="Карта офиса Marmol House"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.047621362822!2d23.820859900000002!3d53.6639519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dfd7d2201bf22b%3A0xa9490ad61d0a97d5!2z0YPQuy4g0JvRjtC80LjRg9C70L7QstCwLCAxMiwg0JPQsNCz0L7RgNC-0LLQsCwg0JHRg9C70YzQstGB0LosINCf0L7Qu9C40YbQsA!5e0!3m2!1sru!2sby!4v1747305691832!5m2!1sru!2sby&gestureHandling=greedy"
              width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;