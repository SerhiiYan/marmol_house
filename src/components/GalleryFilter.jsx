import { motion } from 'framer-motion';

const categories = ['Все', 'Бани', 'Дачи', 'Дом до 100м²', 'Дом от 100м²', 'Гаражи', 'Барнхаусы'];

const GalleryFilter = ({ selected, onSelect }) => {
  return (
    <nav className="flex overflow-x-auto gap-3 justify-center my-6 md:my-10 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm md:text-base ${
            selected === cat
              ? 'bg-yellow-400 text-[#17253c]'
              : 'bg-gray-100 text-[#17253c] hover:bg-gray-200'
          }`}
          aria-current={selected === cat ? 'true' : 'false'}
        >
          {cat}
        </motion.button>
      ))}
    </nav>
  );
};

export default GalleryFilter;