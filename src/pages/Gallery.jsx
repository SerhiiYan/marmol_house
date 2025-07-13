// src/pages/Gallery.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import GalleryFilter from '../components/GalleryFilter';
import ProjectCard from '../components/ProjectCard';
import ProjectQuickViewModal from '../components/ProjectQuickViewModal';
import { slugify } from '../utils/slugify'

const Gallery = ({ onOrderClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenQuickView = (project) => { setSelectedProject(project); };
  const handleCloseQuickView = () => { setSelectedProject(null); };

  const filtered = selectedCategory === 'Все' 
    ? projects 
    : projects.filter(p => p.type === selectedCategory);


  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Галерея проектов Marmol House',
    description: 'Каталог проектов домов, бань и гаражей для строительства в Беларуси.',
    numberOfItems: filtered.length, 
    itemListElement: filtered.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1, 
      item: {

        '@type': 'Product',
        name: project.title,
        description: `Проект ${project.type.toLowerCase()} площадью ${project.description.find(d => d.includes('Общая площадь')) || ''}`,
        url: `https://marmolhouse.by/projects/${slugify(project.title)}`,
        image: `https://marmolhouse.by${project.images[0]}`, 
        sku: project.id, 
        brand: {
          '@type': 'Brand',
          name: 'Marmol House',
        },

        offers: {
          '@type': 'Offer',
          priceCurrency: 'BYN',
          price: project.price.replace(/[^0-9]/g, ''), 
        },
      },
    })),
  };

  return (
    <>

      <section className="max-w-7xl mx-auto px-4 pt-28 pb-10" aria-labelledby="gallery-heading">
        <Helmet>
          <title>Галерея проектов | Marmol House</title>
          <meta name="description" content="Посмотрите реализованные проекты домов, бань и гаражей от Marmol House. Качественное строительство по всей Беларуси."/>
          <link rel="canonical" href="https://marmolhouse.by/gallery" />

          <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        </Helmet>
        
        <header className="text-center mb-8">
            <h1 id="gallery-heading" className="text-4xl md:text-5xl font-extrabold text-[#17253c] pb-3">Наши проекты</h1>
            <p className="text-gray-600">Ознакомьтесь с нашими лучшими проектами домов, бань и гаражей</p>
        </header>
        
        <GalleryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.ul
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8"
            >
              {filtered.map((project, index) => (
                <motion.li
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} onQuickViewClick={handleOpenQuickView} />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.div className='text-center text-gray-600 py-10'>Проекты в этой категории не найдены</motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {selectedProject && ( <ProjectQuickViewModal project={selectedProject} onClose={handleCloseQuickView} onOrder={onOrderClick} /> )}
      </AnimatePresence>
      
    </>
  );
};

export default Gallery;