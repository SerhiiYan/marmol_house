import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const packages = [
  {
    title: 'Эконом',
    highlights: [
      'Свайно-ростверковый фундамент',
      'Каркас из бруса 50×150 мм, утепление 150 мм',
      'Имитация бруса снаружи',
      'Потолок 2.6 м, утепление 150 мм',
      'Однокамерные стеклопакеты',
      'Без электрики и сантехники',
    ],
    bg: 'bg-white',
  },
  {
    title: 'Премиум',
    highlights: [
      'Усиленный свайно-ростверковый фундамент',
      'Дополнительное утепление + ветрозащита',
      'Потолок 2.7 м, гипсокартон в 2 слоя',
      'Двухкамерные стеклопакеты',
      'Металлочерепица + водосточка',
      'Инженерия включена',
    ],
    bg: 'bg-white',
  },
  {
    title: 'Премиум+',
    highlights: [
      'Монолитный ленточный фундамент',
      'Газосиликатные блоки + утепление',
      'Перегородки из газоблоков и кирпича',
      'Потолок 2.7 м, утепление 150 мм',
      'Пятикамерные окна',
      'Полная инженерия',
    ],
    bg: 'bg-white',
  },
];

export default function HousePackages() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Выберите свою комплектацию дома</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Подбираем комплектацию под ваши задачи — от дачи выходного дня до дома для круглогодичного проживания.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {packages.map((pack, idx) => (
          <div
            key={idx}
            className={`${pack.bg} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border`}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{pack.title}</h3>
            <ul className="text-gray-700 text-left space-y-2 mb-6">
              {pack.highlights.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-500 mr-2">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/Equipment" className="inline-block mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-xl transition">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
