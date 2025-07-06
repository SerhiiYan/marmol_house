import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import safetyIcon from '../assets/safety.png';
import priceIcon from '../assets/price.png';
import expIcon from '../assets/exp.png';
import garantieIcon from '../assets/garantie.png';

// Данные о преимуществах компании
const features = [
  {
    title: 'Надёжное строительство',
    description:
      'Строим тёплые и комфортные дома по всей Беларуси — каркасные, газосиликатные, с мансардой или без. Всё под ключ.',
    icon: safetyIcon,
  },
  {
    title: 'Фиксированная цена',
    description:
      'Цена фиксируется в договоре и остаётся неизменной. Изменения возможны только по желанию заказчика.',
    icon: priceIcon,
  },
  {
    title: '10 лет опыта',
    description:
      'У нас слаженная команда профессионалов. Каждый специалист имеет опыт, квалификацию и разряд.',
    icon: expIcon,
  },
  {
    title: 'Гарантия 5 лет',
    description:
      'Даём 5 лет гарантии на все работы. Объект обслуживается в течение этого срока бесплатно по гарантии.',
    icon: garantieIcon,
  },
];

// Варианты анимации для иконки
const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 12, scale: 1.1 },
};

function WhyChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    return () => AOS.refresh();
  }, []);

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-gray-50"
      aria-labelledby="why-choose-us-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12" data-aos="zoom-in">
        <h2
          id="why-choose-us-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#17253c] mb-4"
        >
          Почему выбирают нас?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Узнайте, почему сотни клиентов доверяют нам строительство своих домов.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-4 sm:p-6 rounded-xl hover:bg-gray-100/50 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover="hover"
          >
            <motion.div
              className="flex justify-center mb-4"
              variants={iconVariants}
              transition={{ duration: 0.3 }}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-12 h-12 rounded-full bg-white shadow-md p-2 object-contain"
                loading="lazy"
              />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#17253c] mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(WhyChooseUs);