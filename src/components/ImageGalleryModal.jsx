// src/components/ImageGalleryModal.jsx (Исправлена анимация)

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ModalPrevArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-4 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={
      isMobile && !hasAnimated ? { x: [0, 30, -10, 0], transition: { x: { times: [0, 0.4, 0.7, 1], duration: 1.2, ease: 'easeOut' } } } : { opacity: 1 }
    }
  >
    <FaChevronLeft className="text-xl" />
  </motion.button>
);

const ModalNextArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-4 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={
      isMobile && !hasAnimated ? { x: [0, -30, 10, 0], transition: { x: { times: [0, 0.4, 0.7, 1], duration: 1.2, ease: 'easeOut' } } } : { opacity: 1 }
    }
  >
    <FaChevronRight className="text-xl" />
  </motion.button>
);

const ImageGalleryModal = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasAnimated, setHasAnimated] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    if (!hasAnimated) setHasAnimated(true); 
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    if (!hasAnimated) setHasAnimated(true); 
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative inline-block">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Изображение ${currentIndex + 1}`}
              className="w-auto h-auto max-h-[80vh] max-w-[90vw] object-contain rounded"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.2 } }}
            />
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-[100]"
            >
              <span className="text-xl font-bold">×</span>
            </motion.button>
            {images.length > 1 && (
              <>
                <ModalPrevArrow onClick={handlePrevImage} isMobile={isMobile} hasAnimated={hasAnimated} />
                <ModalNextArrow onClick={handleNextImage} isMobile={isMobile} hasAnimated={hasAnimated} />
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageGalleryModal;