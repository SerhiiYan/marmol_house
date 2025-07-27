// src/pages/DesignService.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaPencilRuler, FaBookOpen } from 'react-icons/fa';
import { designBenefits, designProcess } from '../data/servicesData.jsx';
import ProcessSteps from '../components/ProcessSteps';


const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Проектирование домов в Гродно и Беларуси",
  "serviceType": "Архитектурное проектирование",
  "description": "Закажите индивидуальное проектирование дома или выберите готовый проект от Marmol House. Создаем детальные архитектурные и конструктивные решения, соответствующие строительным нормам РБ.",
  "provider": { "@type": "LocalBusiness", "name": "Marmol House", "url": "https://marmolhouse.by", "logo": "https://marmolhouse.by/assets/logo.png" },
  "areaServed": { "@type": "Country", "name": "Беларусь" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Виды проектирования",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Индивидуальное проектирование" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Готовые проекты", "description": "Проект в подарок при заказе строительства" } }
    ]
  }
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" }, { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://marmolhouse.by/services" }, { "@type": "ListItem", "position": 3, "name": "Проектирование домов", "item": "https://marmolhouse.by/services/design" }]
};
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Как создается проект дома в Marmol House',
    'description': '4 простых шага от идеи до готового комплекта чертежей для строительства.',
    'step': designProcess.map((step, index) => ({ '@type': 'HowToStep', 'name': step.title, 'text': step.description, 'url': `https://marmolhouse.by/services/design#step-${index + 1}` }))
};

const DesignService = ({ onOrderClick }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div>
      <title >Проекты домов в Гродно и Беларуси: готовые и индивидуальные | Marmol House</title>
      <meta  name="description" content="Закажите индивидуальное проектирование дома или выберите готовый проект от Marmol House. Создаем детальные архитектурные и конструктивные решения." />
      <link  rel="canonical" href="https://marmolhouse.by/services/design" />
      <meta  property="og:title" content="Проектирование домов | Marmol House" />
      <meta  property="og:description" content="От идеи до детальных чертежей — создаем проекты, в которых хочется жить." />
      <meta  property="og:url" content="https://marmolhouse.by/services/design" />
      <meta  property="og:image" content="https://marmolhouse.by/assets/service/invidual.webp" />
      
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>

      <section 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" 
        style={{ backgroundImage: "url('/assets/service/invidual.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Проектирование домов</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            От идеи до детальных чертежей — создаем проекты, в которых хочется жить. Индивидуальный подход и гарантия надежности.
          </p>
          <button 
            onClick={() => onOrderClick("Здравствуйте, хочу заказать проектирование дома.")}
            className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            Заказать проект
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#17253c]">Профессиональный проект — ваша лучшая инвестиция</h2>
            <p className="mt-3 text-lg text-gray-600">Правильный проект экономит до 20% бюджета на строительстве и избавляет от дорогостоящих переделок.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designBenefits.map((benefit, index) => (
              <div key={benefit.title} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-yellow-500 text-3xl mb-4"><benefit.icon /></div>
                <h3 className="text-xl font-semibold text-[#17253c]">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-20">
         <div className="max-w-6xl mx-auto px-4">
            <ProcessSteps
                title="Как мы создаем ваш проект: 4 простых шага"
                steps={designProcess}
            />
         </div>
      </div>
      
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#17253c] mb-12" data-aos="fade-up">
            Выберите свой путь к дому мечты
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div data-aos="fade-up" className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow">
                <div className="text-4xl text-yellow-500 mb-4"><FaPencilRuler/></div>
                <h3 className="text-2xl font-bold text-[#17253c] mb-3">Индивидуальное проектирование</h3>
                <p className="text-gray-600 mb-6 flex-grow">Воплотим в жизнь любую вашу идею. Дом, созданный с нуля, идеально соответствующий вашим вкусам и потребностям.</p>
                <button onClick={() => onOrderClick("Хочу заказать индивидуальный проект.")} className="w-full mt-4 bg-[#17253c] text-white font-semibold py-3 rounded-lg hover:bg-black transition-colors">
                  Обсудить проект
                </button>
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="border-2 border-yellow-400 rounded-2xl p-8 flex flex-col items-center text-center bg-yellow-50/50 shadow-lg hover:shadow-2xl transition-shadow relative">
                <div className="absolute top-0 -translate-y-1/2 bg-yellow-400 text-[#17253c] px-4 py-1 rounded-full font-semibold text-sm">Проект в ПОДАРОК!</div>
                <div className="text-4xl text-yellow-500 mb-4"><FaBookOpen/></div>
                <h3 className="text-2xl font-bold text-[#17253c] mb-3">Готовые проекты</h3>
                <p className="text-gray-600 mb-6 flex-grow">Выберите один из наших проверенных временем проектов. Это быстрый и экономичный способ начать строительство.</p>
                <Link to="/gallery" className="w-full mt-4 bg-[#f9c615] text-[#17253c] font-semibold py-3 rounded-lg hover:bg-[#e5b512] transition-colors text-center">
                  Смотреть готовые проекты
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignService;