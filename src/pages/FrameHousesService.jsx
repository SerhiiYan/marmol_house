// src/pages/FrameHousesService.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ShieldCheckIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { FaRulerCombined, FaHammer, FaTree, FaHome } from 'react-icons/fa';

// --- ДАННЫЕ ДЛЯ СТРАНИЦЫ ---

// 1. ОБЪЕДИНЯЕМ ВСЕ КОМПЛЕКТАЦИИ В ОДИН МАССИВ
const framePackages = {
  'Эконом': {
    price: 1200,
    details: [
      { category: 'Фундамент', items: ['Монолитный железобетонный свайно-ростверковый', 'Сваи Ø300 мм, ростверк 250×400 мм', 'Арматура Ø10 мм, бетон С16/20'] },
      { category: 'Стены и перегородки', items: ['Несущий каркас из бруса 50×150 мм', 'Утепление минеральной ватой 150 мм', 'Снаружи — имитация бруса с покраской', 'Внутри — ОСБ плита 9 мм или ГКЛ 12 мм'] },
      { category: 'Пол и потолок', items: ['Черновая стяжка пола 70 мм', 'Высота потолков 2.6 м', 'Утепление потолка 150 мм (Технониколь)', 'Обшивка потолка гипсокартоном'] },
      { category: 'Кровля и проемы', items: ['Металлочерепица "Монтеррей Norman"', 'Стропильная система 50х175 мм', 'Однокамерные стеклопакеты', 'Надежная входная дверь'] },
    ]
  },
  'Премиум': {
    price: 1500,
    details: [
      { category: 'Фундамент', items: ['Усиленный свайно-ростверковый (ростверк 300мм, арматура Ø12мм)', 'Класс бетона С16/20'] },
      { category: 'Стены и перегородки', items: ['Каркас 50×150мм с двойным утеплением (150+50мм)', 'Отделка: имитация бруса, короед, евровагонка или 2 слоя ГКЛ', 'Ветрозащитная плёнка'] },
      { category: 'Пол и потолок', items: ['Утепленный черновой пол 50мм + чистовая стяжка 70мм', 'Высота потолков 2.7 м', 'Двойная обшивка потолка гипсокартоном'] },
      { category: 'Кровля и проемы', items: ['Металлочерепица "Монтеррей Norman" с водосточной системой', 'Двухкамерные стеклопакеты (пятикамерный профиль)', 'Подшивка свесов софитом'] },
      { category: 'Инженерия', items: ['Электрика, ТВ кабели, заземление', 'Водоснабжение, канализация, радиаторы', 'Вентиляционная шахта из кирпича'] }
    ]
  },
  'Премиум+': {
    price: 1700,
    details: [
      { category: 'Фундамент', items: ['Монолитный железобетонный ленточный', 'Армирование каркасами Ø12 мм', 'Устройство крылец и террас по проекту'] },
      { category: 'Стены и перегородки', items: ['Газосиликатные блоки 400мм + утепление 50мм', 'Внутренняя отделка: гипсовая/цементная штукатурка', 'Перегородки из блоков 100/200мм и кирпича'] },
      { category: 'Пол и потолок', items: ['Утепленный экструзией черновой пол + чистовая стяжка 70мм', 'Высота потолков 2.7 м, утепление 150мм', 'Двойная обшивка потолка гипсокартоном'] },
      { category: 'Кровля и проемы', items: ['Металлочерепица "Монтеррей Norman" с водосточной системой', 'Двухкамерные стеклопакеты (пятикамерный профиль)', 'Подшивка свесов софитом'] },
      { category: 'Инженерия', items: ['Полный комплект электрики и сантехники', 'Вентиляционная шахта из клинкерного кирпича', 'Разводка всех сетей по дому'] }
    ]
  }
};

const constructionSteps = [
  { name: 'Проект и фундамент', description: 'Разрабатываем архитектурный проект и возводим надежный свайно-ростверковый фундамент.', icon: FaRulerCombined, image: '/assets/service/fundament.jpg' },
  { name: 'Сборка каркаса', description: 'Возводим несущие стены и перегородки из сухого бруса. Формируем прочный "скелет" вашего будущего дома.', icon: FaHammer, image: '/assets/service/frame.jpg' },
  { name: 'Кровля и окна', description: 'Монтируем стропильную систему, укладываем металлочерепицу и устанавливаем качественные стеклопакеты.', icon: FaHome, image: '/assets/service/roof.jpg' },
  { name: 'Отделка и утепление', description: 'Утепляем стены минеральной ватой, обшиваем фасад имитацией бруса и подготавливаем дом к сдаче.', icon: FaTree, image: '/assets/service/mineral.jpg' },
];

