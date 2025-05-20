import React from "react";
import { motion } from "framer-motion";
import teamImage from "../assets/people.png";

// Анимации
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

function About() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 pt-20 md:pt-24 text-gray-800">
     
      <div className="w-16 h-1 mx-auto mb-12" aria-hidden="true" />

      {/* Контейнер с картинкой и текстом */}
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        {/* Картинка */}
        <motion.div variants={fadeInUp} className="w-full lg:w-1/2">
          <img
            src={teamImage}
            alt="Человек в строительной каске"
            loading="lazy"
            className="w-full h-[450px] object-cover rounded-2xl shadow-xs"
          />
        </motion.div>

        {/* Текст */}
        <motion.div
          variants={fadeInUp}
          className="w-full lg:w-1/2 space-y-6 text-base lg:text-lg leading-relaxed text-gray-600"
        >
          <p>
            Компания <span className="font-semibold text-[#17253c]">Marmol House</span> более 10 лет строит дома, дачи, бани и гаражи. Мы создаём не просто здания, а комфортное пространство для жизни и отдыха.
          </p>
          <p>
            Наша миссия — предложить каждому клиенту современное, надёжное и индивидуальное решение. Богатый опыт, качественные материалы и внимательное отношение гарантируют высокий уровень каждого проекта.
          </p>
          <p>
            В Беларуси строительство традиционно дорогое, что ограничивает многих. В <span className="font-semibold text-[#17253c]">Marmol House</span> мы оптимизируем процессы и планирование, чтобы снизить стоимость без потери качества.
          </p>
          <p>
            Прозрачность и честность — наши приоритеты. Никаких скрытых платежей, каждый этап согласуется с вами. Это позволяет нам достигать отличных результатов по справедливой цене.
          </p>
        </motion.div>
      </motion.div>

      {/* Статистика і переваги */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        {[
          { text: "Более 10 лет опыта", bg: "bg-[#f9c615]", textColor: "text-[#17253c]" },
          { text: "100+ завершённых объектов", bg: "bg-[#17253c]", textColor: "text-white" },
          { text: "Индивидуальный подход", bg: "bg-[#f9c615]", textColor: "text-[#17253c]" },
          { text: "Гарантия качества", bg: "bg-[#17253c]", textColor: "text-white" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`${stat.bg} ${stat.textColor} p-6 rounded-xl shadow-lg text-center font-semibold text-lg hover:scale-105 hover:shadow-xl transition-transform duration-300`}
          >
            {stat.text}
          </motion.div>
        ))}
      </motion.div>

      {/* Заключительный слоган и CTA */}
      <motion.div
        className="mt-16 text-center space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <p className="text-2xl sm:text-3xl font-semibold text-[#17253c]">
          Дом вашей мечты без переплат и разочарований
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#f9c615] text-[#17253c] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#e5b512] transition-colors"
        >
          Связаться с нами
        </a>
      </motion.div>
    </section>
  );
}

export default About;
