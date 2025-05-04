import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    // Головна сторінка — без контейнера
    return <>{children}</>;
  }

  // Всі інші сторінки — з контейнером
  return (
    <div className="max-w-6xl mx-auto px-4">
      {children}
    </div>
  );
};

export default Layout;
