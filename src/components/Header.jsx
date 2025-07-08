import { useState, Fragment } from 'react'; // Fragment может понадобиться
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// Добавим иконку для выпадающего списка
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoH.png';

// 1. ИЗМЕНЯЕМ СТРУКТУРУ ДАННЫХ
const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Проекты', path: '/gallery' },
  { name: 'Наши работы', path: '/completed' },
  { 
    name: 'Услуги',
    // Добавляем подменю
    submenu: [
      { name: 'Строительство каркасных домов', path: '/services/frame-houses' },
      { name: 'Дома из газосиликатных блоков', path: '/services/gas-silicate-houses' },
      { name: 'Проектирование', path: '/services/design' },
    ]
  },
  { name: 'Контакты', path: '/contact' },
  { name: 'О нас', path: '/about' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Состояние для отслеживания открытого подменю в мобильной версии
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuVariants = { /* ... */ };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#17253c]/90 text-white shadow-md z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} loading="lazy" alt="Marmol House" className="h-6 sm:h-7 w-auto" />
          <span className="text-xl sm:text-2xl font-bold text-yellow-400">Marmol House</span>
        </Link>
        {/* Десктопная навигация */}
        {/* --- ДЕСКТОПНАЯ НАВИГАЦИЯ --- */}
        <nav className="hidden lg:flex items-center space-x-6" aria-label="Основная навигация">
          {navItems.map((item) => (
            item.submenu ? (
              // --- 1. ИЗМЕНЕННЫЙ БЛОК ВЫПАДАЮЩЕГО МЕНЮ ---
              <div key={item.name} className="relative group">
                {/* Родительский элемент */}
                <span className="flex items-center cursor-pointer py-2 hover:text-yellow-400">
                  {item.name}
                  <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </span>

                {/* Выпадающий список. Убрали mt-2, добавили обертку */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2
                              opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-[#17253c] rounded-md shadow-lg w-72">
                    <div className="p-2">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? 'bg-yellow-500 text-[#17253c]' : 'hover:bg-gray-700'}`
                          }
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Обычный пункт меню
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `py-2 ${isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-400'}`}>
                {item.name}
              </NavLink>
            )
          ))}
        </nav>
        {/* Кнопка мобильного меню */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Мобильное меню */}
      {/* --- МОБИЛЬНОЕ МЕНЮ (АККОРДЕОН) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav /* ... */>
            <div className="flex flex-col items-center py-4">
              {navItems.map((item) => (
                item.submenu ? (
                  // 3. РЕНДЕРИМ АККОРДЕОН
                  <div key={item.name} className="w-full text-center">
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className="w-full py-2 flex justify-center items-center text-lg hover:text-yellow-400"
                    >
                      {item.name}
                      <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-300 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-800/50"
                        >
                          {item.submenu.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) => `block py-3 text-sm ${isActive ? 'text-yellow-400' : 'text-gray-300'}`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Обычный пункт мобильного меню
                  <NavLink key={item.path} to={item.path} /* ... */ onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </NavLink>
                )
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;