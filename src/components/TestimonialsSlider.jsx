import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TestimonialsSlider() {
  return (
    <section className="py-12 bg-white px-4 md:px-12 bg-gray-100">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        Отзывы наших клиентов
      </motion.h2>

      <Slider {...sliderSettings}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="px-2 py-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-sm font-medium text-gray-800">{t.name}</div>
              </div>
              <p className="text-gray-700 text-sm flex-grow">"{t.text}"</p>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
}
