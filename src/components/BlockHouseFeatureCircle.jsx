import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaShieldAlt, FaVolumeDown, FaFire, FaTools } from 'react-icons/fa';
import BlockHouseImage from '../assets/blueprint2.png';

// Данные о преимуществах домов из газосиликатных блоков
const advantages = [
  {
    title: 'Долговечность',
    text: 'Дома из газосиликатных блоков служат до 100–150 лет.',
    icon: <FaShieldAlt />,
    position: 'top-0 left-1/2 -translate-x-1/2',
    delay: 0,
  },
  {
    title: 'Тепло и звукоизоляция',
    text: 'Газосиликат отлично сохраняет тепло и защищает от шума.',
    icon: <FaVolumeDown />,
    position: 'top-1/2 left-0 -translate-y-1/2',
    delay: 100,
  },
  {
    title: 'Прочность и огнестойкость',
    text: 'Материал не уступает кирпичу по прочности и не горит.',
    icon: <FaFire />,
    position: 'bottom-0 left-1/2 -translate-x-1/2',
    delay: 200,
  },
  {
    title: 'Быстро и удобно',
    text: 'Дом строится за 3–5 месяцев, стены легко отделывать.',
    icon: <FaTools />,
    position: 'top-1/2 right-0 -translate-y-1/2',
    delay: 300,
  },
];

// Компонент секции преимуществ домов из газосиликатных блоков
export default function BlockHouseFeatureCircle() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    return () => AOS.refresh();
  }, []);

  return (
    <section
      className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      aria-label="Преимущества домов из газосиликатных блоков"
      role="region"
    >
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#17253c] mb-8 sm:mb-12"
        data-aos="fade-up"
      >
        Преимущества домов из газосиликатных блоков
      </h2>

      {/* Desktop */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[700px]">
        <div className="absolute inset-0 flex items-center justify-center z-10" data-aos="zoom-in">
          <img
            src={BlockHouseImage}
            alt="Преимущества домов из газосиликатных блоков Marmol House"
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
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-2">{adv.icon}</span>
              <h3 className="text-base md:text-lg font-semibold text-yellow-500">{adv.title}</h3>
            </div>
            <p className="text-sm md:text-base text-gray-700">{adv.text}</p>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="block md:hidden max-w-xl mx-auto">
        <div className="w-full flex justify-center mb-6 sm:mb-8" data-aos="zoom-in">
          <img
            src={BlockHouseImage}
            alt="Преимущества домов из газосиликатных блоков Marmol House"
            className="w-full max-w-xs sm:max-w-sm h-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          {advantages.map((adv, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md border"
              data-aos="fade-up"
              data-aos-delay={adv.delay}
            >
              <div className="flex items-center mb-2">
                <span className="text-[#17253c] w-6 h-6 flex-shrink-0 mr-2">{adv.icon}</span>
                <h3 className="text-base font-semibold text-[#17253c]">{adv.title}</h3>
              </div>
              <p className="text-sm text-gray-700">{adv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}