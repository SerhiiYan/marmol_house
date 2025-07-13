// src/components/ProjectQuickViewModal.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { slugify } from '../utils/slugify'; 

const ProjectQuickViewModal = ({ project, onClose, onOrder }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectUrl = `/projects/${slugify(project.title)}`;
  const handleNext = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % project.images.length); };
  const handlePrev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length); };
  
  useEffect(() => {
    const handleEsc = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOrderClick = () => {
    const message = `Здравствуйте, хочу заказать расчет по проекту "${project.title}"`;
    onClose();
    onOrder(message);
  };

  const PricePackages = () => (
    <>
      <h3 className="font-semibold text-gray-800 mb-3">Примерные цены по комплектациям:</h3>
      <ul className="text-gray-700 space-y-1.5 list-disc list-inside">
        {project.packages.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full lg:w-3/5 flex flex-col bg-gray-100">
          <div className="relative w-full" style={{ paddingTop: '75%' }}>
            <div className="absolute inset-0">
                <AnimatePresence initial={false}>
                    <motion.img key={currentIndex} src={project.images[currentIndex]} alt={`Изображение проекта ${project.title}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, position: 'absolute' }} transition={{ duration: 0.3 }} className="w-full h-full object-cover"/>
                </AnimatePresence>
                <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"><ChevronLeftIcon className="w-6 h-6"/></button>
                <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"><ChevronRightIcon className="w-6 h-6"/></button>
            </div>
          </div>
          <div className="p-2 bg-gray-200 flex justify-center space-x-2 overflow-x-auto">
            {project.images.map((img, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-16 h-12 rounded-md overflow-hidden flex-shrink-0 transition-all ${index === currentIndex ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-200' : 'opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt={`Миниатюра ${index + 1}`} className="w-full h-full object-cover" />
                </button>
            ))}
          </div>
          <div className="hidden lg:block p-6 bg-white border-t border-gray-200 flex-grow overflow-y-auto">
            <PricePackages />
          </div>
        </div>

        <div className="w-full lg:w-2/5 p-6 flex flex-col">
          <div>
            <div className="flex justify-between items-start mb-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{project.type}</span>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-800 -mt-1 -mr-1" aria-label="Закрыть окно"><XMarkIcon className="w-7 h-7"/></button>
            </div>
            
            <div className="flex justify-between items-baseline mb-4">
              <h2 id="modal-title" className="text-2xl font-bold text-[#17253c]">{project.title}</h2>
              <p className="text-xl font-bold text-rose-600 flex-shrink-0 ml-4 whitespace-nowrap">
                {project.price}
              </p>
            </div>
            <div className="border-t border-gray-200"></div>
          </div>

          <div className="my-4 flex-grow overflow-y-auto pr-2">
            <h3 className="font-semibold text-gray-800 mb-3">Общая информация:</h3>
            <ul className="text-gray-700 space-y-1.5 list-disc list-inside">
              {project.description.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-auto">
            <div className="block lg:hidden mb-4">
              <PricePackages />
            </div>
            <div className="flex flex-col space-y-3">
              <button onClick={handleOrderClick} className="w-full bg-[#f9c615] text-[#17253c] font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors transform hover:scale-105">
                Заказать расчет по этому проекту
              </button>
              <Link to={projectUrl} className="w-full text-center bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">
                Перейти на страницу проекта
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectQuickViewModal;