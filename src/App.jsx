// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // 1. Импортируем useState

// Компоненты
import Header from './components/Header';
import Layout from './components/Layout';
import ModalForm from './components/ModalForm'; // Модальное окно теперь здесь
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';

// Страницы
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import CompletedProjects from './pages/CompletedProjects';
import Privacy from './pages/Privacy';
import FrameHousesService from './pages/FrameHousesService';
import GasSilicateHousesService from './pages/GasSilicateHousesService';
import DesignService from './pages/DesignService';

// Детали проекта
import ProjectDetail from './components/ProjectDetail';
import ProjectPlan from './components/ProjectPlan';


function App() {
  // 2. СОСТОЯНИЕ ДЛЯ МОДАЛЬНОГО ОКНА ТЕПЕРЬ ЖИВЕТ В APP.JSX
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultMessage, setModalDefaultMessage] = useState('');

  // 3. ФУНКЦИИ УПРАВЛЕНИЯ МОДАЛКОЙ ТОЖЕ ЗДЕСЬ
  const handleOpenModal = (message = '') => {
    setModalDefaultMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
  
      <div className="min-h-screen bg-white text-dark scrollbar-gutter-stable">
        <Header />
        <ScrollToTop />
        {/* 4. MODALFORM ТЕПЕРЬ РЕНДЕРИТСЯ ЗДЕСЬ, ОДИН РАЗ ДЛЯ ВСЕГО ПРИЛОЖЕНИЯ */}
        <ModalForm 
            show={isModalOpen} 
            onClose={handleCloseModal}
            defaultComment={modalDefaultMessage} 
        />
        
        <main>
          <Routes>
            {/* 5. ПЕРЕДАЕМ ФУНКЦИЮ ОТКРЫТИЯ В ТЕ КОМПОНЕНТЫ, ГДЕ ОНА НУЖНА */}
            <Route path="/" element={<Home onOrderClick={handleOpenModal} />} />
            <Route path="/services/frame-houses" element={<FrameHousesService onOrderClick={handleOpenModal} />} />
            <Route path="/services/gas-silicate-houses" element={<GasSilicateHousesService onOrderClick={handleOpenModal} />} />
            <Route path="/gallery" element={<Gallery onOrderClick={handleOpenModal} />} />
            {/* Остальные роуты */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/project-plan/:id" element={<ProjectPlan />} />
            <Route path="/completed" element={<CompletedProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/services/gas-silicate-houses" element={<GasSilicateHousesService />} />
            <Route path="/services/design" element={<DesignService />} />
          </Routes>
        </main>
      </div>

  );
}

export default App;