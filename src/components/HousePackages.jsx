import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Массив с данными остается без изменений
const packages = [
  {
    title: 'Эконом',
    description: 'Идеально для дачи выходного дня или небольшого загородного дома.',
    highlights: [ 'Свайно-ростверковый фундамент', 'Каркас из бруса 50×150 мм, утепление 150 мм', 'Имитация бруса снаружи', 'Потолок 2.6 м, утепление 150 мм', 'Однокамерные стеклопакеты', 'Без электрики и сантехники', ],
    image: '/assets/service/package-econom.webp',
    price: 'от 1 200',
    priceValue: 1200,
    priceCurrency: 'BYN',
    priceValidUntil: '2025-12-31',
    sku: 'MH-ECONOM',
  },
  {
    title: 'Премиум',
    description: 'Для тех, кто ценит комфорт и долговечность.',
    highlights: [ 'Усиленный свайно-ростверковый фундамент', 'Дополнительное утепление + ветрозащита', 'Потолок 2.7 м, гипсокартон в 2 слоя', 'Двухкамерные стеклопакеты', 'Металлочерепица + водосточка', 'Инженерия включена', ],
    image: '/assets/service/package-premium.webp',
    price: 'от 1 500',
    priceValue: 1500,
    priceCurrency: 'BYN',
    priceValidUntil: '2025-12-31',
    sku: 'MH-PREMIUM',
  },
  {
    title: 'Премиум+',
    description: 'Для максимального комфорта и надежности на долгие годы.',
    highlights: [ 'Монолитный ленточный фундамент', 'Газосиликатные блоки + утепление', 'Перегородки из газоблоков и кирпича', 'Потолок 2.7 м, утепление 150 мм', 'Пятикамерные окна', 'Полная инженерия', ],
    image: '/assets/service/package-premium-plus.webp',
    price: 'от 1 700',
    priceValue: 1700,
    priceCurrency: 'BYN',
    priceValidUntil: '2025-12-31',
    sku: 'MH-PREMIUM-PLUS',
  },
];


// Добавляем `prop` onOrderClick для связи с родительским компонентом
function HousePackages({ onOrderClick }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#17253c] mb-4">Выберите свою комплектацию дома</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Подбираем комплектацию под ваши задачи — от дачи выходного дня до дома для круглогодичного проживания.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pack, idx) => {
          // Схема для Google, все без изменений
          const productSchema = { /*...*/ };

          return (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Helmet><script type="application/ld+json">{JSON.stringify(productSchema)}</script></Helmet>
              
              <div className="relative h-48">
                {/* Фон (картинка + градиент), который анимируется */}
                <div 
                  style={{ backgroundImage: `linear-gradient(to top, rgba(10, 10, 10, 0.85), transparent 50%), url(${pack.image})` }}
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                />

                {/* Элементы поверх фона */}
                <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
                  {/* Цена */}
                  <div className="flex justify-end">
                    <div className="bg-[#f9c615] text-[#17253c] font-bold py-2 px-4 rounded-lg shadow-md">
                      {pack.price} {pack.priceCurrency} / м²
                    </div>
                  </div>
                  
                  {/* ИСПРАВЛЕННЫЙ ЗАГОЛОВОК - только название комплектации */}
                  <h3 className="text-3xl font-bold text-[#f9c615] tracking-tight">
                    {pack.title}
                  </h3>
                </div>
              </div>
              
              <div className="flex-grow p-6 flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow">{pack.description}</p>
                <ul className="space-y-3 mb-8">
                  {pack.highlights.map((item, i) => (
                    <li key={i} className="flex items-start" data-aos="fade-right" data-aos-delay={100 + i * 50} data-aos-anchor={`[data-aos-delay='${idx*100}']`}>
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-px flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* КНОПКА, ПОДКЛЮЧЕННАЯ К ФУНКЦИИ ИЗ PROPS */}
                <button 
                  onClick={() => onOrderClick(pack.title)}
                  className="mt-auto w-full bg-[#17253c] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#253955] transition-colors duration-300 transform hover:scale-105"
                >
                  Заказать расчет
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(HousePackages);