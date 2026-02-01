// src/pages/Gallery.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import GalleryFilter from '../components/GalleryFilter';
import ProjectCard from '../components/ProjectCard';
import ProjectQuickViewModal from '../components/ProjectQuickViewModal';
import { slugify } from '../utils/slugify';

// SEO 
const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Галерея проектов Marmol House',
    description: 'Каталог проектов домов, бань и гаражей для строительства в Беларуси.',
    numberOfItems: projects.length, 
    itemListElement: projects.map((project, index) => ({ 
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: project.title,
        description: `Проект ${project.type.toLowerCase()}`,
        url: `https://marmolhouse.by/projects/${slugify(project.title)}`, 
        image: `https://marmolhouse.by${project.images[0]}`,
        sku: project.id,
        brand: { '@type': 'Brand', name: 'Marmol House' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'BYN',
          price: project.price.replace(/[^0-9]/g, ''),
          priceValidUntil: `${new Date().getFullYear()}-12-31`,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://marmolhouse.by/' },
    { '@type': 'ListItem', position: 2, name: 'Галерея проектов', item: 'https://marmolhouse.by/gallery' },
  ],
};

const sectionAnimation = {
   initial: { opacity: 0, y: 50 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, amount: 0.2 }, 
   transition: { duration: 0.6, ease: 'easeOut' }
};

const INITIAL_ITEMS_TO_SHOW = 8;
const ITEMS_TO_LOAD_MORE = 8;

const Gallery = ({ onOrderClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_TO_SHOW);

  // Фильтрация для блоков "Популярные" внизу
  const familyHomes = projects.filter(p => p.type === 'Дом до 100м²').slice(0, 4);
  const barnhouses = projects.filter(p => p.type === 'Барнхаусы').slice(0, 4);
  
  // Основная фильтрация
  const filteredProjects = selectedCategory === 'Все' 
    ? projects 
    : projects.filter(p => p.type === selectedCategory);
  
  // Вычисляем проекты для показа
  const projectsToShow = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_ITEMS_TO_SHOW); 
  };
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_TO_LOAD_MORE);
  };

  const handleOpenQuickView = (project) => setSelectedProject(project);
  const handleCloseQuickView = () => setSelectedProject(null);

  return (
    <>
      <title>Галерея проектов домов и бань под ключ | Marmol House</title>
      <meta name="description" content="Фото, цены и планировки проектов домов, бань и гаражей от Marmol House. Выберите готовый проект или закажите индивидуальный. Строим по всей Беларуси."/>
      <link rel="canonical" href="https://marmolhouse.by/gallery" />
      <meta property="og:title" content="Галерея проектов | Marmol House" />
      <meta property="og:description" content="Фото и цены на проекты домов, бань и гаражей для строительства в Гродно и Беларуси." />
      <meta property="og:url" content="https://marmolhouse.by/gallery" />
      <meta property="og:image" content="https://marmolhouse.by/og-image.png" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* --- ЗАГОЛОВОК --- */}
      <header className="pt-28 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-center text-4xl md:text-5xl font-extrabold text-[#17253c] mb-8">
                Проекты, в которых хочется жить
            </h1>
            <div className="max-w-3xl mx-auto relative pl-6 border-l-4 border-yellow-400">
                <p className="text-gray-700 text-base sm:text-lg">
                    Здесь собраны наши лучшие проекты: от уютных дачных домиков до просторных семейных коттеджей и стильных барнхаусов. Каждый из них — это проверенное временем решение, которое можно адаптировать под вас.
                </p>
            </div>
        </div>
      </header>

      {/* --- ОСНОВНАЯ СЕКЦИЯ С ФИЛЬТРОМ И СЕТКОЙ --- */}
      <section className="py-16 bg-gray-50/70" aria-labelledby="all-projects-heading">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
                <h2 id="all-projects-heading" className="text-3xl font-bold text-[#17253c]">Полный каталог проектов</h2>
                <p className="mt-3 max-w-2xl mx-auto text-gray-600">
                    Воспользуйтесь фильтром, чтобы найти проекты других типов: бани, гаражи, дачные домики и многое другое.
                </p>
            </div>

            <GalleryFilter selected={selectedCategory} onSelect={handleSelectCategory} />
            
            <motion.ul
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8"
            >
              <AnimatePresence mode='popLayout'>
                {projectsToShow.map((project) => (
                  <motion.li
                    key={`${project.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} onQuickViewClick={handleOpenQuickView} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {/* Сообщение если пусто */}
            {filteredProjects.length === 0 && (
                <div className='text-center text-gray-600 py-10'>Проекты в этой категории не найдены</div>
            )}
            
            {/* КНОПКА "ПОКАЗАТЬ ЕЩЕ" */}
            {hasMoreProjects && (
              <div className="mt-12 flex justify-center">
                <button 
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#17253c] text-[#17253c] font-bold rounded-full hover:bg-[#17253c] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95"
                >
                    Показать еще ({filteredProjects.length - visibleCount})
                    <span className="text-xl">↓</span>
                </button>
              </div>
            )}
        </div>
      </section>
      
      {/* --- БЛОК ПОПУЛЯРНЫХ (ДОМА ДО 100м) --- */}
      <motion.section 
        className="py-16 bg-gray-50/70"
        {...sectionAnimation} 
      >
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#17253c]">Популярный выбор: Дома до 100м²</h2>
                <p className="mt-3 max-w-2xl mx-auto text-gray-600">
                    Оптимальные по площади и бюджету проекты, которые идеально подходят для комфортной жизни небольшой семьи.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {familyHomes.map(project => (
                  <ProjectCard key={project.id} project={project} onQuickViewClick={handleOpenQuickView} />
              ))}
            </div>
        </div>
      </motion.section>
      
      {/* --- БЛОК БАРНХАУСЫ --- */}
      {barnhouses.length > 0 && (
         <motion.section 
          className="py-16 bg-white"
          {...sectionAnimation}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#17253c]">Современный стиль: Барнхаусы</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-gray-600">
                        Лаконичная архитектура, открытые пространства и панорамные окна — выбор для тех, кто ценит минимализм и единение с природой.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {barnhouses.map(project => (
                    <ProjectCard key={project.id} project={project} onQuickViewClick={handleOpenQuickView} />
                ))}
                </div>
            </div>
        </motion.section>
      )}

       {/* --- БЛОК CTA (Индивидуальное проектирование) --- */}
       <section className="py-16 bg-white">
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center bg-gray-900 text-white p-8 sm:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <h2 className="text-3xl font-bold mb-4">Не нашли идеальный проект?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Это лишь часть наших возможностей. Если у вас есть собственная идея, эскиз или просто картинка из интернета — покажите ее нам! Мы специализируемся на <strong>индивидуальном проектировании</strong> и поможем воплотить вашу мечту в реальность.
            </p>
            <Link to="/services/design" className="inline-block bg-[#f9c615] text-[#17253c] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#e5b512] transition-colors transform hover:scale-105">
                Узнать больше о проектировании
            </Link>
        </motion.div>
      </section>

      {/* Модальное окно быстрого просмотра */}
      <AnimatePresence>
        {selectedProject && ( <ProjectQuickViewModal project={selectedProject} onClose={handleCloseQuickView} onOrder={onOrderClick} /> )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;