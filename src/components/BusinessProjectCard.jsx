// src/components/BusinessProjectCard.jsx

import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slugify } from '../utils/slugify';

const BusinessProjectCard = ({ project, onOrderClick }) => {
  const projectUrl = `/projects/${slugify(project.title)}`;

  // Настройки слайдера
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: false, // Авто-листание отключено, как договаривались
    fade: true,
  };

  return (
    <div className="group relative flex flex-col h-[550px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      
      {/* Слайдер */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Slider {...sliderSettings} className="h-full w-full business-card-slider">
          {project.images && project.images.slice(0, 3).map((img, index) => (
            <div key={index} className="h-full">
              <img 
                src={img} 
                alt={`${project.title} - фото ${index + 1}`} 
                className="w-full h-[550px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#17253c] via-[#17253c]/50 to-transparent z-10 pointer-events-none"></div>

      <div className="relative z-20 mt-auto w-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold leading-tight mb-2">{project.title}</h3>
        
        {project.businessData && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-yellow-400 mb-3">
            <span>{project.businessData.capacity}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{project.businessData.nightlyRate}</span>
          </div>
        )}

        {/* ИЗМЕНЕНИЕ ЗДЕСЬ: Убрали слово "Строительство", сделали цену крупнее */}
        <div className="mb-4 border-t border-white/20 pt-3">
          <p className="text-3xl font-bold text-white">{project.price}</p>
        </div>

        <div className="grid gap-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <button
              onClick={() => onOrderClick(`Здравствуйте, интересует инвестиционный проект "${project.title}".`)}
              className="w-full text-center bg-[#f9c615] text-[#17253c] font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Рассчитать стоимость
            </button>
            
            <Link 
              to={projectUrl} 
              className="w-full text-center bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-[#17253c] transition-colors"
            >
              Подробнее
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessProjectCard;