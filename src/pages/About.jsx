// src/pages/About.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandshake, FaTools, FaHome, FaUsers, FaCheckCircle, FaAward, FaBuilding } from "react-icons/fa";
import teamImage from "../assets/logo-bg.png";

import AnimatedNumber from "../components/AnimatedNumber"; 


const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" },
    { "@type": "ListItem", "position": 2, "name": "О нас", "item": "https://marmolhouse.by/about" }
  ]
});


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};


const ourPhilosophy = [
  { icon: <FaHandshake />, title: "Честность и прозрачность", description: "Мы строим доверительные отношения. Все цены и этапы работ фиксируются в договоре и остаются неизменными." },
  { icon: <FaTools />, title: "Качество без компромиссов", description: "Используем только проверенные материалы и современные технологии, чтобы ваш дом служил десятилетиями." },
  { icon: <FaHome />, title: "Индивидуальный подход", description: "Ваш дом – это отражение вашей личности. Мы внимательно слушаем ваши пожелания и реализуем их в проекте." }
];
const companyStats = [
  { value: 10, label: "Лет на рынке", suffix: "+" },
  { value: 100, label: "Сданных объектов", suffix: "+" },
  { value: 100, label: "Довольных клиентов", suffix: "%" },
  { value: 5, label: "Гарантия на работы", suffix: " лет" }
];



function About() {
  return (
    <>
  
      <title>О компании Marmol House | Строительство домов в Гродно</title>
      <meta name="description" content="Узнайте о компании Marmol House: наша философия, гарантии и более чем 10-летний опыт в строительстве каркасных домов в Гродно и по всей Беларуси." />
      <meta property="og:title" content="О компании Marmol House | Строим дома мечты" />
      <meta property="og:description" content="Marmol House — ваш надежный партнер в строительстве. Узнайте о наших ценностях и подходе к работе." />
      <meta property="og:url" content="https://marmolhouse.by/about" />
      <meta property="og:image" content={"https://marmolhouse.by" + teamImage} />
      <link rel="canonical" href="https://marmolhouse.by/about" />
      <script type="application/ld+json">{breadcrumbSchema}</script>

      <div className="bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-32 text-gray-800">


          <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#17253c]">
              Мы строим не просто дома — <br />мы создаём ваше будущее
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Marmol House — это семейная компания, основанная на принципах качества, честности и долгосрочных отношений с каждым клиентом.
            </p>
          </motion.div>


          <motion.div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="w-full lg:w-1/3">
              <img src={teamImage} alt="Команда Marmol House обсуждает проект дома" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
            </motion.div>
            <motion.div variants={fadeInUp} className="w-full lg:w-1/2 space-y-4 text-lg text-gray-700">
              <h2 className="text-3xl font-bold text-[#17253c]">Наша история и миссия</h2>
              <p>
                Более 10 лет назад мы начали свой путь с простой идеи: строительство качественных и доступных домов не должно быть сложным и стрессовым процессом для заказчика. Сегодня <span className="font-semibold text-[#17253c]">Marmol House</span> — это команда опытных архитекторов, инженеров и строителей, объединенных общей целью.
              </p>
              <p>
                Наша миссия — воплощать ваши мечты о собственном доме в реальность, предлагая лучшие решения в сфере каркасного и газосиликатного домостроения в Гродно и по всей Беларуси. Мы особенно гордимся тем, что помогаем <span className="font-semibold">многодетным семьям</span> строить жилье по <span className="font-semibold">240 указу</span> и <span className="font-semibold">95 указу</span>.
              </p>
            </motion.div>
          </motion.div>
          
  
          <motion.div className="mt-20 text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-[#17253c] mb-12">Наша философия в работе</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ourPhilosophy.map((item) => (
                <motion.div key={item.title} variants={fadeInUp} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex justify-center items-center h-14 w-14 rounded-full bg-yellow-400 text-[#17253c] mx-auto mb-5 text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#17253c] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mt-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
             <h2 className="text-3xl font-bold text-center text-[#17253c] mb-12">Marmol House в цифрах</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyStats.map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    variants={fadeInUp}
                    className="relative group bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 overflow-hidden"
                  >
                    <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                  transition-all duration-700 ease-in-out group-hover:left-full" 
                         aria-hidden="true" />

                    <p className="text-5xl font-extrabold text-[#17253c] transition-colors duration-300 group-hover:text-yellow-500">
                      <AnimatedNumber value={stat.value} />
                      {stat.suffix}
                    </p>
                    <p className="text-gray-500 mt-2 text-lg">{stat.label}</p>
                  </motion.div>
                ))}
             </div>
          </motion.div>

          <motion.div 
            className="mt-20 text-center bg-gray-900 text-white p-10 rounded-2xl" 
            initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Готовы начать проект вашей мечты?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Давайте обсудим ваши идеи. Свяжитесь с нами для бесплатной консультации и расчета стоимости вашего будущего дома.
            </p>
            <Link to="/contact" className="inline-block bg-[#f9c615] text-[#17253c] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#e5b512] transition-colors transform hover:scale-105">
              Связаться с нами
            </Link>
          </motion.div>

        </section>
      </div>
    </>
  );
}

export default About;