import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import GalleryFilter from '../components/GalleryFilter';
import ProjectCard from '../components/ProjectCard';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filtered = selectedCategory === 'Все'
    ? projects
    : projects.filter(p => p.type === selectedCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 pt-28 pb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#17253c] mb-4">
        Наши проекты
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Ознакомьтесь с нашими лучшими проектами домов, бань и гаражей
      </p>
      <GalleryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-gray-600 py-10"
          >
            Проекты в этой категории не найдены
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;