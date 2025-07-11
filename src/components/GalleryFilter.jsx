// src/components/GalleryFilter.jsx

import { motion } from 'framer-motion';

const categories = ['Все', 'Бани', 'Дачи', 'Дом до 100м²', 'Дом от 100м²', 'Гаражи', 'Барнхаусы'];

const GalleryFilter = ({ selected, onSelect }) => {
  return (
    <nav className="flex justify-center my-8 md:my-12">
      <div className="flex w-full md:w-auto overflow-x-auto space-x-2 p-2 bg-gray-100 rounded-full scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`relative flex-shrink-0 px-4 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-colors ${
              selected === cat ? 'text-[#17253c]' : 'text-gray-500 hover:text-gray-900'
            }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {selected === cat && (
              <motion.div
                layoutId="filter-highlighter" 
                className="absolute inset-0 bg-white shadow-md rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default GalleryFilter;