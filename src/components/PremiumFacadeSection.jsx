// src/components/PremiumFacadeSection.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PremiumFacadeSection = ({ showButton = false, onOrderClick }) => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        <div data-aos="fade-up" className="w-full h-96 lg:order-last">
          <Slider 
              dots={true}
              arrows={false}
              infinite={true}
              speed={500}
              autoplay={true}
              autoplaySpeed={3000}
              className="h-full"
          >
              <div>
                  <img src="/assets/brick-offer/1.jpg" alt="Фасад из клинкерного кирпича Графит" className="w-full h-96 object-cover rounded-xl" />
              </div>
              <div>
                  <img src="/assets/brick-offer/2.jpg" alt="Крупный план кирпичной кладки" className="w-full h-96 object-cover rounded-xl" />
              </div>
              <div>
                  <img src="/assets/brick-offer/3.jpg" alt="Угол дома с отделкой из кирпича" className="w-full h-96 object-cover rounded-xl" />
              </div>
              <div>
                  <img src="/assets/brick-offer/4.jpg" alt="Фрагмент фасада дома" className="w-full h-96 object-cover rounded-xl" />
              </div>
              <div>
                  <img src="/assets/brick-offer/5.jpg" alt="Современный дом с фасадом из кирпича" className="w-full h-96 object-cover rounded-xl" />
              </div>
          </Slider>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
            <span className="inline-block bg-yellow-100 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm mb-4">
                ⭐ Наш выбор для вашего фасада
            </span>
            <h2 className="text-3xl font-bold text-[#17253c] mb-4">
                Премиум-фасад из клинкерного кирпича по разумной цене
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
                Мы считаем, что фасад дома должен быть не только надежным, но и стильным. Поэтому мы предлагаем отделку премиальным клинкерным кирпичом "Графит" — это лучший способ придать дому дорогой и современный вид, который сохранится на десятилетия.
            </p>
            <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1"/>
                    <span><strong>Эстетика на годы.</strong> Глубокий цвет не выгорает на солнце и всегда выглядит актуально.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1"/>
                    <span><strong>Нулевое обслуживание.</strong> Такой фасад не нужно красить или ремонтировать. Он просто служит.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1"/>
                    <span><strong>Максимальная защита.</strong> Клинкер — это броня для ваших стен, которая не боится ни влаги, ни морозов.</span>
                </li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default PremiumFacadeSection;