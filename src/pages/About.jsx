import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaHardHat, FaBuilding, FaUsers, FaCheckCircle } from "react-icons/fa";
import teamImage from "../assets/people.png";
import { Link } from "react-router-dom";


// Анимации
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};


function About() {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>О нас | Marmol House</title>
        <meta name="description" content="Узнайте больше о Marmol House — строительстве каркасных домов в Гродно и по всей Беларуси." />
        <meta property="og:title" content="О нас | Marmol House" />
        <meta property="og:description" content="Мы строим каркасные дома под ключ по 240 указу." />
        <meta property="og:url" content="https://marmolhouse.vercel.app/about" />
        <meta property="og:image" content="https://marmolhouse.vercel.app/og-image.png" />
      </Helmet>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 text-gray-800">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17253c]">
            О Marmol House
          </h1>
          <div className="w-24 h-1 bg-[#f9c615] mx-auto mt-4 rounded" aria-hidden="true" />
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Ваш надёжный партнёр в создании домов мечты
          </p>
        </motion.div>

        {/* Контейнер с картинкой и текстом */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Картинка */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={teamImage}
              alt="Команда Marmol House на строительной площадке"
              loading="lazy"
              className="w-full h-auto max-h-[400px] sm:max-h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17253c]/30 to-transparent" />
          </motion.div>

          {/* Текст */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-1/2 space-y-5 text-base sm:text-lg leading-relaxed text-gray-600"
          >
            <p>
              <span className="font-semibold text-[#17253c]">Marmol House</span> — это
              более 10 лет опыта в строительстве домов, дач, бань и гаражей. Мы
              создаём пространства, которые вдохновляют и приносят комфорт.
            </p>
            <p>
              Наша миссия — предложить каждому клиенту индивидуальное решение,
              используя современные технологии и качественные материалы.
            </p>
            <p>
              Мы оптимизируем процессы, чтобы строительство было доступным без потери
              качества. Прозрачность и честность — основа нашей работы.
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-[#f9c615] text-[#17253c] px-6 py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-[#e5b512] transition-colors duration-300"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                Связаться с нами
              </motion.a>
            </Link>
          </motion.div>
        </motion.div>

        {/* Статистика и преимущества */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {[
            {
              text: "10+ лет опыта",
              bg: "bg-[#f9c615]",
              textColor: "text-[#17253c]",
              icon: <FaHardHat className="text-xl" />,
            },
            {
              text: "100+ объектов",
              bg: "bg-[#17253c]",
              textColor: "text-white",
              icon: <FaBuilding className="text-xl" />,
            },
            {
              text: "Индивидуальный подход",
              bg: "bg-[#f9c615]",
              textColor: "text-[#17253c]",
              icon: <FaUsers className="text-xl" />,
            },
            {
              text: "Гарантия качества",
              bg: "bg-[#17253c]",
              textColor: "text-white",
              icon: <FaCheckCircle className="text-xl" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`${stat.bg} ${stat.textColor} p-6 rounded-xl shadow-lg text-center font-semibold text-base sm:text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300`}
              whileHover={{ y: -5 }}
            >
              {stat.icon}
              {stat.text}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default About;