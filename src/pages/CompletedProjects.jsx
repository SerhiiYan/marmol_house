import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import completedProjects from '../data/completedProjects';

// Кастомные стрелки
const ModalPrevArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-2 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={isMobile && !hasAnimated
      ? {
          x: [0, 30, -10, 0],
          transition: { times: [0, 0.4, 0.7, 1], duration: 1.2, ease: 'easeOut', repeat: 1 }
        }
      : { opacity: 1 }
    }
  >
    <FaChevronLeft className="text-xl" />
  </motion.button>
);

const ModalNextArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-2 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={isMobile && !hasAnimated
      ? {
          x: [0, 30, -10, 0],
          transition: { times: [0, 0.4, 0.7, 1], duration: 1.2, ease: 'easeOut', repeat: 1 }
        }
      : { opacity: 1 }
    }
  >
    <FaChevronRight className="text-xl" />
  </motion.button>
);

const getStructuredData = () => {
  const products = completedProjects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": project.title,
    "image": [`https://marmolhouse.by${project.images[0]}`],
    "description": project.description.join(', '),
    "brand": {
      "@type": "Organization",
      "name": "Marmol House"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://marmolhouse.by/completed",
      "priceCurrency": "BYN",
      "price": project.price.replace(/\D/g, ''), // видаляємо пробіли й "BYN"
      "availability": "https://schema.org/InStock"
    }
  }));

  return JSON.stringify(products, null, 2);
};

const CompletedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedImageIndex(null);
    setHasAnimated(false);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
    setHasAnimated(true);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
    setHasAnimated(true);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (deltaX > minSwipeDistance) handlePrevImage();
    else if (deltaX < -minSwipeDistance) handleNextImage();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleCloseModal();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pt-28 pb-10" aria-labelledby="completed-projects-heading">
      <Helmet>
        <title>Реализованные проекты | Marmol House</title>
        <meta
          name="description"
          content="Посмотрите завершенные проекты домов, построенные Marmol House по всей Беларуси. Фото, цены, описания и планировки."
        />
        <link rel="canonical" href="https://marmolhouse.by/completed" />
        <script type="application/ld+json">
          {getStructuredData()}
        </script>
      </Helmet>

      <h1 id="completed-projects-heading" className="text-3xl md:text-4xl font-bold text-center text-[#17253c] mb-4">
        Реализованные проекты
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Ознакомьтесь с нашими завершенными проектами, выполненными под ключ
      </p>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleOpenModal(project)}
                className="text-left w-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.images[0]}
                    loading="lazy"
                    alt={`Проект: ${project.title}`}
                    className="w-full h-64 sm:h-56 lg:h-60 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-[#17253c] text-xs font-semibold px-2 py-1 rounded">
                    Завершен
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#17253c]">{project.title}</h3>
                  <ul className="text-gray-600 text-sm mt-2 list-disc pl-5">
                    {project.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <span className="block text-rose-600 text-lg font-semibold mt-3">
                    Цена: {project.price}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && selectedImageIndex !== null && (
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
                  key={selectedImageIndex}
                  src={selectedProject.images[selectedImageIndex]}
                  alt={`Фото ${selectedProject.title} ${selectedImageIndex + 1}`}
                  className="w-auto h-auto max-h-[80vh] max-w-[90vw] object-contain rounded"
                  loading="lazy"
                  initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 0 }}
                  animate={
                    isMobile && !hasAnimated
                      ? {
                          x: [0, 30, -10, 0],
                          transition: {
                            x: {
                              times: [0, 0.4, 0.7, 1],
                              duration: 1.2,
                              ease: 'easeOut',
                              repeat: 1,
                            },
                          },
                        }
                      : { opacity: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.2 } }}
                />
                <motion.button
                  onClick={handleCloseModal}
                  className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-[100]"
                >
                  <span className="text-xl font-bold">×</span>
                </motion.button>
                {selectedProject.images.length > 1 && (
                  <>
                    <ModalPrevArrow onClick={handlePrevImage} isMobile={isMobile} hasAnimated={hasAnimated} />
                    <ModalNextArrow onClick={handleNextImage} isMobile={isMobile} hasAnimated={hasAnimated} />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CompletedProjects;
