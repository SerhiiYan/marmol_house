import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logoH.png';

const Header = () => {
  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Проекты', path: '/gallery' },
    { name: 'Наши работы', path: '/completed' },
    { name: 'Материалы', path: '/materials' },
    { name: 'Контакты', path: '/contact' },
    { name: 'О нас', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#17253c]/100 text-white shadow-md z-50 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Marmol House" className="h-7 w-auto" />
          <span className="text-2xl font-bold text-primary">Marmol House</span>
        </Link>
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'text-primary font-semibold' : 'hover:text-primary'
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