const ourBenefits = [
  { name: 'Гарантия 5 лет', description: 'Мы уверены в качестве наших домов и даем официальную гарантию на все конструктивные элементы.', icon: ShieldCheckIcon },
  { name: 'Строим от 3 месяцев', description: 'Благодаря отлаженной технологии, вы сможете отпраздновать новоселье уже в следующем сезоне.', icon: ClockIcon },
  { name: 'Фиксированная цена', description: 'Стоимость, указанная в договоре, остается неизменной до конца строительства. Никаких скрытых платежей.', icon: DocumentTextIcon },
];

// Компонент принимает функцию onOrderClick из props
const FrameHousesService = ({ onOrderClick }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const [activeTab, setActiveTab] = useState('Эконом');
  
  // Безопасный вызов функции, переданной через props
  const handleOrder = (message) => {
    if (onOrderClick) {
      onOrderClick(message);
    } else {
      console.error("Проблема: функция onOrderClick не была передана в компонент FrameHousesService.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Строительство каркасных домов под ключ в Гродно и Беларуси | Marmol House</title>
        <meta name="description" content="Закажите строительство современного и теплого каркасного дома под ключ от Marmol House. Гарантия 5 лет, фиксированная цена в договоре, сроки от 3 месяцев." />
      </Helmet>
      
      <div className="pt-20"> {/* Отступ от sticky хедера */}

        <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/assets/service/framehouse.jpg')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center px-4" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Каркасные дома под ключ</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">Строим современные и энергоэффективные дома в Гродно и по всей Беларуси. С гарантией и по фиксированной цене.</p>
            <button 
              onClick={() => handleOrder("Здравствуйте, хочу консультацию по строительству каркасного дома.")}
              className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform">
              Рассчитать стоимость
            </button>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <section className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {ourBenefits.map((benefit, index) => (
                <div key={benefit.name} className="flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <benefit.icon className="w-12 h-12 text-[#f9c615] mb-4" />
                  <h3 className="text-xl font-semibold text-[#17253c]">{benefit.name}</h3>
                  <p className="mt-2 text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 bg-gray-50 -mx-4 px-4">
             <h2 className="text-3xl font-bold text-center text-[#17253c] mb-12 max-w-6xl mx-auto" data-aos="fade-up">Технология строительства: просто, надежно и наглядно</h2>
             <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {constructionSteps.map((step, index) => (
                  <div key={step.name} className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <div className="overflow-hidden h-48">
                      <img src={step.image} alt={step.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <step.icon className="w-6 h-6 text-[#17253c] mr-3"/>
                        <h3 className="text-lg font-semibold text-[#17253c]">{step.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
          </section>

          <section className="py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-[#17253c] mb-4" data-aos="fade-up">Что входит в стоимость?</h2>
              <p className="text-center text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">Выберите комплектацию, чтобы увидеть детальный состав работ и материалов.</p>
              
              <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-full" data-aos="fade-up" data-aos-delay="150">
                {Object.keys(framePackages).map(tabName => (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={`relative w-full py-2.5 text-sm font-bold rounded-full transition-colors ${activeTab === tabName ? 'text-[#17253c]' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {activeTab === tabName && ( <motion.div layoutId="tab-highlighter" className="absolute inset-0 bg-white shadow rounded-full" /> )}
                    <span className="relative z-10">{tabName}</span>
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
                >
                  <h3 className="text-2xl font-semibold text-center text-[#17253c] mb-8">Комплектация "<span className="text-[#f9c615]">{activeTab}</span>" от {framePackages[activeTab].price} BYN/м²</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {framePackages[activeTab].details.map((category) => (
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
        
        <section className="py-20 bg-[#17253c] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center" data-aos="zoom-in">
              <h2 className="text-3xl font-bold text-[#f9c615]">Готовы построить дом своей мечты?</h2>
              <p className="mt-4 text-lg text-gray-300">Оставьте заявку, и мы бесплатно подготовим для вас подробную смету и ответим на все вопросы.</p>
              <button 
                onClick={() => handleOrder(`Здравствуйте, хочу заказать бесплатную смету на каркасный дом.`)}
                className="mt-8 bg-[#f9c615] text-[#17253c] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform">
                  Получить бесплатную смету
              </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default FrameHousesService;