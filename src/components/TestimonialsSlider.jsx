import React from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from "react-helmet";

const testimonials = [
  {
    name: 'Александр К.',
    text: 'Очень доволен строительством! Дом из газобетона получился теплый и аккуратный. Команда Marmol House работала быстро и профессионально.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ирина М.',
    text: 'Заказывали баню — всё сделали в срок и даже раньше. Качество материалов отличное, всё аккуратно. Спасибо!',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Дмитрий С.',
    text: 'Строили барнхаус под ключ. Остались только приятные впечатления. Честная смета, никаких сюрпризов, всё прозрачно.',
    img: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    name: 'Светлана Н.',
    text: 'Обратились по рекомендации. Всё прошло отлично: хорошие сроки, коммуникация и результат. Будем рекомендовать!',
    img: 'https://randomuser.me/api/portraits/women/66.jpg',
  },
];


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  centerMode: true,
  centerPadding: '0',
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, centerPadding: '0' },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1, centerPadding: '0' },
    },
  ],
};


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',

  name: 'Marmol House',
  image: 'https://marmolhouse.by/assets/logo.png',
  telephone: '+375291845481',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Гродно',
    addressCountry: 'BY',
  },

  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0', 
    reviewCount: testimonials.length, 
  },

  review: testimonials.map(t => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: '5',
    },
    reviewBody: t.text,
  })),
};


function Testimonials() {
  return (
    <section
      className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100"
      aria-labelledby="testimonials-heading"
      role="region"
    >
       <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-bold text-[#17253c] text-center mb-6 sm:mb-8"
          style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          Отзывы наших клиентов
        </motion.h2>

        <Slider {...sliderSettings} className="testimonials-slider">
          {testimonials.map((t, i) => (

            <motion.article key={i} className="px-2 py-4 h-full" variants={fadeIn} /* ... */>
              <div className={`bg-white p-3 sm:p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 hover:rotate-0 transition-all duration-300 bg-gradient-to-br from-white to-yellow-50/20 h-full flex flex-col ${i % 2 === 0 ? 'sm:rotate-2' : 'sm:-rotate-2'}`}>
                <header className="flex items-center mb-3">
                  <img src={t.img} loading="lazy" alt={`Фото клиента ${t.name}`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 ring-2 ring-gradient-to-r from-yellow-500 to-[#17253c]"/>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#17253c]">{t.name}</h3>
                    <div className="flex" title={`Рейтинг: ${t.rating} из 5`}>
                      {[...Array(5)].map((_, star) => (
                        <svg key={star} className={`w-4 h-4 ${star < t.rating ? 'text-yellow-500' : 'text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </header>
                <blockquote className="text-sm sm:text-base text-gray-600 flex-grow">
                    <p>"{t.text}"</p>
                </blockquote>
              </div>
            </motion.article>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default React.memo(Testimonials);