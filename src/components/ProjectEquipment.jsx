import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectEquipment = ({ packages, categories }) => {
  const [activePackage, setActivePackage] = useState(0); // Для вкладок/акордеона
  const equipmentRef = useRef(null);
  const isEquipmentInView = useInView(equipmentRef, { once: true, margin: '-50px' });

  if (!packages?.length || !categories?.length) return null;

  return (
    <motion.div
      ref={equipmentRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isEquipmentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-12"
    >
      <h3 className="text-lg font-semibold text-[#17253c] mb-4">
        Комплектации проекта
      </h3>
      {/* Вкладки для десктопа */}
      <div className="hidden md:block">
        <div className="flex border-b  mb-4">
          {packages.map((pkg, idx) => (
            <button
              key={idx}
              onClick={() => setActivePackage(idx)}
              className={`px-4 py-2 font-semibold text-sm md:text-base ${
                activePackage === idx
                  ? 'border-b-2 border-yellow-400 text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>
        <motion.div
          key={activePackage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-4"
        >
          {categories.map((cat, idx) => (
            <div key={idx} className="flex border-b last:border-b-0 py-2">
              <div className="w-1/3 font-medium text-gray-800">{cat.title}</div>
              <div
                className="w-2/3 text-gray-600"
                dangerouslySetInnerHTML={{ __html: cat.items[activePackage] }}
              />
            </div>
          ))}
        </motion.div>
      </div>
      {/* Акордеон для мобильных */}
      <div className="md:hidden space-y-4">
        {packages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow-md"
          >
            <button
              onClick={() => setActivePackage(activePackage === idx ? null : idx)}
              className="w-full p-4 flex items-center justify-between text-left font-medium text-gray-800"
            >
              <span>{pkg}</span>
              <span>{activePackage === idx ? '−' : '+'}</span>
            </button>
            {activePackage === idx && (
              <div className="p-4 space-y-2">
                {categories.map((cat, catIdx) => (
                  <div key={catIdx}>
                    <h4 className="font-medium text-gray-800">{cat.title}</h4>
                    <p
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: cat.items[idx] }}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectEquipment;