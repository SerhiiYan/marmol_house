import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaInfoCircle } from 'react-icons/fa';
import herovideo from '../assets/herovideo.webm';
import ModalForm from '../components/ModalForm';
import HowWeWork from '../components/HowWeWork';
import WhyChooseFrameHouse from '../components/WhyChooseFrameHouse';
import BlockHouseFeatureCircle from '../components/BlockHouseFeatureCircle';
import HousePackages from '../components/HousePackages';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSlider from '../components/TestimonialsSlider';

// Компонент главной страницы
function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comments: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://script.google.com/macros/s/AKfycby6QFmJOZb0l39zhVHOzl5ghg-bGa0Lj8OdK5Z6CCXWX33oT8fB1cOL67gCZqniA9jn/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.comments || 'Хочу консультации по строительству дома',
        }),
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', comments: '' });
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Ошибка при отправке формы. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // Структурированные данные для SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Marmol House',
    description: 'Строительство каркасных домов под ключ в Гродно и по всей Беларуси. Работаем по 240 указу для многодетных семей.',
    url: 'https://marmol-house.vercel.app', // Реальный URL
    telephone: '+375291845481',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Гродно',
      addressCountry: 'BY',
    },
    sameAs: [
      'https://facebook.com/marmolhouse',
      'https://instagram.com/marmolhouse',
    ],
    image: 'https://marmol-house.vercel.app/assets/logo.png',
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Метатеги для SEO */}
      <Helmet>
        <html lang="ru" />
        <title>Каркасные дома под ключ в Беларуси | Marmol House</title>
        <meta
          name="description"
          content="Строим каркасные дома под ключ в Гродно и по всей Беларуси. Работаем по 240 указу для многодетных семей, проект в подарок, фиксированная цена."
        />
        <meta
          name="keywords"
          content="каркасные дома, строительство домов, Гродно, Беларусь, 240 указ, многодетные семьи, дом под ключ, Marmol House"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Каркасные дома под ключ | Marmol House" />
        <meta property="og:description" content="Строительство каркасных домов в Гродно и Беларуси по 240 указу. Проект в подарок!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marmol-house.vercel.app" />
        <meta property="og:image" content="https://marmol-house.vercel.app/og-image.png" />
        <meta property="og:locale" content="ru_RU" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">Строительство каркасных домов в Гродно и Беларуси</h1>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={herovideo} type="video/webm" />
          <source src="/assets/herovideo.mp4" type="video/mp4" />
          Видео недоступно.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 pt-36 sm:pt-40">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Строим каркасные дома под ключ<br />
            <span className="text-[#f9c615] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">в Гродно и Беларуси</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6">
            Работаем по 240 указу для многодетных семей
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#f9c615] text-[#17253c] font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-[#e5b512] transition-colors duration-200 mt-4 sm:mt-8"
            aria-label="Заказать консультацию по строительству каркасного дома"
          >
            Заказать консультацию
          </button>
          {/* Преимущества */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-xs sm:max-w-2xl lg:max-w-5xl text-white mt-10 sm:mt-16" aria-labelledby="benefits-heading">
            <h3 id="benefits-heading" className="sr-only">Преимущества строительства с Marmol House</h3>
            {[
              {
                title: "Работаем по 240 указу",
                text: "Многодетные семьи получают участок бесплатно и частичную оплату строительства за счёт бюджета.",
              },
              {
                title: "Проект в подарок",
                text: "Бесплатный проект дома с учётом ваших пожеланий и особенностей участка при заказе строительства.",
              },
              {
                title: "Фиксированная цена",
                text: "Цена прописывается в договоре и остаётся неизменной на всех этапах строительства.",
              },
            ].map((item, index) => (
              <article key={index} className="flex flex-col">
                <h4 className="flex items-center justify-center font-bold text-[#f9c615] uppercase mb-3 sm:mb-4">
                  <FaInfoCircle className="mr-2" aria-hidden="true" />
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-justify">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section><WhyChooseFrameHouse /></section>
      <section><BlockHouseFeatureCircle /></section>
      <section><HousePackages /></section>
      <section><WhyChooseUs /></section>
      <section><HowWeWork /></section>
      <section><TestimonialsSlider /></section>
      <Footer />

      {/* Модальное окно */}
      {showModal && (
        <ModalForm
          show={showModal}
          onClose={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
          success={success}
        />
      )}
    </main>
  );
}

export default Home;