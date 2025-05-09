import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from '../assets/logoH.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Компанія */}
        <div>
            <img 
                src={logo} 
                alt="Marmol House логотип" 
                className="h-10 mb-4"
            />
            <p className="text-sm text-gray-400">Каркасные дома под ключ в Беларуси</p>
        </div>

        {/* Контакти */}
        <div>
          <h4 className="font-semibold mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> <span>+375 (29) 123-45-67</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>info@stroydom.by</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>г. Гродно, ул. Примерная, 12</span>
            </li>
          </ul>
        </div>

        {/* Посилання */}
        <div>
          <h4 className="font-semibold mb-4">Навигация</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Главная</a></li>
            <li><a href="#">Проекты</a></li>
            <li><a href="#">Преимущества</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>

        {/* Соцмережі */}
        <div>
          <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Нижній рядок */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} СтройДом. Все права защищены.
      </div>
    </footer>
  );
}
