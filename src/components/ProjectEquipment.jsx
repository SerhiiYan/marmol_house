// src/components/ProjectEquipment.jsx

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { generateFaqSchema } from '../utils/seo-helpers';
import { categories } from '../data/siteData';


const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

const ProjectEquipment = ({ packages }) => {
const [activeItem, setActiveItem] = useState(packages?.[0] || null); 
const equipmentRef = useRef(null);
const isEquipmentInView = useInView(equipmentRef, { once: true, margin: '-50px' });
const isMobile = useIsMobile();
const activeIndex = packages.findIndex(p => p === activeItem);

if (!packages?.length || !categories?.length) return null;
const faqSchemaJson = generateFaqSchema(packages, categories);

  return (
    <>
      <script type="application/ld+json">{faqSchemaJson}</script>
    
      <motion.section 
        ref={equipmentRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isEquipmentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-16"
        aria-labelledby="equipment-heading" 
      >
        <div className="text-center mb-12">
          <h2 id="equipment-heading" className="text-3xl md:text-4xl font-bold text-[#17253c]">
            Варианты комплектации
          </h2>
          <p className="mt-4 text-semi text-gray-600 max-w-3xl mx-auto">
            Мы предлагаем несколько вариантов комплектации для каждого проекта: от базового "короба" до дома "под ключ" с полной инженерной подготовкой. Выберите подходящий вариант, чтобы увидеть детальный состав работ и материалов.
          </p>
        </div>

        {isMobile ? (
          <div className="space-y-3">
            {packages.map((pkgName) => {
              const isOpen = activeItem === pkgName;
              const pkgIndex = packages.findIndex(p => p === pkgName);
              // Если вдруг индекс не нашелся, пропускаем рендер (защита)
              if (pkgIndex === -1) return null;
              
              return (
                <div key={pkgName} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <h3 className="w-full m-0">
                    <button
                      onClick={() => setActiveItem(isOpen ? null : pkgName)}
                      className="w-full p-4 flex justify-between items-center text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-[#17253c]">{pkgName}</span>
                      <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </h3>
                  <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      role="region"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-4 border-t">
                        {categories.map((cat) => (
                          <div key={cat.title}>
                            <h4 className="font-semibold text-gray-800">{cat.title}</h4>
                            <p 
                              className="text-gray-600 text-sm mt-1"
                              dangerouslySetInnerHTML={{ __html: cat.items[pkgIndex] }}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-8 bg-gray-100 p-1.5 rounded-full">
              {packages.map(pkgName => (
                <button 
                  key={pkgName} 
                  onClick={() => setActiveItem(pkgName)} 
                  className={`relative w-full px-4 py-2.5 text-sm sm:text-base font-bold rounded-full transition-colors ${activeItem === pkgName ? 'text-[#17253c]' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  {activeItem === pkgName && ( 
                      <motion.div 
                          layoutId="equipment-tab-highlighter" 
                          className="absolute inset-0 bg-white shadow-md rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      /> 
                  )}
                  <span className="relative z-10">{pkgName}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeItem && activeIndex !== -1 && (
                <motion.div 
                  key={activeItem} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 bg-white p-8 rounded-2xl shadow-sm border">
                    {categories.map((cat) => (
                      <div key={cat.title}>
                        <h4 className="font-semibold text-gray-800">{cat.title}</h4>
                        <p 
                          className="text-gray-600 text-semi mt-1"
                          dangerouslySetInnerHTML={{ __html: cat.items[activeIndex] }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.section>
    </>
  );
};

export default ProjectEquipment;