// src/pages/BusinessPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaMoneyBillWave, FaCameraRetro, FaChevronLeft, FaChevronRight, FaComments, FaFileSignature, FaHammer, FaKey  } from 'react-icons/fa';

// 1. ИМПОРТИРУЕМ SLIDER
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const workSteps = [
    {
        icon: FaComments,
        title: "Консультация и бизнес-план",
        description: "Анализируем ваш участок, подбираем проект и готовим предварительный расчет доходности, чтобы вы видели все цифры."
    },
    {
        icon: FaFileSignature,
        title: "Проект и договор",
        description: "Разрабатываем полный комплект чертежей и заключаем договор с фиксированной стоимостью и сроками."
    },
    {
        icon: FaHammer,
        title: "Производство и монтаж",
        description: "Изготавливаем домокомплект в цеху, пока готовится фундамент. Это сокращает монтаж на объекте до 10-14 дней."
    },
    {
        icon: FaKey,
        title: "Сдача готового бизнеса",
        description: "Передаем вам ключи от полностью готового для заселения модуля. Вам остается только принимать гостей!"
    }
];

const investmentProducts = [
    {
        name: 'A-Frame "Scandi"',
        images: [
            '/assets/business/aframe/frame.webp',
            '/assets/business/aframe/frame1.webp',
            '/assets/business/aframe/frame3.webp',
        ],
        description: 'Идеальный формат для романтического отдыха пар. Уютная антресоль, панорамное окно и максимальное единение с природой.',
        price: 'от 90 000 BYN',
    },
    {
        name: 'Барнхаус "Loft"',
        images: [
            '/assets/business/barnhouse/barn.webp',
            '/assets/business/barnhouse/barn1.webp',
            '/assets/business/barnhouse/barn2.webp',
            '/assets/business/barnhouse/barn3.webp',
        ], 
        description: 'Универсальное решение для семьи или компании. Просторная терраса, открытая планировка и стильный минималистичный дизайн.',
        price: 'от 105 000 BYN',
    },
    {
        name: 'Проекты "Geo"',
        images: [
            '/assets/business/geo/geo.webp',
            '/assets/business/geo/geo1.webp',
            '/assets/business/geo/geo2.webp',
            '/assets/business/geo/geo3.webp',
        ], 
        description: 'Эксклюзивные архитектурные решения для тех, кто ищет нечто большее. Футуристичные формы, купола и уникальные планировки.',
        price: 'от 110 000 BYN',
    }
];
// SEO-схема для новой страницы (базовая, потом дополним)
const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Строительство домов для арендного бизнеса под ключ",
    "serviceType": "Строительство модульных домов для глэмпинга",
    "provider": { "@type": "LocalBusiness", "name": "Marmol House" },
    "areaServed": { "@type": "Country", "name": "Беларусь" },
    "description": "Строим готовые A-frame и барнхаус-модули для запуска арендного бизнеса в сфере глэмпинга и загородного отдыха.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Модели домов для арендного бизнеса",
        "itemListElement": investmentProducts.map(p => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Product",
                "name": p.name,
                "description": p.description
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "BYN",
                "price": p.price.replace(/[^0-9.]/g, '')
            }
        }))
    }
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Как запустить арендный бизнес с Marmol House",
    "totalTime": "P90D", 
    "step": workSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.title,
        "text": step.description
    }))
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://marmolhouse.by/" },
        { "@type": "ListItem", "position": 2, "name": "Для инвесторов" }
    ]
};

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
    <FaChevronLeft className="w-4 h-4" />
  </button>
);
const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
    <FaChevronRight className="w-4 h-4" />
  </button>
);

