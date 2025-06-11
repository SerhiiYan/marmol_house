import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logofoo.png';

// Варианты анимации для иконок
const iconHover = {
  hover: { scale: 1.2, rotate: 12, transition: { duration: 0.3 } },
};

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-gradient-to-b from-gray-900 to-[#17253c] text-white py-8 sm:py-10"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
        {/* Компания */}
        <div>
          <img
            src={logo}
            loading="lazy"
            alt="Marmol House логотип"
            className="h-12 sm:h-14 mb-4"
          />
          <p className="text-sm sm:text-base text-gray-300">
            Каркасные дома под ключ в Беларуси
          </p>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Контакты
          </h4>
          <ul className="space-y-3 text-sm sm:text-base text-gray-300">
            <li className="flex items-center gap-1 sm:gap-2 min-w-0">
              <motion.div whileHover="hover" variants={iconHover}>
                <FaPhone className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              </motion.div>
              <span>+375 (29) 184 54 81</span>
            </li>
            <li className="flex items-center gap-1 sm:gap-2 min-w-0">
              <motion.div whileHover="hover" variants={iconHover}>
                <FaEnvelope className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              </motion.div>
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                yurmarmol@gmail.com
              </span>
            </li>
            <li className="flex items-center gap-1 sm:gap-2 min-w-0">
              <motion.div whileHover="hover" variants={iconHover}>
                <FaMapMarkerAlt className="text-yellow-500 w-4 h-4 flex-shrink-0" />
              </motion.div>
              <span>г. Гродно, ул. Лелевеля, 12A, к 6</span>
            </li>
          </ul>
        </div>

        {/* Навигация */}
        <div role="navigation">
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Навигация
          </h4>
          <ul className="space-y-3 text-sm sm:text-base text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-500 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-yellow-500 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Проекты
              </Link>
            </li>
            <li>
              <Link
                to="/completed"
                className="hover:text-yellow-500 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Нашы работы
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-500 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Контакты
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-500 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                О нас
              </Link>
            </li>
          </ul>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">
            Мы в соцсетях
          </h4>
          <div className="flex space-x-4 text-lg">
            <motion.a
              href="#"
              target="_blank"
              aria-label="Facebook Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/marmol_house/"
              target="_blank"
              aria-label="Instagram Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              aria-label="YouTube Marmol House"
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
              whileHover="hover"
              variants={iconHover}
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              href="https://t.me/MarmolHouse"
              target="_blank"
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