import { useRef, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  if (!project) return null

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white max-w-6xl w-full p-6 rounded-lg relative overflow-hidden shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute z-20 top-1 right-4 text-3xl text-gray-600 hover:text-red-600"
        >
          &times;
        </button>

        {/* Контейнер картинки + текст */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Слайдер слева */}
          <div className="w-full lg:w-1/2">
            <Slider {...settings}>
              {project.images.map((img, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={img}
                    alt={`Фото ${idx + 1}`}
                    className="h-[500px] w-full object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Текст справа */}
          <div className="w-full lg:w-1/2 text-[#17253c]">
            <h2 className="text-2xl font-bold">{project.title}</h2>

            {/* Описание помещений */}
<ul className="list-disc pl-5 mt-2 space-y-1">
  {project.description.map((line, index) => (
    <li key={index} className="text-gray-800">{line}</li>
  ))}
</ul>

{/* Блок комплектаций, если есть */}
{project.packages && project.packages.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold text-md mb-1">Комплектации:</h3>
    <ul className="list-disc pl-5 space-y-1">
      {project.packages.map((line, idx) => (
        <li key={idx} className="text-gray-800">{line}</li>
      ))}
    </ul>
  </div>
)}


            <p className="mt-4 font-semibold text-lg text-orange-600">
              Цена: {project.price}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Материалы: {project.materials}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
