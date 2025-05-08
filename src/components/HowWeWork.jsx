import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    title: 'Сдача объекта "под ключ"',
    description: 'Передача готового дома.',
  },
];

export default function HowWeWork() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative bg-white py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Как мы работаем
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="w-full sm:w-[300px] flex flex-col items-start p-6 rounded-xl border bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold mr-3">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
