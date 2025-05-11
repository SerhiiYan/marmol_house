import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Надёжное строительство",
    description:
      "Строим тёплые и комфортные дома по всей Беларуси — каркасные, газосиликатные, с мансардой или без. Всё под ключ.",
    icon: "/safety.png",
  },
  {
    title: "Фиксированная цена",
    description:
      "Цена фиксируется в договоре и остаётся неизменной. Изменения возможны только по желанию заказчика.",
    icon: "/price.png",
  },
  {
    title: "10 лет опыта",
    description:
      "У нас слаженная команда профессионалов. Каждый специалист имеет опыт, квалификацию и разряд.",
    icon: "exp.png",
  },
  {
    title: "Гарантия 5 лет",
    description:
      "Даём 5 лет гарантии на все работы. Объект обслуживается в течение этого срока бесплатно по гарантии.",
    icon: "/garantie.png",
  },
];

const WhyChooseUsTimeline = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Почему выбирают нас?
        </h2>
        <div className="relative">
          {/* Central timeline line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>

          <div className="flex flex-col gap-8">
            {features.map((feature, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`relative md:w-1/2 px-4 py-2 ${
                    isLeft ? "md:self-start" : "md:self-end"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Dot with icon */}
                  <div className="hidden md:flex absolute top-3 -left-8 md:-left-10 w-12 h-12 border-gray-300 items-center justify-center z-10">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-15 h-15 rounded-full bg-yellow-300 shadow-md p-2"
                    />
                  </div>

                  {/* Block */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsTimeline;
