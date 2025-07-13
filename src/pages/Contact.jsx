// src/pages/Contact.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" },
    { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "https://marmolhouse.by/contact" }
  ]
});


const contactMethods = [
  {
    icon: <FaPhone />,
    title: "Телефон",
    content: "+375 (29) 184-54-81",
    href: "tel:+375291845481",
    ariaLabel: "Позвонить в Marmol House"
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    content: "yurmarmol@gmail.com",
    href: "mailto:yurmarmol@gmail.com",
    ariaLabel: "Написать письмо в Marmol House"
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Адрес",
    content: "г. Гродно, ул. Лелевеля, 12, каб. 6",
  
    href: "https://www.google.com/maps/search/?api=1&query=г.Гродно,ул.Лелевеля,12",
    ariaLabel: "Посмотреть адрес на карте"
  }
];

const Contact = ({ onOrderClick }) => { 
  return (
    <>

      <title>Контакты для связи — Marmol House | Гродно, Беларусь</title>
      <meta name="description" content="Свяжитесь с Marmol House: телефон, email, адрес офиса в Гродно. Готовы ответить на все ваши вопросы по строительству домов." />
      <link rel="canonical" href="https://marmolhouse.by/contact" />
      <meta property="og:title" content="Контакты | Marmol House" />
      <meta property="og:url" content="https://marmolhouse.by/contact" />
      <script type="application/ld+json">{breadcrumbSchema}</script>

      <motion.section 
        className="max-w-6xl mx-auto px-4 py-28 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#17253c]">
            Свяжитесь с нами
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Мы всегда готовы ответить на ваши вопросы, провести консультацию и помочь с выбором проекта.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <a 
                href={method.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={method.ariaLabel}
                className="block p-8 bg-gray-50 hover:bg-white text-center rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-gray-200 transition-all duration-300 h-full"
              >
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-yellow-400 text-[#17253c] mx-auto mb-4">
                  <span className="text-2xl">{method.icon}</span>
                </div>
                <h2 className="text-xl font-semibold text-[#17253c]">{method.title}</h2>

                <address className="not-italic text-gray-600 mt-1 hover:text-black">
                  {method.content}
                </address>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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

        {onOrderClick && (
          <motion.div 
            className="text-center mt-16 p-8 bg-gray-900 text-white rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
            <p className="max-w-xl mx-auto mb-6 text-gray-300">
              Если вы не нашли нужную информацию, просто оставьте заявку, и наш менеджер свяжется с вами в ближайшее время.
            </p>
            <button
              onClick={() => onOrderClick('Заявка со страницы Контакты')}
              className="bg-[#f9c615] text-[#17253c] font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition-all hover:bg-[#e5b512] hover:shadow-xl hover:-translate-y-1"
            >
              Заказать консультацию
            </button>
          </motion.div>
        )}
      </motion.section>
    </>
  );
};

export default Contact;