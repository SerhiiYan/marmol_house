// src/components/CompletedProjectModal.jsx

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Внутренние компоненты стрелок, теперь они живут здесь
const ModalPrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-[100] bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-md transition-colors">
    <FaChevronLeft className="text-xl" />
  </button>
);

const ModalNextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-[100] bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-md transition-colors">
    <FaChevronRight className="text-xl" />
  </button>
);

const CompletedProjectModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    // Блокируем скролл фона при открытии модального окна
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  
  const handlePrevImage = () => setCurrentIndex(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
  const handleNextImage = () => setCurrentIndex(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
  
  const handleOverlayClick = (e) => (e.target === e.currentTarget) && onClose();

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) handlePrevImage();
    else if (deltaX < -50) handleNextImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-[#17253c] p-4 rounded-xl shadow-2xl"
          onClick={e => e.stopPropagation()} // Предотвращаем закрытие по клику на контент
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
             <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={project.images[currentIndex]}
                  alt={`Фото ${project.title} ${currentIndex + 1}`}
                  className="w-auto h-auto max-h-[calc(90vh-80px)] max-w-full object-contain rounded-lg"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
            </AnimatePresence>
          </div>

          <p className="text-white text-center mt-3 text-lg font-semibold">{project.title}</p>
          <p className="text-gray-400 text-sm">{currentIndex + 1} / {project.images.length}</p>

          <button onClick={onClose} className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-[100] transition-colors">
            <span className="text-xl font-bold">×</span>
          </button>
          {project.images.length > 1 && (
            <>
              <ModalPrevArrow onClick={handlePrevImage} />
              <ModalNextArrow onClick={handleNextImage} />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompletedProjectModal;