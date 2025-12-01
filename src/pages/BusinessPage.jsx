// src/pages/BusinessPage.jsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaHammer, FaKey, FaRegClock, FaChartLine, FaGem, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import allProjects from '../data/projects';
import BusinessProjectCard from '../components/BusinessProjectCard';
import ModalForm from '../components/ModalForm';

const categories = ['Все', 'A-frame', 'Барнхаусы', "Проекты 'Гео'"];

const ComingSoonCard = ({ category }) => (
  <div className="h-[550px] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8 group hover:border-yellow-400 transition-colors">
    <div className="text-6xl mb-4 opacity-20 group-hover:opacity-40 transition-opacity">🏗️</div>
    <h3 className="text-2xl font-bold text-gray-400 group-hover:text-gray-600">Скоро в каталоге</h3>
    <p className="text-gray-500 mt-2">Линейка {category}</p>
    <p className="text-sm text-gray-400 mt-4 max-w-xs">
      Мы разрабатываем новые высокодоходные проекты.
    </p>
  </div>
);

const BusinessPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); 

  const handleOpenModal = (msg) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (cat) => {
      setSelectedCategory(cat);
      setVisibleCount(3);
      setIsDropdownOpen(false);
  };

  const businessProjects = useMemo(() => {
    const projects = allProjects.filter(p => p.isForBusiness);
    if (selectedCategory === 'Все') return projects;
    return projects.filter(p => p.type === selectedCategory);
  }, [selectedCategory]);

  const renderCatalog = () => {
    const items = [];
    const projectsToShow = businessProjects.slice(0, visibleCount);

    projectsToShow.forEach(project => {
      items.push(
        <BusinessProjectCard key={project.id} project={project} onOrderClick={handleOpenModal} />
      );
    });

    if (businessProjects.length < 3) {
        const categoryName = selectedCategory === 'Все' ? 'Новые форматы' : selectedCategory;
        const placeholdersNeeded = 3 - businessProjects.length;
        for (let i = 0; i < placeholdersNeeded; i++) {
            items.push(<ComingSoonCard key={`placeholder-${i}`} category={categoryName} />);
        }
    }
    return items;
  };

  const sectionAnimation = {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.8, ease: 'easeOut' }
  };

  return (
    <>
      <title>Дома для бизнеса | Инвестиционные проекты Marmol House</title>
      <meta name="description" content="Готовые решения для арендного бизнеса: A-frame и Барнхаусы с окупаемостью от 2 лет." />
      <link rel="canonical" href="https://marmolhouse.by/business" />
      
      <ModalForm show={isModalOpen} onClose={() => setIsModalOpen(false)} defaultComment={modalMessage} />

      {/* --- БЛОК 1: HERO (SPLIT SCREEN) --- */}
      <section className="min-h-[85vh] bg-[#17253c] text-white grid lg:grid-cols-2">
        {/* Левая часть: Контент (Виден всегда) */}
        <div className="flex flex-col justify-center px-6 lg:px-20 py-24 lg:py-0 relative z-10">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-yellow-400 font-bold tracking-wider uppercase text-sm mb-4 block">
                    Marmol Business
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Инвестируйте <br />
                    в квадратные метры, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                        которые работают
                    </span>
                </h1>
                <p className="text-lg text-gray-300 max-w-md mb-10 border-l-2 border-yellow-500 pl-6">
                    Ликвидные проекты для глэмпингов и посуточной аренды. Запуск бизнеса за 60 дней.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => handleOpenModal('Консультация по бизнес-проектам')}
                        className="bg-yellow-500 text-[#17253c] px-8 py-4 font-bold hover:bg-yellow-400 transition-all flex items-center justify-center group shadow-lg hover:shadow-yellow-500/20"
                    >
                        Получить консультацию
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                        className="border border-gray-600 text-gray-300 px-8 py-4 hover:border-white hover:text-white transition-all"
                    >
                        К проектам
                    </button>
                </div>
            </motion.div>
        </div>

        {/* Правая часть: Визуал (СКРЫТ НА МОБИЛЬНЫХ hidden, ВИДЕН НА DESKTOP lg:block) */}
        <div className="hidden lg:block relative h-auto overflow-hidden">
            <motion.img 
                src="/assets/service/business.webp" 
                alt="A-frame дом"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#17253c] via-[#17253c]/20 to-transparent"></div>
        </div>
      </section>

      {/* --- БЛОК 3: КАТАЛОГ --- */}
      {/* --- БЛОК 2: КАТАЛОГ ПРОЕКТОВ --- */}
      <section id="catalog" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            
            {/* ↓↓↓ ИСПРАВЛЕННЫЙ БЛОК ЗАГОЛОВКА ↓↓↓ */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
                <div className="text-center md:text-left mb-6 md:mb-0 w-full md:w-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#17253c]">Каталог решений</h2>
                    <p className="text-gray-500 mt-2 text-lg">Оптимизированные планировки и дизайн</p>
                </div>
                
                {/* --- БЛОК ФИЛЬТРОВ --- */}
                <div className="relative z-30 w-full md:w-auto">
                    {/* 1. МОБИЛЬНАЯ ВЕРСИЯ */}
                    <div className="md:hidden relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex justify-between items-center bg-white border-2 border-gray-200 text-[#17253c] font-bold py-3 px-5 rounded-xl shadow-sm"
                        >
                            <span>{selectedCategory}</span>
                            <ChevronDownIcon 
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                                >
                                    {categories.map(cat => (
                                        <li key={cat} className="border-b border-gray-100 last:border-0">
                                            <button 
                                                onClick={() => handleCategoryChange(cat)} 
                                                className="w-full text-left py-4 px-5 font-medium text-gray-700 active:bg-gray-50"
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 2. ДЕСКТОПНАЯ ВЕРСИЯ */}
                    <div className="hidden md:flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                                    selectedCategory === cat 
                                    ? 'bg-[#17253c] text-white shadow-lg' 
                                    : 'bg-white text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderCatalog()}
            </div>

            {businessProjects.length > visibleCount && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 3)}
                        className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#17253c] text-[#17253c] font-bold rounded-full hover:bg-[#17253c] hover:text-white transition-all"
                    >
                        Показать еще
                        <span className="text-xl">↓</span>
                    </button>
                </div>
            )}
        </div>
      </section>

      <motion.section className="py-20 bg-white" {...sectionAnimation}>
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                <div className="p-2">
                    <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600 text-2xl shadow-sm">
                        <FaMoneyBillWave />
                    </div>
                    <h3 className="text-xl font-bold text-[#17253c] mb-3">Быстрая окупаемость</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Каркасная технология позволяет построить объект за 3 месяца. Вы не замораживаете деньги в долгом строительстве, а начинаете принимать гостей уже в этом сезоне.
                    </p>
                </div>

                <div className="p-2">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 text-2xl shadow-sm">
                        <FaGem />
                    </div>
                    <h3 className="text-xl font-bold text-[#17253c] mb-3">Высокий средний чек</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Стиль A-frame и панорамное остекление создают «вау-эффект». Гости готовы платить за атмосферу и фотогеничность больше, чем за обычный номер в отеле.
                    </p>
                </div>

                <div className="p-2">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 text-2xl shadow-sm">
                        <FaChartLine />
                    </div>
                    <h3 className="text-xl font-bold text-[#17253c] mb-3">Ликвидный актив</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Мы используем материалы, рассчитанные на коммерческий поток. Дом не требует ежегодного ремонта фасада — это актив, который растет в цене вместе с рынком.
                    </p>
                </div>
            </div>
        </div>
      </motion.section>

      <section className="py-24 bg-[#17253c] text-white">
          <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Бизнес-стандарт Marmol House</h2>
                  <p className="text-gray-400 text-lg">
                      Мы разработали оптимальную комплектацию для коммерческого использования. 
                      <br className="hidden md:block"/> Это база, которая обеспечивает долговечность и комфорт гостей.
                  </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Зимний пакет</h4>
                              <p className="text-sm text-gray-400 mt-1">Утепление 200мм (пол/крыша), перекрестное утепление стен. Дом работает круглый год.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Панорамное остекление</h4>
                              <p className="text-sm text-gray-400 mt-1">Энергоэффективные двухкамерные стеклопакеты.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Внешний контур "под ключ"</h4>
                              <p className="text-sm text-gray-400 mt-1">Кровля (кликфальц/металл), отделка фасада деревом с заводской покраской.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Инженерия</h4>
                              <p className="text-sm text-gray-400 mt-1">Скрытая разводка электрики, водоснабжения и канализации внутри дома.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Терраса в комплекте</h4>
                              <p className="text-sm text-gray-400 mt-1">Просторная терраса из лиственницы или импрегнированной доски.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <FaCheckCircle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
                          <div>
                              <h4 className="font-bold text-lg">Внутренняя отделка</h4>
                              <p className="text-sm text-gray-400 mt-1">Чистовая стяжка, отделка имитацией бруса.</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="text-center mt-10">
                  <p className="text-sm text-gray-500 mb-6">
                      * Возможна сдача в формате "Теплый контур" (без внутренней отделки и сетей) — стоимость ниже на ~25%.
                  </p>
              </div>
          </div>
      </section>
    </>
  );
};

export default BusinessPage;