const BusinessPage = () => {
    const sectionAnimation = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.8, ease: 'easeOut' }
    };
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: dots => (
            <div style={{ position: 'absolute', bottom: '15px' }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-2.5 h-2.5 bg-white/50 rounded-full transition-colors"></div>
        )
    };

    return (
        <>
            <title>Дома для арендного бизнеса под ключ за 60 дней | Marmol House</title>
            <meta name="description" content="Инвестируйте в глэмпинг! Строим стильные A-frame и барнхаус-модули для сдачи в аренду с высокой доходностью. Готовый бизнес за 2-3 месяца." />
            <link rel="canonical" href="https://marmolhouse.by/business" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />


           <section className="min-h-screen relative flex flex-col justify-center items-center text-center text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <img 
                    src="/assets/service/business.webp" 
                    alt="Современные дома A-frame и барнхаус для арендного бизнеса" 
                    className="w-full h-full object-cover" 
                />
            </div>
    <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20 px-4">
                    <motion.h1 
                        className="text-4xl md:text-7xl font-extrabold leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Ваш арендный бизнес
                        <br/>
                        <span className="text-[#f9c615]">За 60 дней</span>
                    </motion.h1>

                    <motion.p 
                        className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        Строим готовые A-frame и барнхаус-модули для глэмпинга.
                    </motion.p>
                </div>

                <motion.div
                    className="absolute bottom-10 z-20"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    transition={{
                        delay: 1.5,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                    }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>
             <motion.section 
                className="py-20 md:py-32 bg-white text-gray-800"
                {...sectionAnimation}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#17253c]">
                            Выберите формат вашего бизнеса
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Мы предлагаем проверенные и самые востребованные форматы, которые гарантированно привлекут гостей.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {investmentProducts.map(product => (
                            <div key={product.name} className={`flex flex-col rounded-2xl shadow-2xl overflow-hidden`}>
                                <div className="relative group slick-container-business">
                                    <Slider {...sliderSettings}>
                                        {product.images.map((img, index) => (
                                            <div key={index}>
                                                <img src={img} alt={`${product.name} - фото ${index + 1}`} className="w-full h-96 object-cover"/>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                
                                <div className="flex-grow flex flex-col p-6 bg-gray-50">
                                    <h3 className="text-3xl font-bold text-[#17253c]">{product.name}</h3>
                                    <p className="text-gray-600 flex-grow mb-1 mt-3">{product.description}</p>
                                    <p className="text-3xl font-bold text-[#17253c] mt-2 mb-4">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
            <motion.section 
                className="py-20 md:py-32 bg-gray-100 text-gray-800"
                {...sectionAnimation}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#17253c]">
                            Почему это выгодная инвестиция в 2025 году
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Рынок загородного отдыха меняется. Успейте занять нишу, которая будет приносить прибыль долгие годы.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl text-yellow-600 mb-4">
                                <FaChartLine />
                            </div>
                            <h3 className="text-2xl font-bold text-[#17253c]">Растущий рынок</h3>
                            <p className="mt-2 text-gray-600">
                                Внутренний туризм в Беларуси показывает стабильный рост. По <a 
                                    href="https://president.gov.by/ru/belarus/economics/osnovnye-otrasli/sfera-uslug/otdyh-i-turizm" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-yellow-600 hover:underline font-semibold"
                                >официальным данным</a>, популярность глэмпингов и уединенных домиков для отдыха увеличивается, а предложение все еще не покрывает спрос.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl text-yellow-600 mb-4">
                                <FaMoneyBillWave />
                            </div>
                            <h3 className="text-2xl font-bold text-[#17253c]">Высокий средний чек</h3>
                            <p className="mt-2 text-gray-600">
                                Средняя стоимость аренды уникального домика — <strong>250–450 BYN за ночь</strong>, также вы можете предлагать и другие услуги за отдельную плату. Вы инвестируете в премиум-сегмент с высокой маржинальностью.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl text-yellow-600 mb-4">
                                <FaCameraRetro />
                            </div>
                            <h3 className="text-2xl font-bold text-[#17253c]">Магнит для гостей</h3>
                            <p className="mt-2 text-gray-600">
                                Уникальный дизайн, панорамные окна и "инстаграмные" виды превращают ваш объект в достопримечательность. Гости сами будут его рекламировать, создавая вам бесплатный поток бронирований.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>
            <motion.section 
                className="py-20 md:py-32 bg-gray-100 text-gray-800"
                {...sectionAnimation}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#17253c]">
                            От идеи до первых гостей — 4 простых шага
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Мы сделали процесс запуска арендного бизнеса максимально прозрачным и предсказуемым.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {workSteps.map((step, index) => (
                            <div key={step.title} className="flex gap-6">
                                <div className="flex-shrink-0 text-5xl text-yellow-500">
                                    <step.icon />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#17253c]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default BusinessPage;