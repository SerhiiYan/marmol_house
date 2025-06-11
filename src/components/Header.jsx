import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoH.png';

// Компонент хедера с адаптивной навигацией
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Проекты', path: '/gallery' },
    { name: 'Наши работы', path: '/completed' },
    { name: 'Контакты', path: '/contact' },
    { name: 'О нас', path: '/about' },
  ];

  // Варианты анимации для мобильного меню
  const menuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.2 } },
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#17253c]/90 text-white shadow-md z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} loading="lazy" alt="Marmol House" className="h-6 sm:h-7 w-auto" />
          <span className="text-xl sm:text-2xl font-bold text-yellow-400">Marmol House</span>
        </Link>
        {/* Десктопная навигация */}
        <nav className="hidden lg:flex space-x-2 sm:space-x-4 lg:space-x-6" aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-400'
              }
            >
              {item.name}
            </NavLink>
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden bg-[#17253c] w-full absolute top-full left-0 shadow-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            aria-label="Мобильная навигация"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'text-yellow-400 font-semibold text-lg' : 'text-white hover:text-yellow-400 text-lg'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;