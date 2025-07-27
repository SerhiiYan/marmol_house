// src/pages/FrameHousesService.jsx

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, } from '@heroicons/react/24/outline';
import TechnologyBenefits from '../components/TechnologyBenefits';
import FrameHouseImage from '../assets/blueprint6.png';
import { allPackages } from '../data/packagesData'; 
import { frameHouseBenefits, frameHouseSteps } from '../data/servicesData';
import { generalBenefits } from '../data/siteData';
import OurBenefits from '../components/OurBenefits';
import ProcessSteps from '../components/ProcessSteps';


const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://marmolhouse.by/' },
    { '@type': 'ListItem', position: 2, name: 'Каркасные дома', item: 'https://marmolhouse.by/services/frame-houses' }, // Предполагаемый URL
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://marmolhouse.by/services/frame-houses#service',
  'serviceType': 'Строительство каркасных домов под ключ',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'Marmol House',
    'image': 'https://marmolhouse.by/og-image.png',
    'telephone': '+375291845481',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'г. Гродно, ул. Лелевеля, 12A, к 6',
      'addressLocality': 'Гродно',
      'addressCountry': 'BY',
    }
  },
  'areaServed': [
      { '@type': 'City', 'name': 'Гродно' },
      { '@type': 'Country', 'name': 'Беларусь' }
  ],
  'description': 'Строительство современных и энергоэффективных каркасных домов в Гродно и по всей Беларуси. Официальная гарантия 5 лет, фиксированная цена.',
  'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Комплектации каркасных домов'
  }
};

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  'name': 'Комплектации каркасных домов',
  'itemOffered': {
    '@type': 'Service',
    '@id': 'https://marmolhouse.by/services/frame-houses#service'
  },
  'itemListElement': Object.entries(allPackages).map(([name, data]) => ({
    '@type': 'Offer',
    'itemOffered': {
      '@type': 'Service',
      'name': `Строительство каркасного дома, комплектация "${name}"`
    },
    'priceSpecification': {
      '@type': 'PriceSpecification',
      'price': data.price,
      'priceCurrency': 'BYN',
      'unitText': 'за м²'
    }
  }))
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Как мы строим каркасный дом',
    'description': 'Пошаговый процесс строительства вашего каркасного дома от проекта и фундамента до наружной отделки.',
    'totalTime': 'P3M',
    'step': frameHouseSteps.map((step, index) => ({
        '@type': 'HowToStep',
        'name': step.name,
        'text': step.description,
        'url': `https://marmolhouse.by/services/frame-houses#step-${index + 1}`,
        'image': `https://marmolhouse.by${step.image}`
    }))
};



const FrameHousesService = ({ onOrderClick }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const [activeTab, setActiveTab] = useState('Эконом');
  
  const handleOrder = (message) => {
    if (onOrderClick) {
      onOrderClick(message);
    } else {
      console.error("Проблема: функция onOrderClick не была передана в компонент FrameHousesService.");
    }
  };

  return (
    <>
      <title>Каркасные дома под ключ в Гродно и Беларуси | Marmol House</title>
      <meta name="description" content="Закажите строительство современного и теплого каркасного дома под ключ от Marmol House. Гарантия 5 лет, фиксированная цена в договоре, сроки от 3 месяцев." />
      <link rel="canonical" href="https://marmolhouse.by/services/frame-houses" />
      <meta property="og:title" content="Каркасные дома под ключ | Marmol House" />
      <meta property="og:description" content="Строим современные и энергоэффективные дома с гарантией и по фиксированной цене." />
      <meta property="og:url" content="https://marmolhouse.by/services/frame-houses" />
      <meta property="og:image" content="https://marmolhouse.by/assets/service/framehouse.webp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

        <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/assets/service/framehouse.webp')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center px-4" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Каркасные дома под ключ</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Строим современные и энергоэффективные дома в Гродно и по всей Беларуси. С гарантией и по фиксированной цене.</p>
            <button 
              onClick={() => handleOrder("Здравствуйте, хочу консультацию по строительству каркасного дома.")}
              className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform">
              Получить консультацию
            </button>
          </div>
        </section>

        <TechnologyBenefits 
          title="Почему выбирают каркасные дома"
          imageSrc={FrameHouseImage}
          benefits={frameHouseBenefits}
          imageAlt="Чертеж современного каркасного дома"
          bgColor="bg-white" 
        />
        <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <OurBenefits benefits={generalBenefits} />
           <ProcessSteps
            title="Технология строительства: просто, надежно и наглядно"
            steps={frameHouseSteps}
          />
          </div>
          <section className="py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-[#17253c] mb-4" data-aos="fade-up">Что входит в стоимость?</h2>
              <p className="text-center text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">Выберите комплектацию, чтобы увидеть детальный состав работ и материалов.</p>
              
               <div className="flex justify-center mb-8 bg-gray-100 p-1.5 rounded-full" data-aos="fade-up" data-aos-delay="150">
            {Object.keys(allPackages).map(tabName => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`relative w-full px-2 py-3 rounded-full transition-colors ${activeTab === tabName ? '' : 'hover:bg-gray-200/50'}`}
              >
                {activeTab === tabName && ( 
                  <motion.div layoutId="tab-highlighter" className="absolute inset-0 bg-white shadow-md rounded-full" /> 
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className={`font-bold transition-colors ${activeTab === tabName ? 'text-[#17253c]' : 'text-gray-600'}`}>
                    {tabName}
                  </span>
                  <span className={`text-xs mt-1 transition-colors ${activeTab === tabName ? 'text-gray-500' : 'text-gray-400'}`}>
                    {allPackages[tabName].tabSubtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

              <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-[#17253c] mb-2">Комплектация "<span className="text-[#f9c615]">{activeTab}</span>" от {allPackages[activeTab].price} BYN/м²</h3>
              
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                {allPackages[activeTab].technology}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"> 
                {allPackages[activeTab].details.map((category) => (
                  <div key={category.category} className="bg-gray-50 p-6 rounded-xl border">
                    <h4 className="text-xl font-semibold text-[#17253c] mb-4">{category.category}</h4>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
            </div>
          </section>
        </div>
    </>
  );
};

export default FrameHousesService;