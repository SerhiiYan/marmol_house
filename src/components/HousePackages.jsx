import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const packages = [
  {
    title: 'Эконом',
    description: 'Идеально для дачи выходного дня или небольшого загородного дома.',
    highlights: [
      'Свайно-ростверковый фундамент',
      'Каркас из бруса 50×150 мм, утепление 150 мм',
      'Имитация бруса снаружи',
      'Потолок 2.6 м, утепление 150 мм',
      'Однокамерные стеклопакеты',
      'Без электрики и сантехники',
    ],
    bg: 'bg-gray-100',
  },
  {
    title: 'Премиум',
    description: 'Для тех, кто ценит комфорт и долговечность.',
    highlights: [
      'Усиленный свайно-ростверковый фундамент',
      'Дополнительное утепление + ветрозащита',
      'Потолок 2.7 м, гипсокартон в 2 слоя',
      'Двухкамерные стеклопакеты',
      'Металлочерепица + водосточка',
      'Инженерия включена',
    ],
    bg: 'bg-gray-200',
  },
  {
    title: 'Премиум+',
    description: 'Для максимального комфорта и надежности на долгие годы.',
    highlights: [
      'Монолитный ленточный фундамент',
      'Газосиликатные блоки + утепление',
      'Перегородки из газоблоков и кирпича',
      'Потолок 2.7 м, утепление 150 мм',
      'Пятикамерные окна',
      'Полная инженерия',
    ],
    bg: 'bg-gray-300',
  },
];

function HousePackages() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Выберите свою комплектацию дома</h2>
        <p className="text-gray-600 max-w-2xl  mx-auto text-x">
          Подбираем комплектацию под ваши задачи — от дачи выходного дня до дома для круглогодичного проживания.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pack, idx) => (
          <div
            key={idx}
            className={`${pack.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border`}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <h3 className="text-xl font-semibold text-yellow-600 mb-3">{pack.title}</h3>
            <p className="text-x text-gray-600 mb-4">{pack.description}</p>
            <ul className="text-gray-700 text-left space-y-1 mb-4">
              {pack.highlights.map((item, i) => (
                <li key={i} className="flex items-start text-x">
                  <span className="text-yellow-500 mr-2">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(HousePackages);