// src/pages/CompletedProjects.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { BsImages } from 'react-icons/bs';

import completedProjects from '../data/completedProjects';
import CompletedProjectModal from '../components/CompletedProjectModal';

const getProjectDetails = (description) => ({
  location: description.find(d => !d.toLowerCase().includes('площадь') && !d.toLowerCase().includes('завершено')),
  area: description.find(d => d.toLowerCase().includes('площадь'))
});

const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Портфолио выполненных работ Marmol House",
    "description": "Галерея завершенных проектов по строительству домов в Беларуси.",
    "numberOfItems": completedProjects.length,
    "itemListElement": completedProjects.map((project, index) => {
        const { location, area } = getProjectDetails(project.description);
        return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "House",
                "name": project.title,
                "description": project.description.join('. '),
                "image": `https://marmolhouse.by${project.images[0]}`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": location || 'Гродненская область, Беларусь'
                },
                "floorSize": {
                    "@type": "QuantitativeValue",
                    "value": parseFloat(area?.replace(/[^0-9.]/g, '')),
                    "unitCode": "MTK"
                }
            }
        }
    })
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://marmolhouse.by/" 
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Наши работы", 
      "item": "https://marmolhouse.by/completed" 
    }
  ]
});

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: index * 0.05, ease: "easeOut" }
  }),
};

const CompletedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const getProjectDetails = (description) => ({
    location: description.find(d => !d.toLowerCase().includes('площадь') && !d.toLowerCase().includes('завершено')),
    area: description.find(d => d.toLowerCase().includes('площадь'))
  });
  
  return (
    <>
      <title>Наши работы — Готовые дома от Marmol House | Портфолио</title>
      <meta name="description" content="Портфолио завершенных проектов домов от компании Marmol House. Посмотрите реальные фото, цены и описания построенных нами объектов в Гродно и по всей Беларуси."/>
      <meta name="keywords" content="готовые дома, портфолио, наши работы, построенные дома, marmol house, фото домов" />
      <link rel="canonical" href="https://marmolhouse.by/completed" />
      <meta property="og:title" content="Наши работы | Marmol House" />
      <meta property="og:description" content="Реальные фото, цены и описания построенных нами объектов в Гродно и по всей Беларуси."/>
      <meta property="og:url" content="https://marmolhouse.by/completed" />
      <meta property="og:image" content="https://marmolhouse.by/og-image.png" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#17253c]">
            Наши готовые объекты
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Каждый из этих домов — это чья-то воплощенная мечта. Посмотрите, как мы работаем, и убедитесь в качестве наших услуг.
          </p>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedProjects.map((project, index) => {
            const { location, area } = getProjectDetails(project.description);
            return (
              <motion.article
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.images[0]} loading="lazy"
                    alt={`Готовый дом: ${project.title} в ${location}`}
                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 bg-white/90 text-[#17253c] px-4 py-2 rounded-lg font-semibold">
                      <BsImages /> Смотреть фото
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-[#17253c] mb-3">{project.title}</h3>
                  <div className="flex-grow space-y-2 text-gray-600 text-sm mb-4">
                    {location && <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-yellow-500" /> {location}</p>}
                    {area && <p className="flex items-center gap-2"><FaRulerCombined className="text-yellow-500" /> {area}</p>}
                  </div>
                  <p className="text-xl font-semibold text-rose-600 mt-2">
                    {project.price}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </main>

      {selectedProject && (
        <CompletedProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default CompletedProjects;