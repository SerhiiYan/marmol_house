import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Данные об этапах работы
const steps = [
  {
    title: 'Заявка и консультация',
    description: 'Обсуждаем проект и бюджет.',
  },
  {
    title: 'Подбор проекта',
    description: 'Готовые решения или индивидуальный подход.',
  },
  {
    title: 'Смета и договор',
    description: 'Фиксируем стоимость и сроки.',
  },
  {
    title: 'Строительство',
    description: 'Поэтапное выполнение работ.',
  },
  {
    title: 'Сдача объекта',
    description: 'Передача готового дома.',
  },
  {
    title: 'Гарантия и сопровождение',
    description: 'Остаёмся на связи: гарантийное обслуживание и помощь при эксплуатации.',
  },
];

// Компонент секции этапов работы
function HowWeWork() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    return () => AOS.refresh();
  }, []);

  return (
    <section
      className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="how-we-work-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="how-we-work-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6 sm:mb-8 text-[#17253c]"
          data-aos="zoom-in"
        >
          Как мы работаем
        </h2>

        <div
          className="grid gap-7 sm:grid-cols-2 md:grid-cols-3"
          role="list"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-l-4 border-yellow-500 md:[&:nth-child(2n)]:translate-y-4 sm:[&:nth-child(2n)]:translate-y-2`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              role="listitem"
            >
              <div
                className="absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-xs sm:text-sm"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {index + 1}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#17253c] mt-2 mb-1">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HowWeWork);