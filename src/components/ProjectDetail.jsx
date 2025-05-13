import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useParams } from 'react-router-dom'
import projects from '../data/projects'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState } from 'react'
import ModalForm from './ModalForm'


// Кастомные стрелки для слайдера
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
  >
    <FaChevronLeft className="text-xl text-gray-800" />
  </button>
)

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
  >
    <FaChevronRight className="text-xl text-gray-800" />
  </button>
)

const ProjectDetail = () => {
  const [formInfo, setFormInfo] = useState({ show: false, comment: '' });


  const { id } = useParams()
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) return <div>Проект не найден</div>

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <div className="max-w-6x1 mx-auto px-4 pt-28 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#17253c]">{project.title}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Слайдер слева */}
        <div className="w-full lg:w-1/2 relative">
          <Slider {...settings}>
            {project.images.map((img, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={img}
                  alt={`Изображение ${idx + 1}`}
                  className="h-[500px] w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
      </div>

        {/* Текст справа */}
        <div className="w-full lg:w-1/2 text-[#17253c]">
            <h2 className='font-semibold text-md mb-1'>Спецификация</h2>
          <ul className="list-disc pl-5 space-y-1">
            {project.description.map((line, i) => (
              <li key={i} className="text-gray-800">{line}</li>
            ))}
          </ul>

          {project.packages?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-md mb-1">Комплектации:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.packages.map((line, idx) => (
                  <li key={idx} className="text-gray-800">{line}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-4 font-semibold text-lg text-red-600">
            Цена: {project.price}
          </p>
          <button
            onClick={() => setFormInfo({
              show: true,
              comment: `Добрый день, хочу консультацию по проекту "${project.title}"`
            })}
            className="mt-4 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300"
          >
            Заказать консультацию
          </button>

          {/* <p className="mt-1 text-sm text-gray-600">
            Материалы: {project.materials}
          </p> */}
        </div>
      </div>
      <ModalForm
        show={formInfo.show}
        onClose={() => setFormInfo({ show: false, comment: '' })}
        defaultComment={formInfo.comment}
      />
    </div>
  )
}

export default ProjectDetail
