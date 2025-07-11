// src/pages/Home.jsx

import { Helmet } from 'react-helmet';
import { FaInfoCircle } from 'react-icons/fa';

import herovideo from '../assets/herovideo.webm';
import HowWeWork from '../components/HowWeWork';
import HousePackages from '../components/HousePackages';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSlider from '../components/TestimonialsSlider';

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Marmol House',
    description: 'Строительство каркасных домов под ключ в Гродно и по всей Беларуси. Работаем по 240 указу для многодетных семей.',
    url: 'https://marmolhouse.by',
    logo: 'https://marmolhouse.by/assets/logo.png',
    telephone: '+375291845481',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'г. Гродно, ул. Лелевеля, 12A, к 6',
      addressLocality: 'Гродно',
      postalCode: '230000',
      addressCountry: 'BY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.6784,
      longitude: 23.8295,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: ['https://facebook.com/marmolhouse', 'https://instagram.com/marmolhouse'],
    image: 'https://marmolhouse.by/assets/logo.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
    },
  };

  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marmol House",
  "url": "https://marmolhouse.by",
  "logo": "https://marmolhouse.by/assets/logo.png",
  "sameAs": [
    "https://facebook.com/marmolhouse",
    "https://instagram.com/marmolhouse"
  ]
};

  const videoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Каркасные дома Marmol House',
    description: 'Видео о строительстве каркасных домов в Гродно и Беларуси.',
    thumbnailUrl: 'https://marmolhouse.by/og-image.png',
    uploadDate: '2025-04-02',
    contentUrl: 'https://marmolhouse.by/assets/herovideo.webm',
    embedUrl: 'https://marmolhouse.by/assets/herovideo.webm',
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
    <main className="w-full overflow-x-hidden">
       <Helmet>
        <html lang="ru" />
        <title>Каркасные дома под ключ в Беларуси — Marmol House</title>
        <meta 
          name="description" 
          content="Строительство каркасных домов под ключ в Беларуси. Проект в подарок, работа по 240 указу для многодетных семей, фиксированная цена, доставка и монтаж." 
        />
        <meta
          name="keywords"
          content="каркасные дома, строительство домов, Гродно, Беларусь, дом под ключ, 240 указ, многодетные семьи, проект дома, Marmol House"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Marmol House" />
        <meta property="og:title" content="Каркасные дома под ключ в Беларуси — Marmol House" />
        <meta
          property="og:description"
          content="Строительство каркасных домов в Гродно и Беларуси по 240 указу. Проект в подарок!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marmolhouse.by" />
        <meta property="og:image" content="https://marmolhouse.by/og-image.png" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Каркасные дома под ключ | Marmol House" />
        <meta
          name="twitter:description"
          content="Строительство каркасных домов в Гродно и Беларуси по 240 указу."
        />
        <link rel="canonical" href="https://marmolhouse.by/" />
        <meta name="twitter:image" content="https://marmolhouse.by/og-image.png" />
        <meta name="twitter:site" content="@MarmolHouse" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(videoStructuredData)}</script>
      </Helmet>

      <section className="relative w-full min-h-screen" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">Строительство каркасных и газосиликатных домов в Гродно и Беларуси</h1>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={herovideo} type="video/webm" />
          Видео недоступно.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 pt-36 sm:pt-60">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Строим каркасные дома под ключ<br />
            <span className="text-[#f9c615] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">в Гродно и Беларуси</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6">
            Работаем по 240 указу для многодетных семей
          </p>
          <button
            onClick={() => onOrderClick()}
            className="bg-[#f9c615] text-[#17253c] font-semibold py-3 px-8 rounded-lg shadow-lg 
                      text-lg transition-all duration-300 ease-in-out
                      hover:bg-[#e5b512] hover:shadow-xl hover:-translate-y-1
                      active:scale-95"
          >
            Заказать консультацию
          </button>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-xs sm:max-w-2xl lg:max-w-5xl text-white mt-10 sm:mt-16"
            aria-labelledby="benefits-heading"
          >
            <h3 id="benefits-heading" className="sr-only">Преимущества строительства с Marmol House</h3>
            {homeBenefits.map((item) => (
              <article key={item.title} className="flex flex-col">
                <h4 className="flex items-center justify-center font-bold text-[#f9c615] uppercase mb-3 sm:mb-4">
                  <FaInfoCircle className="mr-2" aria-hidden="true" />
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-justify">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HousePackages onOrderClick={handlePackageOrderClick} />
      <WhyChooseUs />
      <HowWeWork />
      <TestimonialsSlider />
      <Footer />
    </main>
    </>
  );
}

export default Home;