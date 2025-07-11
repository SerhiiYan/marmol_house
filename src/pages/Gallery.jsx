// src/pages/Gallery.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import GalleryFilter from '../components/GalleryFilter';
import ProjectCard from '../components/ProjectCard';
// Импортируем наше новое модальное окно
import ProjectQuickViewModal from '../components/ProjectQuickViewModal';

// Галерея теперь принимает функцию onOrderClick от App.jsx
const Gallery = ({ onOrderClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  
  // Состояние для управления модальным окном
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenQuickView = (project) => {
    setSelectedProject(project);
  };
  const handleCloseQuickView = () => {
    setSelectedProject(null);
  };

  const filtered = selectedCategory === 'Все'
    ? projects
    : projects.filter(p => p.type === selectedCategory);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-10">
        <Helmet>
          <title>Галерея проектов | Marmol House</title>
          <meta
            name="description"
            content="Посмотрите реализованные проекты домов, бань и гаражей от Marmol House. Качественное строительство по всей Беларуси."
          />
          <link rel="canonical" href="https://marmolhouse.by/gallery" />
      </Helmet>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#17253c] mb-4">Наши проекты</h1>
        <p className="text-center text-gray-600 mb-8">Ознакомьтесь с нашими лучшими проектами...</p>
        <GalleryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard project={project} onQuickViewClick={handleOpenQuickView} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-600 py-10">
            Проекты в этой категории не найдены
          </div>
        )}
      </main>

      {/* Рендерим модальное окно, если проект выбран */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectQuickViewModal 
            project={selectedProject}
            onClose={handleCloseQuickView}
            // Передаем функцию дальше, чтобы модалка могла открыть форму заказа
            onOrder={onOrderClick} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
