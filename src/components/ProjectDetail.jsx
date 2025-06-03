import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import projects from '../data/projects';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ModalForm from './ModalForm';
import ProjectCard from './ProjectCard';
import ProjectEquipment from './ProjectEquipment';

// Кастомные стрелки для слайдеров
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full p-1 ml-2 shadow-md"
  >
    <FaChevronLeft className="text-xl text-gray-800" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-1 mr-2 shadow-md"
  >
    <FaChevronRight className="text-xl text-gray-800" />
  </button>
);

// Кастомные стрелки для модального окна
const ModalPrevArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-4 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={
      isMobile && !hasAnimated
        ? {
            x: [0, 30, -10, 0],
            transition: {
              x: {
                times: [0, 0.4, 0.7, 1],
                duration: 1.2,
                ease: 'easeOut',
                repeat: 1,
              },
            },
          }
        : { opacity: 1 }
    }
  >
    <FaChevronLeft className="text-xl" />
  </motion.button>
);

const ModalNextArrow = ({ onClick, isMobile, hasAnimated }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-4 z-[100] bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md"
    initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
    animate={
      isMobile && !hasAnimated
        ? {
            x: [0, 30, -10, 0],
            transition: {
              x: {
                times: [0, 0.4, 0.7, 1],
                duration: 1.2,
                ease: 'easeOut',
                repeat: 1,
              },
            },
          }
        : { opacity: 1 }
    }
  >
    <FaChevronRight className="text-xl" />
  </motion.button>
);

