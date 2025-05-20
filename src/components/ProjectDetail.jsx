import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import projects from '../data/projects';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ModalForm from './ModalForm';
import ProjectCard from './ProjectCard';

// Кастомные стрелки для слайдеров
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full ml-2 p-1 shadow-md"
  >
    <FaChevronLeft className="text-xl text-gray-800" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full mr-2 p-1 shadow-md"
  >
    <FaChevronRight className="text-xl text-gray-800" />
  </button>
);

// Кастомные стрелки для модального окна
const ModalPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-4 z-[100] bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
  >
    <FaChevronLeft className="text-xl text-gray-800" />
  </button>
);

const ModalNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-4 z-[100] bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
  >
    <FaChevronRight className="text-xl text-gray-800" />
  </button>
);

const ProjectDetail = () => {
  const [formInfo, setFormInfo] = useState({ show: false, comment: '' });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Для модального окна изображения
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  // Для анимации слайдера других проектов
  const relatedProjectsRef = useRef(null);
  const isRelatedProjectsInView = useInView(relatedProjectsRef, { once: true, margin: '-50px' });

  if (!project) return <div>Проект не найден</div>;

  // Настройки основного слайдера
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Настройки слайдера других проектов
  const relatedProjectsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Фильтруем проекты, исключая текущий
  const relatedProjects = projects.filter((p) => p.id !== parseInt(id));

  // Закрытие модального окна при клике вне изображения
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImageIndex(null);
    }
  };

  // Переключение изображений в модальном окне
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 py-10">
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
                  className="h-[500px] w-full object-cover rounded cursor-pointer"
                  onClick={() => setSelectedImageIndex(idx)}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Текст справа */}
        <div className="w-full lg:w-1/2 text-[#17253c]">
          <h2 className="font-semibold text-md mb-1">Спецификация</h2>
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
            onClick={() =>
              setFormInfo({
                show: true,
                comment: `Добрый день, хочу консультацию по проекту "${project.title}"`,
              })
            }
            className="mt-4 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300"
          >
            Заказать консультацию
          </button>
        </div>
      </div>

      {/* Слайдер других проектов снизу */}
      {relatedProjects.length > 0 && (
        <motion.div
          ref={relatedProjectsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isRelatedProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-[#17253c] mb-4">
            Другие проекты
          </h3>
          <Slider {...relatedProjectsSettings}>
            {relatedProjects.map((relatedProject) => (
              <div key={relatedProject.id} className="px-2">
                <ProjectCard project={relatedProject} />
              </div>
            ))}
          </Slider>
        </motion.div>
      )}

      {/* Модальное окно для просмотра изображения */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center">
            <img
              src={project.images[selectedImageIndex]}
              alt={`Изображение ${selectedImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] max-w-[90vw] object-contain rounded"
            />
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex justify-center shadow-md z-[100]"
            >
              <span className="text-xl text-gray-800 font-bold">×</span>
            </button>
            {project.images.length > 1 && (
              <>
                <ModalPrevArrow onClick={handlePrevImage} />
                <ModalNextArrow onClick={handleNextImage} />
              </>
            )}
          </div>
        </div>
      )}

      <ModalForm
        show={formInfo.show}
        onClose={() => setFormInfo({ show: false, comment: '' })}
        defaultComment={formInfo.comment}
      />
    </div>
  );
};

export default ProjectDetail;