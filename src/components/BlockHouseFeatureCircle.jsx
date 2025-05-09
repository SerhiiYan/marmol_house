import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BlockHouseImage from '../assets/blueprint2.png'; 

const advantages = [
  {
    title: 'Долговечность',
    text: 'Дома из газосиликатных блоков служат до 100–150 лет.',
    position: 'top-0 left-1/2 -translate-x-1/2',
    delay: 0,
  },
  {
    title: 'Тепло и звукоизоляция',
    text: 'Газосиликат отлично сохраняет тепло и защищает от шума.',
    position: 'top-1/2 left-0 -translate-y-1/2',
    delay: 100,
  },
  {
    title: 'Прочность и огнестойкость',
    text: 'Материал не уступает кирпичу по прочности и не горит.',
    position: 'bottom-0 left-1/2 -translate-x-1/2',
    delay: 200,
  },
  {
    title: 'Быстро и удобно',
    text: 'Дом строится за 3–5 месяцев, стены легко отделывать.',
    position: 'top-1/2 right-0 -translate-y-1/2',
    delay: 300,
  },

];

export default function BlockHouseFeatureCircle() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-white py-20 px-4 md:px-10 relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16" data-aos="fade-up">
        Преимущества домов из газосиликатных блоков
      </h2>

      {/* Desktop */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[700px]">
        <div className="absolute inset-0 flex items-center justify-center z-10" data-aos="zoom-in">
          <img
            src={BlockHouseImage}
            alt="Дом из газосиликатных блоков"
            className="w-[600px] h-[600px] object-contain"
          />
        </div>

        {advantages.map((adv, index) => (
          <div
            key={index}
            className={`absolute ${adv.position} transform w-72 md:w-80 bg-gray-50 p-6 rounded-xl shadow-md border hover:shadow-xl transition-all duration-300 z-20`}
            data-aos="fade-up"
            data-aos-delay={adv.delay}
          >
            <h3 className="text-lg md:text-xl text-yellow-500 font-semibold mb-2">{adv.title}</h3>
            <p className="text-base text-gray-700">{adv.text}</p>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="block md:hidden max-w-xl mx-auto">
        <div className="w-full flex justify-center mb-8" data-aos="zoom-in">
          <img
            src={BlockHouseImage}
            alt="Дом из газосиликатных блоков"
            className="w-30% h-30% object-contain"
          />
        </div>

        <div className="flex flex-col gap-6">
          {advantages.map((adv, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-xl shadow-md border"
              data-aos="fade-up"
              data-aos-delay={adv.delay}
            >
              <h3 className="text-yellow-500 font-semibold mb-1 text-base">{adv.title}</h3>
              <p className="text-sm text-gray-700">{adv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
