import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HouseImage from '../assets/blueprint.png';

const reasons = [
  {
    title: 'Доступная цена и скорость',
    text: 'Каркасный дом обходится дешевле кирпичного и строится в разы быстрее — небольшой дом можно возвести всего за 60 дней.',
  },
  {
    title: 'Индивидуальный подход',
    text: 'Вы можете участвовать в проектировании: выбирать планировку, размеры помещений, расположение окон и многое другое.',
  },
  {
    title: 'Профессиональный подход',
    text: 'С вами работает команда архитекторов и дизайнеров, чтобы ваш дом был удобным, стильным и уникальным.',
  },
  {
    title: 'Доступность по всей Беларуси',
    text: 'Мы строим дома под ключ в Минске, Гродно, Бресте и других городах страны.',
  },
];

export default function WhyChooseFrameHouse() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Зображення */}
        <div data-aos="fade-right" className="flex justify-center">
          <img
            src={HouseImage}
            alt="Каркасный дом"
            className="w-full max-w-md"
          />
        </div>

        {/* Блок з текстами */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-aos="fade-up">
            Почему выбирают каркасный дом?
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
