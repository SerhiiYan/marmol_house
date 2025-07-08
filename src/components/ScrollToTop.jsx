// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Получаем информацию о текущем маршруте
  const { pathname } = useLocation();

  // useEffect будет срабатывать каждый раз, когда меняется pathname
  useEffect(() => {
    // Выполняем скролл в начало страницы
    window.scrollTo(0, 0);
  }, [pathname]); // <-- Зависимость от pathname

  // Этот компонент ничего не рендерит, он просто выполняет действие
  return null;
};

export default ScrollToTop;