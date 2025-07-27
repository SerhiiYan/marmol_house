// src/components/OurBenefits.jsx

import React from 'react';

const OurBenefits = ({ benefits }) => {

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {benefits.map((benefit, index) => (
          <div 
            key={benefit.name} 
            className="flex flex-col items-center" 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
          >
            <benefit.icon className="w-12 h-12 text-[#f9c615] mb-4" />
            <h3 className="text-xl font-semibold text-[#17253c]">{benefit.name}</h3>
            <p className="mt-2 text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(OurBenefits);