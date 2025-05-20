import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../assets/logofoo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Компания */}
        <div>
            <img 
                src={logo} 
                alt="Marmol House логотип" 
                className="h-10 mb-4"
            />
            <p className="text-sm text-gray-400">Каркасные дома под ключ в Беларуси</p>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-semibold mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> <span>+375 (29) 184 54 81</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>yurymarmol.83@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>г. Гродно, ул. Лелевеля, 12</span>
            </li>
          </ul>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-semibold mb-4">Навигация</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-yellow-400">Главная</a></li>
            <li><Link to={'/gallery'} className="hover:text-yellow-400">Проекты</Link></li>
            <li><Link to={'/equipment'} className="hover:text-yellow-400">Комплектация</Link></li>
            <li><Link to={'/contact'} className="hover:text-yellow-400">Контакты</Link></li>
            <li><Link to={'/about'} className="hover:text-yellow-400">О нас</Link></li>
          </ul>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
          <div className="flex space-x-4 text-lg">
            <a href="#" target="_blank" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="https://www.instagram.com/marmol_house/" target="_blank" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" target="_blank" className="hover:text-yellow-400"><FaYoutube /></a>
            <a href="#" target="_blank" className="hover:text-yellow-400"><FaTelegram /></a>
          </div>
        </div>
      </div>

      {/* Нижний ряд */}
      {/* <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Marmol House
      </div> */}
    </footer>
  );
}
