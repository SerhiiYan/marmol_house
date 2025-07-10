import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

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

const packageGradients = {
  Эконом: 'from-green-400 via-cyan-400 to-blue-500',
  Премиум: 'from-blue-500 via-indigo-500 to-purple-600',
  'Премиум+': 'from-yellow-400 via-orange-500 to-red-600',
};

function HousePackages({ onOrderClick }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50" aria-labelledby="packages-heading">
      <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">

        <h2 id="packages-heading" className="text-3xl font-bold text-[#17253c] mb-4">Выберите свою комплектацию дома</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Подбираем комплектацию под ваши задачи — от дачи выходного дня до дома для круглогодичного проживания.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {packages.map((pack, idx) => {
    
            const productSchema = {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: `Комплектация дома '${pack.title}'`,
              description: pack.description,
              image: `https://marmolhouse.by${pack.image}`, 
              sku: pack.sku,
              brand: {
                '@type': 'Brand',
                name: 'Marmol House', 
              },
              offers: {
                '@type': 'Offer',
                price: pack.priceValue,
                priceCurrency: pack.priceCurrency,
                priceValidUntil: pack.priceValidUntil,
                availability: 'https://schema.org/InStock',
                url: `https://marmolhouse.by/#${pack.sku}`, 
              },
            };

            return (
              <div
                id={pack.sku} 
                key={idx}
                className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 max-w-md mx-auto"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <Helmet><script type="application/ld+json">{JSON.stringify(productSchema)}</script></Helmet>
                <img 
                  src={pack.image} 
                  alt={`Пример дома в комплектации '${pack.title}'`} 
                  className="sr-only"
                />

                <div className="relative h-48">
                  <div className={`absolute inset-0 w-full h-full bg-gradient-to-r ${packageGradients[pack.title]} animate-gradient-xy`} />
                  <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <div className="bg-[#f9c615] text-[#17253c] font-bold py-2 px-4 rounded-lg shadow-md">
                        {pack.price} {pack.priceCurrency} / м²
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight shadow-sm" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>
                      Комплектация '{pack.title}'
                    </h3>
                  </div>
                </div>
                
                <div className="flex-grow p-8 flex flex-col"> 
                  <p className="text-gray-600 mb-6 flex-grow">{pack.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pack.highlights.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-px flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
  
                  <button 
                    aria-label={`Заказать расчет для комплектации '${pack.title}'`}
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
      </div>
    </section>
  );
}

export default React.memo(HousePackages);