import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBolt, FaClock, FaWeightHanging, FaHome } from 'react-icons/fa';
import HouseImage from '../assets/blueprint6.png';

// Данные о преимуществах каркасных домов
const reasons = [
  {
    title: 'Высокая энергоэффективность',
    text: 'Каркасные стены отлично сохраняют тепло зимой и прохладу летом, снижая расходы на отопление.',
    icon: <FaBolt />,
  },
  {
    title: 'Быстрое строительство',
    text: 'Полный цикл строительства — от фундамента до отделки — занимает от 2 до 4 месяцев.',
    icon: <FaClock />,
  },
  {
    title: 'Низкая нагрузка на фундамент',
    text: 'Легкая конструкция позволяет экономить на фундаменте и строить даже на слабых грунтах.',
    icon: <FaWeightHanging />,
  },
  {
    title: 'Гибкость планировок',
    text: 'Несущие элементы в стенах позволяют свободно менять внутреннюю планировку без сложных перепланировок.',
    icon: <FaHome />,
  },
];

// Компонент секции преимуществ каркасных домов
function WhyChooseFrameHouse() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    return () => AOS.refresh();
  }, []);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-gray-100" aria-label="Преимущества каркасных домов">
      {/* Заголовок для мобильных и планшетов */}
      <h2 className="lg:hidden text-2xl sm:text-3xl font-semibold text-[#17253c] mb-6 sm:mb-8 text-center" data-aos="fade-up">
        Почему выбирают каркасные дома
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
        {/* Изображение */}
        <div data-aos="zoom-in" className="flex justify-center lg:justify-center">
          <img
            src={HouseImage}
            loading="lazy"
            alt="Преимущества каркасных домов Marmol House"
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain"
          />
        </div>

        {/* Текстовые блоки */}
        <div>
          {/* Заголовок для десктопов */}
          <h2 className="hidden lg:block text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#17253c] mb-8 sm:mb-12 text-left" data-aos="fade-up">
            Почему выбирают каркасные дома
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 max-w-full"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500 w-10 h-10 p-3">{item.icon}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">{item.title}</h3>
                </div>
                <p className="text-gray-800 text-sm sm:text-base text-justify">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(WhyChooseFrameHouse);