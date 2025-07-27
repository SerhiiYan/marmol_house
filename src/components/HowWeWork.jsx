// src/components/HowWeWork.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { steps } from '../data/siteData';


const HowWeWork = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 100 });
  }, []);

  return (

    <section className="bg-gray-50 py-20" aria-labelledby="how-we-work-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 id="how-we-work-heading" className="text-3xl md:text-4xl font-bold text-[#17253c]">
            Процесс работы в 6 простых шагов
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            От вашей идеи до ключей от готового дома — мы всегда рядом.
          </p>
        </div>


        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (

            <li 
              key={step.title}
              className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={50 + index * 50}
            >
              <div className="absolute -top-2 -right-2 text-[8rem] font-bold text-gray-100/80 -z-0" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <div className="mb-4 flex-shrink-0 w-12 h-12 bg-yellow-100 text-[#f9c615] rounded-full flex items-center justify-center">
                  {React.cloneElement(step.icon, { className: 'w-6 h-6' })}
                </div>

                <h3 className="text-lg font-semibold text-[#17253c] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default React.memo(HowWeWork);