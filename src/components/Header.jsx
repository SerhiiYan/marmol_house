// src/components/Header.jsx (Финальная версия с мобильным аккордеоном)

import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoH.png';
import { useClickOutside } from '../hooks/useClickOutside';
import { navItems } from '../data/siteData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  const servicesMenuRef = useRef(null);
  useClickOutside(servicesMenuRef, () => setIsDesktopServicesOpen(false));

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);
  
  const handleMainMenuClose = () => {
    setIsMenuOpen(false);
    setIsMobileSubmenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#17253c]/90 text-white shadow-lg z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-3" onClick={handleMainMenuClose}>
          <img src={logo} alt="Логотип Marmol House" className="h-8 w-auto" />
          <span className="text-xl sm:text-2xl font-bold text-yellow-400">Marmol House</span>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Основная навигация">
          {navItems.map((item) => (
            item.submenu ? (
              <div key={item.name} className="relative" ref={servicesMenuRef}>
                <button onClick={() => setIsDesktopServicesOpen(!isDesktopServicesOpen)} className="flex items-center cursor-pointer py-2 hover:text-yellow-400 transition-colors duration-200">
                  {item.name}
                  <ChevronDownIcon className={`w-5 h-5 ml-1.5 transition-transform duration-300 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDesktopServicesOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#23354e] rounded-lg shadow-2xl w-72 origin-top">
                      <div className="p-2">
                        {item.submenu.map((subItem) => (
                          <NavLink key={subItem.path} to={subItem.path} onClick={() => setIsDesktopServicesOpen(false)} className={({ isActive }) => `block px-4 py-2.5 rounded-md text-sm transition-colors ${isActive ? 'bg-yellow-500 text-[#17253c] font-semibold' : 'hover:bg-gray-700/50'}`}>
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `py-2 transition-colors duration-200 ${isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-400'}`}>
                {item.name}
              </NavLink>
            )
          ))}
        </nav>

        <button className="lg:hidden text-white focus:outline-none z-[60]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 w-full h-screen bg-[#17253c] lg:hidden flex flex-col pt-24 px-6 z-50"
          >
            {navItems.map((item) => (
              <div key={item.name} className="w-full border-b border-gray-700/50">
                {item.submenu ? (
                  <>
                    <button 
                      onClick={() => setIsMobileSubmenuOpen(!isMobileSubmenuOpen)}
                      className="w-full flex justify-between items-center py-4 text-2xl text-white hover:text-yellow-400 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className={`w-6 h-6 ml-2 transition-transform duration-300 ${isMobileSubmenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isMobileSubmenuOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {item.submenu.map((subItem) => (
                            <NavLink key={subItem.path} to={subItem.path} onClick={handleMainMenuClose} 
                              className={({ isActive }) => `block py-3 text-lg transition-colors ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>
                              {subItem.name}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink to={item.path} onClick={handleMainMenuClose}
                    className={({ isActive }) => `block w-full py-4 text-2xl transition-colors ${isActive ? 'text-yellow-400 font-semibold' : 'text-white hover:text-yellow-400'}`}>
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;