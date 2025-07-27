// src/pages/GasSilicateHousesService.jsx

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CustomPackageBlock from '../components/CustomPackageBlock';
import TechnologyBenefits from '../components/TechnologyBenefits';
import BlockHouseImage from '../assets/blueprint2.png';
import { allPackages } from '../data/packagesData'; 
import { gasSilicateBenefits, gasSilicateSteps } from '../data/servicesData';
import { generalBenefits } from '../data/siteData';
import OurBenefits from '../components/OurBenefits';
import ProcessSteps from '../components/ProcessSteps';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://marmolhouse.by/' },
    { '@type': 'ListItem', position: 2, name: 'Дома из газосиликатных блоков', item: 'https://marmolhouse.by/services/gas-silicate-houses' }, // Предполагаемый URL
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://marmolhouse.by/services/gas-silicate-houses#service',
  'serviceType': 'Строительство домов из газосиликатных блоков под ключ',
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
  'description': 'Профессиональное строительство теплых и долговечных каменных домов из газосиликатных блоков в Гродно и по всей Беларуси. Гарантия 5 лет, фиксированная цена.',
  'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Комплектации домов из газосиликата'
  }
};

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  'name': 'Комплектации домов из газосиликатных блоков',
  'itemOffered': {
    '@type': 'Service',
    '@id': 'https://marmolhouse.by/services/gas-silicate-houses#service'
  },
  'itemListElement': Object.entries(allPackages).map(([name, data], index) => ({
    '@type': 'Offer',
    'itemOffered': {
      '@type': 'Service',
      'name': `Строительство дома, комплектация "${name}"`
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
    'name': 'Как мы строим дом из газосиликатных блоков',
    'description': 'Пошаговый процесс строительства вашего будущего каменного дома от фундамента до отделки фасада.',
    'step': gasSilicateSteps.map((step, index) => ({
        '@type': 'HowToStep',
        'name': step.name,
        'text': step.description,
        'url': `https://marmolhouse.by/services/gas-silicate-houses#step-${index + 1}`, 
        'image': `https://marmolhouse.by${step.image}`
    }))
  };



const GasSilicateHousesService = ({ onOrderClick }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);


  const [activeTab, setActiveTab] = useState('Премиум+');
  
  const handleOrder = (message) => {
    if (onOrderClick) {
      onOrderClick(message);
    } else {
      console.error("Проблема: функция onOrderClick не была передана в GasSilicateHousesService.");
    }
  };

  return (
    <>
        <title>Дома из газосиликатных блоков под ключ в Гродно и Беларуси | Marmol House</title>
        <meta name="description" content="Строим надежные и теплые дома из газосиликатных блоков под ключ в Гродно и по всей Беларуси. Официальная гарантия 5 лет, фиксированная цена в договоре." />
        <link rel="canonical" href="https://marmolhouse.by/services/gas-silicate-houses" />
        <meta property="og:title" content="Дома из газосиликатных блоков под ключ | Marmol House" />
        <meta property="og:description" content="Надежные каменные дома для комфортной жизни. Строим под ключ с соблюдением всех технологий." />
        <meta property="og:url" content="https://marmolhouse.by/services/gas-silicate-houses" />
        <meta property="og:image" content="https://marmolhouse.by/assets/service/blockhouse-hero.webp" /> 

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

        <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/assets/service/blockhouse-hero.webp')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center px-4" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Дома из газосиликатных блоков</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Надежные каменные дома для комфортной жизни. Строим под ключ с соблюдением всех технологий.</p>
            <button 
              onClick={() => handleOrder("Здравствуйте, хочу консультацию по строительству дома из блоков.")}
              className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform">
              Получить консультацию
            </button>
          </div>
        </section>

        <TechnologyBenefits
            title="Преимущества домов из газосиликатных блоков"
            imageSrc={BlockHouseImage}
            benefits={gasSilicateBenefits}
            imageAlt="Чертеж современного дома из газосиликатных блоков"
            bgColor="bg-white"
        />
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <OurBenefits benefits={generalBenefits} />
          <ProcessSteps
            title="Этапы строительства вашего каменного дома"
            steps={gasSilicateSteps}
          />
      </div>
          <section className="py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-[#17253c] mb-4" data-aos="fade-up">Что входит в стоимость?</h2>
            <p className="text-center text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">Мы предлагаем как готовые комплектации "под ключ", так и базовые решения, которые можно адаптировать под ваш бюджет.</p>
            
            <CustomPackageBlock onOrderClick={handleOrder} />

            <h3 className="text-2xl font-semibold text-center text-[#17253c] mt-16 mb-8" data-aos="fade-up">
              Или выберите одну из наших полных комплектаций:
            </h3>
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
                  <p className="text-gray-500 mb-8 max-w-2xl mx-auto">{allPackages[activeTab].technology}</p>
                  
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

export default GasSilicateHousesService;