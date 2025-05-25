import { motion } from 'framer-motion';

const categories = ['Все', 'Бани', 'Дачи', 'Дом до 100м²', 'Дом от 100м²', 'Гаражи', 'Барнхаусы'];

const GalleryFilter = ({ selected, onSelect }) => {
  return (
    <nav className="my-6 md:my-10">
      {/* Кнопки для планшетов и десктопа */}
      <div className="hidden md:flex overflow-x-auto gap-3 justify-center pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onSelect(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-3 py-2 rounded-full font-semibold text-base ${
              selected === cat
                ? 'bg-yellow-400 text-[#17253c]'
                : 'bg-gray-100 text-[#17253c] hover:bg-gray-200 border border-gray-300'
            }`}
            aria-current={selected === cat ? 'true' : 'false'}
          >
            {cat}
          </motion.button>
        ))}
      </div>
      {/* Для моб */}
      <div className="md:hidden">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-[#17253c] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Выберите категорию проектов"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default GalleryFilter;