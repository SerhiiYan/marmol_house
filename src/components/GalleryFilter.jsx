// src/components/GalleryFilter.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const categories = ['Все', 'Бани', 'Дачи', 'Дом до 100м²', 'Дом от 100м²', 'Гаражи', 'Барнхаусы'];

const GalleryFilter = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-center my-8 md:my-12" aria-label="Фильтр категорий проектов">
        
        {/* Десктопная версия (без изменений) */}
        <div className="hidden md:flex p-2 bg-gray-100 rounded-full">
            {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`relative flex-shrink-0 px-4 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                selected === cat ? 'text-[#17253c]' : 'text-gray-500 hover:text-gray-900'
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
              role="tab"
              aria-selected={selected === cat}
            >
              {selected === cat && (
                <motion.div
                  layoutId="filter-highlighter" 
                  className="absolute inset-0 bg-white shadow-md rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
            ))}
        </div>

        {/* ========================================================= */}
        {/*      МОБИЛЬНАЯ ВЕРСИЯ (с кастомным дропдауном)         */}
        {/* ========================================================= */}
        <div className="relative w-full max-w-xs md:hidden" onMouseLeave={() => setIsOpen(false)}>
            {/* 1. Кнопка, которая выглядит как select */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center bg-gray-100 border-2 border-gray-200 text-gray-800 font-semibold py-3 pl-4 pr-3 rounded-full"
            >
                <span>{selected}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>

            {/* 2. Выпадающий список */}
            <AnimatePresence>
            {isOpen && (
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-10 overflow-hidden"
                >
                    {categories.map(cat => (
                        <li key={cat} className="border-b border-gray-100 last:border-b-0">
                            <button
                                onClick={() => {
                                    onSelect(cat);
                                    setIsOpen(false);
                                }}
                                // Увеличиваем отступы и размер шрифта
                                className={`w-full text-left py-4 px-4 text-lg font-medium transition-colors ${selected === cat ? 'bg-yellow-100 text-yellow-800' : 'hover:bg-gray-50'}`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </motion.ul>
            )}
            </AnimatePresence>
        </div>
    </nav>
  );
};

export default GalleryFilter;