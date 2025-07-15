// src/pages/Home.jsx

import { FaInfoCircle } from 'react-icons/fa';

import herovideo from '../assets/herovideo.webm';
import HowWeWork from '../components/HowWeWork';
import HousePackages from '../components/HousePackages';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSlider from '../components/TestimonialsSlider'; 


const testimonials = [
  {
    name: 'Александр К.',
    text: 'Очень доволен строительством! Дом из газобетона получился теплый и аккуратный. Команда Marmol House работала быстро и профессионально.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    name: 'Ирина М.',
    text: 'Заказывали баню — всё сделали в срок и даже раньше. Качество материалов отличное, всё аккуратно. Спасибо!',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    name: 'Дмитрий С.',
    text: 'Строили барнхаус под ключ. Остались только приятные впечатления. Честная смета, никаких сюрпризов, всё прозрачно.',
    img: 'https://randomuser.me/api/portraits/men/10.jpg',
    rating: 5,
  },
  {
    name: 'Светлана Н.',
    text: 'Обратились по рекомендации. Всё прошло отлично: хорошие сроки, коммуникация и результат. Будем рекомендовать!',
    img: 'https://randomuser.me/api/portraits/women/66.jpg',
    rating: 5,
  },
];

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Marmol House',
    'description': 'Строительство каркасных домов под ключ в Гродно и по всей Беларуси. Работаем по 240 указу для многодетных семей.',
    'url': 'https://marmolhouse.by',
    'logo': 'https://marmolhouse.by/assets/logo.png',
    'telephone': '+375291845481',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'г. Гродно, ул. Лелевеля, 12A, к 6',
      'addressLocality': 'Гродно',
      'addressCountry': 'BY',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 53.6784,
      'longitude': 23.8295,
    },
    'openingHoursSpecification': [{
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
    }],
    'sameAs': ['https://www.instagram.com/marmol_house/'],
    'image': 'https://marmolhouse.by/og-image.png',

    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0', 
      'reviewCount': testimonials.length.toString(), 
    },

    'review': testimonials.map(t => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': t.name,
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': t.rating.toString(), 
        'bestRating': '5',
      },
      'reviewBody': t.text,
    })),
};

const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': 'Строительство каркасных домов — Marmol House',
    'description': 'Видео-презентация о строительстве современных каркасных домов в Гродно и по всей Беларуси.',
    'thumbnailUrl': 'https://marmolhouse.by/og-image.png',
    'uploadDate': '2024-05-10',
    'contentUrl': 'https://marmolhouse.by' + herovideo,
    'embedUrl': 'https://marmolhouse.by' + herovideo,
};

const homeBenefits = [
  {
    title: 'Работаем по 240 указу',
    description: 'Многодетные семьи получают участок бесплатно и частичную оплату строительства за счёт бюджета.',
  },
  {
    title: 'Проект в подарок',
    description: 'Бесплатный проект дома с учётом ваших пожеланий и особенностей участка при заказе строительства.',
  },
  {
    title: 'Фиксированная цена',
    description: 'Цена прописывается в договоре и остаётся неизменной на всех этапах строительства.',
  },
];


function Home({ onOrderClick }) {
    const handlePackageOrderClick = (packageName) => {
        const message = `Здравствуйте, хочу консультацию по комплектации "${packageName}".`;
        onOrderClick(message);
    };

  return (
    <>
     <title>Каркасные и блочные дома под ключ в Беларуси и Гродно — Marmol House</title>
     <meta name="description" content="Строительство каркасных домов под ключ в Беларуси и Гродно. Проект в подарок, работа по 240 указу для многодетных семей, фиксированная цена. Marmol House." />
     <meta name="author" content="Marmol House" />
     <meta property="og:title" content="Каркасные дома под ключ в Беларуси — Marmol House" />
     <meta property="og:description" content="Строительство каркасных домов в Гродно и Беларуси по 240 указу. Проект в подарок!" />
     <meta property="og:type" content="website" />
     <meta property="og:url" content="https://marmolhouse.by" />
     <meta property="og:image" content="https://marmolhouse.by/og-image.png" />
     <meta property="og:locale" content="ru_RU" />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content="Каркасные дома под ключ | Marmol House" />
     <meta name="twitter:description" content="Строительство каркасных домов в Гродно и Беларуси по 240 указу." />
     <link rel="canonical" href="https://marmolhouse.by/" />

     <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
     <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />


      <main className="w-full overflow-x-hidden">
        <section className="relative w-full min-h-screen" aria-labelledby="hero-heading">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay loop muted playsInline aria-hidden="true"
          >
            <source src={herovideo} type="video/webm" />
            Видео недоступно.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/60" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 pt-36 sm:pt-60">
            <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Строительство<br /> каркасных и блочных домов под ключ<br />
              <span className="text-[#f9c615] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">в Гродно и Беларуси</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-6">
              Работаем по 240 указу для многодетных семей
            </p>
            <button
              onClick={() => onOrderClick()}
              className="bg-[#f9c615] text-[#17253c] font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition-all duration-300 ease-in-out hover:bg-[#e5b512] hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Заказать консультацию
            </button>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-xs sm:max-w-2xl lg:max-w-5xl text-white mt-10 sm:mt-16"
              aria-labelledby="benefits-heading"
            >
              <h2 id="benefits-heading" className="sr-only">Преимущества строительства с Marmol House</h2>
              {homeBenefits.map((item) => (
                <article key={item.title} className="flex flex-col">
                  <h3 className="flex items-center justify-center font-bold text-[#f9c615] uppercase mb-3 sm:mb-4">
                    <FaInfoCircle className="mr-2" aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-justify">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <HousePackages onOrderClick={handlePackageOrderClick} />
        <HowWeWork />
        <TestimonialsSlider testimonials={testimonials} />
        <Footer />
      </main>
    </>
  );
}

export default Home;