const ProjectDetail = () => {
  const [formInfo, setFormInfo] = useState({ show: false, comment: '' });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  // Для анимации слайдера других проектов
  const relatedProjectsRef = useRef(null);
  const isRelatedProjectsInView = useInView(relatedProjectsRef, { once: true, margin: '-50px' });

  // Проверка мобильного устройства
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Сброс анимации при закрытии модального окна
  useEffect(() => {
    if (selectedImageIndex === null) {
      setHasAnimated(false);
    }
  }, [selectedImageIndex]);

  if (!project) return;

  // Данные комплектаций
  const categories = [
    {
      title: "Фундамент",
      items: [
        "Свайно-ростверковый: сваи Ø300 мм, ростверк 250×400 мм, арматура Ø10 мм.",
        "Свайно-ростверковый усиленный: ростверк 300 мм, до 700 мм, арматура Ø12 мм.",
        "Монолитный ленточный, арматура Ø12 мм.",
      ],
    },
    {
      title: "Стены",
      items: [
        "Каркас 50×150 мм, утепление 150 мм, обшивка имитацией бруса.",
        "Каркас 50×150 мм + утепление 50 мм, ветрозащита, обшивка брус/штукатурка.",
        "<strong>Газосиликат 400 мм</strong> + утепление 50 мм, дерево/штукатурка.",
      ],
    },
    {
      title: "Перегородки",
      items: [
        "Брус 50×150 мм, звукоизоляция 100 мм.",
        "Брус 50×150 мм, звукоизоляция 150 мм.",
        "Газоблоки 100/200 мм, кирпич в санузлах.",
      ],
    },
    {
      title: "Потолок",
      items: [
        "Высота 2.6 м, утепление 150 мм, гипсокартон.",
        "Высота 2.7 м, утепление 150 мм, гипсокартон 2 слоя.",
        "Высота 2.7 м, утепление 150 мм, гипсокартон 2 слоя.",
      ],
    },
    {
      title: "Пол",
      items: [
        "Стяжка по песчаной подушке, бетон М250.",
        "Утепление пенополистирол 50 мм + стяжка М250.",
        "Утепление экструдированный пенополистирол + стяжка.",
      ],
    },
    {
      title: "Окна",
      items: [
        "Однокамерные стеклопакеты, трехкамерный профиль.",
        "Двухкамерные стеклопакеты, пятикамерный профиль.",
        "Двухкамерные стеклопакеты, пятикамерный профиль.",
      ],
    },
    {
      title: "Кровля",
      items: [
        'Металлочерепица "Монтеррей Norman".',
        "Металлочерепица + водосточная система.",
        "Металлочерепица + водосточная система.",
      ],
    },
    {
      title: "Инженерия",
      items: [
        "Без электрики и сантехники.",
        "Электрика, сантехника, вентиляция.",
        "Полный комплект: электрика, сантехника, вентиляция.",
      ],
    },
  ]
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
    setHasAnimated(true); // Отключаем анимацию после смены изображения
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setHasAnimated(true); // Отключаем анимацию после смены изображения
  };

  // Обработка свайпов для мобильных
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50; // Минимальная дистанция свайпа

    if (deltaX > minSwipeDistance) {
      handlePrevImage(); // Свайп вправо → предыдущее изображение
    } else if (deltaX < -minSwipeDistance) {
      handleNextImage(); // Свайп влево → следующее изображение
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#17253c]">{project.title}</h1>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Слайдер слева */}
        <div className="w-full lg:w-1/2 relative">
          <Slider {...settings}>
            {project.images.map((img, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={img}
                  alt={`Изображение ${idx + 1}`}
                  className="h-[500px] w-full object-cover rounded cursor-pointer"
                  loading="lazy"
                  onClick={() => setSelectedImageIndex(idx)}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Текст справа */}
        <div className="w-full lg:w-1/2 text-[#17253c] flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <h2 className="font-semibold text-md mb-1">Спецификация</h2>
          <ul className="list-disc pl-5 space-y-1 flex-1">
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
          {/* <button
            onClick={() =>
              setFormInfo({
                show: true,
                comment: `Добрый день, хочу консультацию по проекту "${project.title}"`,
              })
            }
            className="mt-4 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300 self-start"
          >
            Заказать консультацию
          </button> */}
        </div>
      </div>

      {/* Блок комплектаций */}
      <ProjectEquipment packages={project.packages} categories={categories} />

      {/* Слайдер других проектов */}
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
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative inline-block">
                <motion.img
                  key={selectedImageIndex}
                  src={project.images[selectedImageIndex]}
                  alt={`Изображение ${selectedImageIndex + 1}`}
                  className="w-auto h-auto max-h-[80vh] max-w-[90vw] object-contain rounded"
                  loading="lazy"
                  initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 0 }}
                  animate={
                    isMobile && !hasAnimated
                      ? {
                          x: [0, 30, -10, 0],
                          transition: {
                            x: {
                              times: [0, 0.4, 0.7, 1],
                              duration: 1.2,
                              ease: 'easeOut',
                              repeat: 1,
                            },
                          },
                        }
                      : { opacity: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.2 } }}
                />
                {/* Хрестик с анимацией */}
                <motion.button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-[100]"
                  initial={isMobile && !hasAnimated ? { x: 0 } : { opacity: 1 }}
                  animate={
                    isMobile && !hasAnimated
                      ? {
                          x: [0, 30, -10, 0],
                          transition: {
                            x: {
                              times: [0, 0.4, 0.7, 1],
                              duration: 1.2,
                              ease: 'easeOut',
                              repeat: 1,
                            },
                          },
                        }
                      : { opacity: 1 }
                  }
                >
                  <span className="text-xl font-bold">×</span>
                </motion.button>
                {project.images.length > 1 && (
                  <>
                    <ModalPrevArrow onClick={handlePrevImage} isMobile={isMobile} hasAnimated={hasAnimated} />
                    <ModalNextArrow onClick={handleNextImage} isMobile={isMobile} hasAnimated={hasAnimated} />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalForm
        show={formInfo.show}
        onClose={() => setFormInfo({ show: false, comment: '' })}
        defaultComment={formInfo.comment}
      />
    </div>
  );
};

export default ProjectDetail;