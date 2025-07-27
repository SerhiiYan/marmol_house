// src/components/ProcessSteps.jsx

import React from 'react';


const ProcessSteps = ({ title, steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (

    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl font-bold text-center text-[#17253c] mb-12" 
          data-aos="fade-up"
        >
          {title} 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.name} 
              className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2" 
              data-aos="zoom-in" 
              data-aos-delay={index * 100}
            >
              {step.image && (
                <div className="overflow-hidden h-48">
                  <img 
                    src={step.image} 
                    alt={step.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <step.icon className="w-6 h-6 text-[#17253c] mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-[#17253c]">
                    {step.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProcessSteps);