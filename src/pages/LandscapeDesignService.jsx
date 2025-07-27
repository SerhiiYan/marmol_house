// src/pages/LandscapeDesignService.jsx (Финальная версия с "умной" анимацией и ценами)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { servicePackagesLandscape } from '../data/siteData'
import {landscapeServices} from '../data/siteData'

// 2. ВСЕ НЕОБХОДИМЫЕ SEO-СХЕМЫ
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ландшафтный дизайн под ключ",
  "provider": { "@type": "LocalBusiness", "name": "Marmol House" },
  "areaServed": { "@type": "Country", "name": "Беларусь" },
  "description": "Профессиональное проектирование и благоустройство участков в Гродно. Создаем сады, газоны, системы автополива и освещения, делая ваш участок гармоничным продолжением дома.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги по ландшафтному дизайну",
    "itemListElement": landscapeServices.map(s => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": s.title } }))
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" },
    { "@type": "ListItem", "position": 2, "name": "Услуги" },
    { "@type": "ListItem", "position": 3, "name": "Ландшафтный дизайн" }
  ]
};

const LandscapeDesignService = ({ onOrderClick }) => {
    const [activeCard, setActiveCard] = useState(null);

    const overlayVariants = {
        initial: { x: "0%" },
        hover: { x: "-60%" }
    };
    const overlayTextVariants = {
        initial: { x: "0%" },
        hover: { x: "-150%" }
    };

    const handleCardClick = (title) => {
        setActiveCard(activeCard === title ? null : title);
    };


    return (
        <>
          <title>Ландшафтный дизайн под ключ в Гродно | Marmol House</title>
          <meta name="description" content="Закажите ландшафтный дизайн для вашего дома. Комплексное благоустройство участков: проектирование, газоны, автополив, мощение и освещение от команды Marmol House." />
          <link rel="canonical" href="https://marmolhouse.by/services/landscape-design" />
          <meta property="og:title" content="Ландшафтный дизайн | Marmol House" />
          <meta property="og:description" content="Превратим ваш участок в произведение искусства. Комплексное благоустройство территорий." />
          <meta property="og:url" content="https://marmolhouse.by/services/landscape-design" />
            
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

          {/* Hero Section */}
          <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/assets/service/landscape-hero.webp')" }}>
               <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-center px-4" data-aos="fade-up">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Ландшафтный дизайн</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Завершающий штрих вашего идеального дома. Создаем гармонию между архитектурой и природой.</p>
                <button onClick={() => onOrderClick("Здравствуйте, интересует консультация по ландшафтному дизайну.")}
                    className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform">
                    Получить консультацию
                </button>
              </div>
          </section>

          <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center">
                      <h2 className="text-3xl font-bold text-[#17253c]">Больше, чем просто красивый участок</h2>
                      <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                          Мы создаем продуманную среду для жизни, где каждый элемент — от дорожки до светильника — находится на своем месте. Это гармоничное продолжение вашего дома, отражающее ваш вкус и образ жизни.
                      </p>
                  </div>
              </div>
          </section>

          {/* ИНТЕРАКТИВНЫЙ БЛОК УСЛУГ */}
          <section className="py-20 bg-gray-50 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold text-[#17253c]">Наши услуги в деталях</h2>
                      <p className="mt-3 text-lg text-gray-600 lg:hidden">Нажмите на карточку, чтобы узнать больше.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {landscapeServices.map(service => (
                          <motion.div 
                              key={service.title}
                              className="relative flex w-full h-[550px] border-8 border-white shadow-2xl overflow-hidden cursor-pointer"
                              initial="initial"
                              whileHover="hover"
                              animate={activeCard === service.title ? "hover" : "initial"}
                              onClick={() => handleCardClick(service.title)}
                              data-aos="fade-up"
                          >
                              {/* Скрытый контент с деталями */}
                              <div className="absolute top-0 right-0 w-3/5 h-full bg-white p-8 overflow-y-auto z-10">
                                  <h4 className="text-2xl font-bold text-[#17253c] mb-6">{service.title}</h4>
                                  <p className="text-sm text-gray-600 mb-6">{service.description}</p>
                                  <ul className="space-y-4">
                                      {service.subServices.map(sub => (
                                          <li key={sub.name}>
                                              <h5 className="font-semibold text-gray-800">{sub.name}</h5>
                                              <p className="text-sm text-gray-600">{sub.text}</p>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                              
                              {/* Видимый оверлей с картинкой */}
                              <motion.div className="w-full h-full z-20" variants={overlayVariants} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
                                  <div className="relative w-full h-full bg-cover bg-center flex items-end p-8 text-white" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${service.image})` }}>
                                    <div className="absolute top-4 right-4 lg:hidden text-white/70">
                                          <FaInfoCircle size={24} />
                                      </div>
                                      <motion.div className="w-full" variants={overlayTextVariants} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
                                          <div className="text-4xl mb-4"><service.icon/></div>
                                          <h3 className="text-4xl font-extrabold leading-tight">{service.title}</h3>
                                      </motion.div>
                                  </div>
                              </motion.div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>

             {/* =================================================== */}
            {/*           НОВЫЙ БЛОК С ПАКЕТАМИ И ЦЕНАМИ            */}
            {/* =================================================== */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#17253c]">Прозрачные цены на пакеты услуг</h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                            Мы предлагаем три понятных пакета, чтобы вы могли выбрать оптимальный набор услуг для вашего бюджета и задач.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {servicePackagesLandscape.map(pkg => (
                            <div key={pkg.name} className={`flex flex-col rounded-2xl p-8 border-2 ${pkg.name === 'Базовый' ? 'border-yellow-400 bg-yellow-50/50' : 'border-gray-200 bg-white'}`} data-aos="zoom-in-up">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl text-yellow-600"><pkg.icon/></div>
                                        <h3 className="text-2xl font-bold text-[#17253c]">{pkg.name}</h3>
                                    </div>
                                    <p className="text-gray-600 mt-2">{pkg.description}</p>
                                    <p className="text-4xl font-extrabold text-[#17253c] my-6">{pkg.price}</p>
                                    <ul className="space-y-3">
                                        {pkg.features.map(feature => (
                                            <li key={feature} className="flex items-start">
                                                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"/>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button 
                                    onClick={() => onOrderClick(`Интересует пакет "${pkg.name}" по ландшафтному дизайну.`)}
                                    className={`w-full mt-8 font-semibold py-3 rounded-lg transition-colors ${pkg.name === 'Базовый' ? 'bg-[#f9c615] text-[#17253c] hover:bg-[#e5b512]' : 'bg-[#17253c] text-white hover:bg-black'}`}>
                                    Заказать пакет
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandscapeDesignService;