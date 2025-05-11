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
    title: 'Сдача объекта',
    description: 'Передача готового дома.',
  },
  {
    title: 'Гарантия и сопровождение',
    description: 'Остаёмся на связи: гарантийное обслуживание и помощь при эксплуатации.',
  },
];


export default function HowWeWork() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2x1 md:text-3xl font-semibold text-center mb-8 text-gray-900">
          Как мы работаем
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-gray-900">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  {step.title}
                </h3>
              </div>
              <p className="text-x text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
