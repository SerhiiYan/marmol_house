const categories = ['Все', 'Бани', 'Дачи', 'Дом до 100м²', 'Дом от 100м²', 'Гаражи', 'Барнхаусы']

const GalleryFilter = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-4 mb-10 mt-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? 'bg-primary text-white'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default GalleryFilter
