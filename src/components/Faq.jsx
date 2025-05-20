import { useState } from "react";
import { motion } from "framer-motion";

const faq = [
  {
    question: "Чем отличается комплектация 'Эконом' от 'Премиум'?",
    answer: "В 'Премиум' используется улучшенная теплоизоляция, качественные окна и включены инженерные системы.",

  },
  {
    question: "Можно ли изменить комплектацию под свои нужды?",
    answer: "Да, вы можете адаптировать комплектацию под себя — свяжитесь с нами, и мы обсудим все детали.",

  },
  {
    question: "Что такое газосиликат и в чём его преимущества?",
    answer: "Газосиликат обладает отличной тепло- и звукоизоляцией, устойчив к огню и подходит для круглогодичного проживания.",

  },
  {
    question: "Фундамент уже включён в стоимость?",
    answer: "Да, базовая стоимость дома уже включает свайно-ростверковый фундамент.",

  },
  {
    question: "Можно ли заказать дом под ключ?",
    answer: "Да, мы предлагаем дома под ключ: с отделкой, инженерией и полной сдачей объекта.",

  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="pt-6 px-4 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        >
          Часто задаваемые вопросы по комплектациям
        </motion.h3>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border rounded-lg shadow-md"
            >
              <button
                className="w-full p-4 flex justify-between items-center text-left font-medium text-gray-800"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span>{item.question}</span>
                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
