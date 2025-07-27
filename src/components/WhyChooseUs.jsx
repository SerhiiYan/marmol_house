// src/components/WhyChooseUs.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ceoImage from '../assets/ceo.webp'; 
import logoWatermark from '../assets/logo.png'; 
import { whyChooseUsBenefits } from '../data/siteData';

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20 overflow-hidden" aria-labelledby="why-us-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right" className="hidden lg:block w-full h-[700px] relative group">
                <div className="absolute inset-0 bg-gray-50 rounded-2xl"></div>
                <div className="absolute top-0 right-0 h-full w-2/3 bg-white/80 transform -skew-x-12 translate-x-1/4 transition-transform duration-500 ease-out group-hover:translate-x-1/3"></div>
                <div className="absolute top-0 left-0 h-full w-2/3 bg-[#f9c615]/80 transform -skew-x-12 -translate-x-1/4 transition-transform duration-500 ease-out group-hover:-translate-x-1/3 relative overflow-hidden"> 
                    <img src={logoWatermark} alt="" className="absolute -bottom-12 left-8 top-20 w-3/4 h-3/4 object-contain opacity-20"/>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full transition-transform duration-500 ease-out group-hover:scale-105 z-10">
                    <img 
                        src={ceoImage} 
                        alt="Мармоль Юрий, руководитель строительной компании Marmol House" 
                        className="absolute bottom-0 h-full w-full object-contain object-bottom transition-all duration-500 ease-out group-hover:drop-shadow-[0_4px_50px_rgba(249,198,21,0.5)] group-hover:brightness-115"
                    />
                </div>
            </div>

            <div data-aos="fade-left" className="lg:col-start-2">
                <div className="text-center lg:text-left mb-12">
                    <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold text-[#17253c] mt-2">
                        Почему нам доверяют строительство своего дома
                    </h2>
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyChooseUsBenefits.map((benefit, index) => (
                    <li key={benefit.title}>
                        <div 
                            className="bg-gray-50/70 p-6 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-white transition-all duration-300 h-full"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-[#17253c]">{benefit.title}</h3>
                                <p className="mt-2 text-gray-600 text-semi leading-relaxed">{benefit.description}</p>
                                <Link to={benefit.linkTo} className="text-sm font-semibold text-[#17253c] hover:text-[#f9c615] transition-colors mt-4 inline-block">
                                    {benefit.linkText} →
                                </Link>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;