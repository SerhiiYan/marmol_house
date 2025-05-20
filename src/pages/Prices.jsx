import { motion } from "framer-motion";
import { useState } from "react";
import Faq from "../components/Faq";

export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      title: "Фундамент",
      items: [
        "Свайно-ростверковый: сваи Ø300 мм, ростверк 250×400 мм, арматура Ø10 мм.",
        "Свайно-ростверковый усиленный: ростверк 300 мм, до 700 мм, арматура Ø12 мм.",
        "Монолитный ленточный, арматура Ø12 мм.",
      ],
    },
    {
      title: "Стены",
      items: [
        "Каркас 50×150 мм, утепление 150 мм, обшивка имитацией бруса.",
        "Каркас 50×150 мм + утепление 50 мм, ветрозащита, обшивка брус/штукатурка.",
        "<strong>Газосиликат 400 мм</strong> + утепление 50 мм, дерево/штукатурка.",
      ],
    },
    {
      title: "Перегородки",
      items: [
        "Брус 50×150 мм, звукоизоляция 100 мм.",
        "Брус 50×150 мм, звукоизоляция 150 мм.",
        "Газоблоки 100/200 мм, кирпич в санузлах.",
      ],
    },
    {
      title: "Потолок",
      items: [
        "Высота 2.6 м, утепление 150 мм, гипсокартон.",
        "Высота 2.7 м, утепление 150 мм, гипсокартон 2 слоя.",
        "Высота 2.7 м, утепление 150 мм, гипсокартон 2 слоя.",
      ],
    },
    {
      title: "Пол",
      items: [
        "Стяжка по песчаной подушке, бетон М250.",
        "Утепление пенополистирол 50 мм + стяжка М250.",
        "Утепление экструдированный пенополистирол + стяжка.",
      ],
    },
    {
      title: "Окна",
      items: [
        "Однокамерные стеклопакеты, трехкамерный профиль.",
        "Двухкамерные стеклопакеты, пятикамерный профиль.",
        "Двухкамерные стеклопакеты, пятикамерный профиль.",
      ],
    },
    {
      title: "Кровля",
      items: [
        'Металлочерепица "Монтеррей Norman".',
        "Металлочерепица + водосточная система.",
        "Металлочерепица + водосточная система.",
      ],
    },
    {
      title: "Инженерия",
      items: [
        "Без электрики и сантехники.",
        "Электрика, сантехника, вентиляция.",
        "Полный комплект: электрика, сантехника, вентиляция.",
      ],
    },
  ];

  const types = ["Эконом", "Премиум", "Премиум+ (газосиликат)"];

  return (
    <section className="pt-36 md:pt-24 py-16 px-4 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        >
          Комплектации проектов Marmol House
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          
        </motion.p>

        {/* Таблица для десктопа */}
        
        <div className="hidden md:block border rounded-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-[#17253c]/100 text-white border-b">
                <th className="p-4 font-semibold text-left border-r sticky left-0 bg-[#17253c]/100 w-1/4">
                  Категория
                </th>
                {types.map((type, index) => (
                  <th
                    key={index}
                    className="p-4 font-semibold text-left border-r last:border-r-0 w-1/4"
                  >
                    {type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-b"
                >
                  <td className="p-4 font-medium border-r sticky left-0 bg-white w-1/4">
                    {cat.title}
                  </td>
                  {cat.items.map((item, i) => (
                    <td
                      key={i}
                      className="p-4 text-gray-600 border-r last:border-r-0 align-top w-1/4 whitespace-normal"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Карточки для мобильных */}
        <div className="md:hidden space-y-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-lg shadow-md"
            >
              <button
                className="w-full p-4 flex items-center justify-between text-left font-medium text-gray-800"
                onClick={() => setActiveCategory(activeCategory === idx ? null : idx)}
              >
                <span>{cat.title}</span>
                <span>{activeCategory === idx ? "−" : "+"}</span>
              </button>
              {activeCategory === idx && (
                <div className="p-4 space-y-4">
                  {cat.items.map((item, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-gray-800">{types[i]}</h4>
                      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
        </motion.div>
          <Faq />
      </div>
    </section>
  );
}