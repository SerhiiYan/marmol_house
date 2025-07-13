// src/pages/DesignService.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaPencilRuler, FaCheckCircle, FaUserCheck, FaLightbulb, FaDraftingCompass, FaClipboardList, FaHardHat, FaBookOpen } from 'react-icons/fa';
import Footer from '../components/Footer';

// SEO: Микроразметка
const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Проектирование домов в Гродно и Беларуси",
  "serviceType": "Архитектурное проектирование",
  "description": "Закажите индивидуальное проектирование дома или выберите готовый проект от Marmol House. Создаем детальные архитектурные и конструктивные решения, соответствующие строительным нормам РБ.",
  "provider": {
    "@type": "Organization",
    "name": "Marmol House",
    "url": "https://marmolhouse.by",
    "logo": "https://marmolhouse.by/assets/logo.png"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Беларусь"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Виды проектирования",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Индивидуальное проектирование"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Готовые проекты"
        }
      }
    ]
  }
});
const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Главная",
    "item": "https://marmolhouse.by"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Услуги",
    "item": "https://marmolhouse.by/services"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Проектирование домов"
  }]
});

const designBenefits = [
  { icon: FaPencilRuler, title: "Идеальная планировка", desc: "Создаем пространство под ваш сценарий жизни: от расположения розеток до вида из окна спальни." },
  { icon: FaCheckCircle, title: "Гарантия надежности", desc: "Рассчитываем все нагрузки, подбираем правильные материалы и гарантируем соответствие строительным нормам РБ." },
  { icon: FaUserCheck, title: "Экономия на материалах", desc: "Оптимизируем раскрой материалов и конструктивные решения, чтобы избежать ненужных расходов и переделок." },
];
const designProcess = [
  { icon: FaLightbulb, title: "Консультация и ТЗ", description: "Обсуждаем ваши идеи, образ жизни и бюджет, формируя четкое техническое задание для будущего проекта." },
  { icon: FaDraftingCompass, title: "Эскизы и планировки", description: "Наши архитекторы создают первые эскизы и планировочные решения, которые мы дорабатываем вместе с вами." },
  { icon: FaClipboardList, title: "Рабочий проект", description: "Готовим полный комплект чертежей (АР и КР), необходимых для получения разрешения и начала строительства." },
  { icon: FaHardHat, title: "Авторский надзор", description: "Наш архитектор контролирует ход строительства, чтобы результат на 100% соответствовал проекту (по желанию)." }
];


const DesignService = ({ onOrderClick }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <title>Проектирование домов в Гродно и Беларуси | Marmol House</title>
      <meta name="description" content="Закажите индивидуальное проектирование дома или выберите готовый проект от Marmol House. Создаем детальные архитектурные и конструктивные решения." />
      <link rel="canonical" href="https://marmolhouse.by/services/design" />
      <script type="application/ld+json">{serviceSchema}</script>
      <script type="application/ld+json">{breadcrumbSchema}</script>

      <section 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" 
        style={{ backgroundImage: "url('/assets/service/invidual.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
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

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <section className="py-20">
             <div className="text-center mb-12" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-[#17253c]">Профессиональный проект — ваша лучшая инвестиция</h2>
                <p className="mt-3 text-lg text-gray-600">Правильный проект экономит до 20% бюджета на строительстве и избавляет от дорогостоящих переделок.</p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {designBenefits.map((benefit, index) => (
                <div key={benefit.title} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="text-yellow-500 text-3xl mb-4"><benefit.icon /></div>
                  <h3 className="text-xl font-semibold text-[#17253c]">{benefit.title}</h3>
                  <p className="mt-2 text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 bg-gray-50 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
            <h2 className="text-3xl font-bold text-center text-[#17253c] mb-12" data-aos="fade-up">
              Как мы создаем ваш проект: 4 простых шага
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {designProcess.map((step, index) => (
                <div key={step.title} className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-lg text-[#17253c] font-bold mr-3">{index + 1}</div>
                      <step.icon className="w-8 h-8 text-[#17253c]"/>
                    </div>
                    <h3 className="text-lg font-semibold text-[#17253c] mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-[#17253c] mb-12" data-aos="fade-up">
                Выберите свой путь к дому мечты
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div data-aos="fade-right" className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="text-4xl text-yellow-500 mb-4"><FaPencilRuler/></div>
                    <h3 className="text-2xl font-bold text-[#17253c] mb-3">Индивидуальное проектирование</h3>
                    <p className="text-gray-600 mb-6 flex-grow">Воплотим в жизнь любую вашу идею. Дом, созданный с нуля, идеально соответствующий вашим вкусам и потребностям.</p>
                    <button onClick={() => onOrderClick("Хочу заказать индивидуальный проект.")} className="w-full mt-4 bg-[#17253c] text-white font-semibold py-3 rounded-lg hover:bg-black transition-colors">
                      Обсудить проект
                    </button>
                </div>
                <div data-aos="fade-left" data-aos-delay="100" className="border-2 border-yellow-400 rounded-2xl p-8 flex flex-col items-center text-center bg-yellow-50/50 shadow-lg hover:shadow-2xl transition-shadow relative">
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
      </div>
    </>
  );
};

export default DesignService;