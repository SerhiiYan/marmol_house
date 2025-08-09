// src/components/CompletedProjectModal.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaRulerCombined, FaTools, FaClock } from 'react-icons/fa';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const CompletedProjectModal = ({ project, onClose, onOrderClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { 
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const handlePrevImage = (e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === 0 ? project.images.length - 1 : prev - 1)); };
  const handleNextImage = (e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === project.images.length - 1 ? 0 : prev + 1)); };
  
  const handleOverlayClick = (e) => (e.target === e.currentTarget) && onClose();

  const handleOrder = () => {
    onClose();
    onOrderClick(`Здравствуйте, интересует расчет похожего проекта, как "${project.title}".`);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 p-4 overflow-y-auto flex items-center"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative my-auto mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl"
        >
          <div className="relative w-full h-80 lg:h-auto lg:min-h-[500px]"> 
             <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={project.images[currentIndex]}
                  alt={`Фото ${project.title} ${currentIndex + 1}`}
                  className="w-full h-full object-cover lg:rounded-l-2xl" 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
            </AnimatePresence>
            {project.images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"><FaChevronLeft size={20}/></button>
                <button onClick={handleNextImage} className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"><FaChevronRight size={20}/></button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">{currentIndex + 1} / {project.images.length}</div>
          </div>
          <div className="flex flex-col p-6 lg:p-8 lg:overflow-y-auto">
              <div>
                  <h2 className="text-3xl font-bold text-[#17253c]">{project.title}</h2>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                      <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-yellow-500" /> {project.params.location}</p>
                      <p className="flex items-center gap-2"><FaRulerCombined className="text-yellow-500" /> {project.params.area}</p>
                      <p className="flex items-center gap-2"><FaTools className="text-yellow-500" /> {project.params.technology}</p>
                      <p className="flex items-center gap-2"><FaClock className="text-yellow-500" /> {project.params.duration}</p>
                  </div>
              </div>
              
              <div className="border-t my-6"></div>

              <div className="flex-grow space-y-6">
                  {project.shortStory && (
                    <div>
                      <h3 className="font-semibold text-lg text-[#17253c] mb-2">История проекта</h3>
                      <p className="text-gray-700">{project.shortStory}</p>
                    </div>
                  )}
                  {project.keyFeatures && (
                    <div>
                      <h3 className="font-semibold text-lg text-[#17253c] mb-3">Ключевые работы</h3>
                      <ul className="space-y-2">
                          {project.keyFeatures.map(feature => (
                              <li key={feature} className="flex items-start">
                                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"/>
                                  <span className="text-gray-700">{feature}</span>
                              </li>
                          ))}
                      </ul>
                    </div>
                  )}
              </div>
              
              <div className="border-t mt-6 pt-6">
                  <p className="text-2xl font-bold text-rose-600 mb-4">{project.price}</p>
              </div>
          </div>

          <button onClick={onClose} className="absolute top-3 right-3 bg-white/50 hover:bg-white text-gray-700 rounded-full p-1.5 transition-colors z-10">
            <XMarkIcon className="w-6 h-6"/>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompletedProjectModal;