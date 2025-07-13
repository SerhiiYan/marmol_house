// src/components/Footer.jsx

import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logofoo.png';

const iconHover = {
  hover: { scale: 1.2, rotate: 12, transition: { duration: 0.3 } },
};

function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const VASH_DOMAIN = 'https://marmolhouse.by';
  const COMPANY_NAME = 'Marmol House';

  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_NAME,
    "url": VASH_DOMAIN,
    "logo": `${VASH_DOMAIN}${logo}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+375-29-184-54-81",
      "contactType": "customer service",
      "email": "yurmarmol@gmail.com",
      "areaServed": "BY",
      "availableLanguage": ["Russian", "Belarusian"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Лелевеля, 12A, к 6",
      "addressLocality": "Гродно",
      "addressCountry": "BY"
    },
    "sameAs": [ 
      "https://www.instagram.com/marmol_house/",
      "https://t.me/MarmolHouse",
    ]
  });


  return (
    <footer className="bg-gradient-to-b from-gray-900 to-[#17253c] text-white py-8 sm:py-10">
      
      <script type="application/ld+json">{organizationSchema}</script>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        

        <div>
          <img
            src={logo}
            alt={`Логотип строительной компании ${COMPANY_NAME}`}
            className="h-12 sm:h-14 mb-4"
            width="200"
            height="100"
          />
          <p className="text-sm sm:text-base text-gray-300">
            Строительство каркасных домов под ключ в Гродно и по всей Беларуси.
          </p>
        </div>


        <address className="not-italic">
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Контакты
          </h4>
          <ul className="space-y-3 text-sm sm:text-base text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhone className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              <a href="tel:+375291845481" className="hover:text-yellow-500 transition-colors">
                +375 (29) 184-54-81
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              <a href="mailto:yurmarmol@gmail.com" className="hover:text-yellow-500 transition-colors truncate">
                yurmarmol@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              <span>г. Гродно, ул. Лелевеля, 12A, к 6</span>
            </li>
          </ul>
        </address>


        <nav aria-label="Дополнительная навигация по сайту">
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Навигация
          </h4>
          <ul className="space-y-3 text-sm sm:text-base text-gray-300">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors duration-300" onClick={handleLinkClick}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-yellow-500 transition-colors duration-300" onClick={handleLinkClick}>
                Проекты
              </Link>
            </li>
            <li>
              <Link to="/completed" className="hover:text-yellow-500 transition-colors duration-300" onClick={handleLinkClick}>
                Наши работы
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500 transition-colors duration-300" onClick={handleLinkClick}>
                Контакты
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500 transition-colors duration-300" onClick={handleLinkClick}>
                О нас
              </Link>
            </li>
          </ul>
        </nav>


        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Мы в соцсетях
          </h4>
          <div className="flex space-x-4 text-lg">
            {/* <motion.a
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaFacebookF />
            </motion.a> */}
            <motion.a
              href="https://www.instagram.com/marmol_house/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaInstagram />
            </motion.a>
            {/* <motion.a
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaYoutube />
            </motion.a> */}
            <motion.a
              href="https://t.me/MarmolHouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaTelegram />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default React.memo(Footer);