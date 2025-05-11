import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HouseImage from '../assets/blueprint6.png';

const reasons = [
  {
    title: 'Высокая энергоэффективность',
    text: 'Каркасные стены отлично сохраняют тепло зимой и прохладу летом, снижая расходы на отопление.',
  },
  {
    title: 'Быстрое строительство',
    text: 'Полный цикл строительства — от фундамента до отделки — занимает от 2 до 4 месяцев.',
  },
  {
    title: 'Низкая нагрузка на фундамент',
    text: 'Легкая конструкция позволяет экономить на фундаменте и строить даже на слабых грунтах.',
  },
  {
    title: 'Гибкость планировок',
    text: 'Несущие элементы в стенах позволяют свободно менять внутреннюю планировку без сложных перепланировок.',
  },
];


export default function WhyChooseFrameHouse() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* image */}
        <div data-aos="fade-right" className="mt-10 flex justify-center">
          <img
            src={HouseImage}
            alt="Каркасный дом"
            className="w-full max-w-md"
          />
        </div>

        {/* text blocks */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6" data-aos="fade-up">
            Преимущества каркасных домов
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-md font-semibold text-yellow-600 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
