// src/components/TechnologyBenefits.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const TechnologyBenefits = ({ title, imageSrc, benefits, imageAlt, bgColor = 'bg-white' }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 150 });
  }, []);

  return (
    <section className={`${bgColor} py-20 px-4 sm:px-6 lg:px-10 overflow-hidden`} aria-label={title}>
      <h2
        className="text-3xl sm:text-4xl font-bold text-center text-[#17253c] mb-12 sm:mb-16"
        data-aos="fade-up"
      >
        {title}
      </h2>

      {/* Desktop Layout (с картинкой в центре) */}
      <div className="hidden lg:block relative w-full max-w-5xl mx-auto" style={{ height: '600px' }}>
        <div className="absolute inset-0 flex items-center justify-center z-10" data-aos="zoom-in" data-aos-duration="1000">
          <img
            src={imageSrc}
            loading="lazy"
            alt={imageAlt || title}
            className="max-w-xl max-h-[550px] object-contain"
          />
        </div>

        {/* Располагаем преимущества по кругу */}
        <div
          className="absolute w-64 h-64 bg-yellow-400/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          data-aos="zoom-in"
          data-aos-delay="200"
        />

        {benefits.map((benefit, index) => {
          // Позиции заданы так, чтобы карточки не пересекались
          const positions = [
            'top-0 left-1/2 -translate-x-1/2 -translate-y-1/4', // Верх, сдвинута чуть выше
            'top-1/2 right-0 translate-x-1/3',                 // Право, сдвинута чуть правее
            'bottom-0 left-1/3 -translate-x-1/2 translate-y-1/4',// Низ, сдвинута чуть ниже
            'top-1/2 left-0 -translate-x-1/3'                  // Лево, сдвинута чуть левее
          ];
          
          return (
             <div
                    key={benefit.title}
                    className={`absolute transform w-80 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition-all duration-300 z-20 hover:-translate-y-2 ${positions[index % 4]}`}
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 150}
                    >
                    <div className="flex items-center mb-3">
                        <span className="text-[#17253c] w-8 h-8 flex items-center justify-center mr-3">{benefit.icon}</span>
                        <h3 className="text-lg font-semibold text-[#17253c]">{benefit.title}</h3>
                    </div>
                    <p className="text-base text-gray-700">{benefit.text}</p>
                    </div>
                );
                })}
            </div>

      {/* Mobile Layout (карточки под картинкой) */}
      <div className="block lg:hidden max-w-xl mx-auto">
        <div className="w-full flex justify-center mb-10" data-aos="zoom-in">
          <img
            src={imageSrc}
            loading="lazy"
            alt={imageAlt || title}
            className="w-full max-w-xs sm:max-w-sm h-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-white p-6 rounded-2xl shadow-lg border"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-3">
                <span className="text-[#17253c] w-8 h-8 flex items-center justify-center mr-3">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-[#17253c]">{benefit.title}</h3>
              </div>
              <p className="text-base text-gray-700">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechnologyBenefits);