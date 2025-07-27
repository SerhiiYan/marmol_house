// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; 


import Header from './components/Header';
import ModalForm from './components/ModalForm'; 
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';


import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import CompletedProjects from './pages/CompletedProjects';
import Privacy from './pages/Privacy';
import FrameHousesService from './pages/FrameHousesService';
import GasSilicateHousesService from './pages/GasSilicateHousesService';
import DesignService from './pages/DesignService';
import ProjectDetail from './components/ProjectDetail';
import ProjectPlan from './components/ProjectPlan';
import Footer from './components/Footer';
import BlogListingPage from './pages/BlogListingPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx';
import LandscapeDesignService from './pages/LandscapeDesignService.jsx';


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultMessage, setModalDefaultMessage] = useState('');

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
     
        <ModalForm 
            show={isModalOpen} 
            onClose={handleCloseModal}
            defaultComment={modalDefaultMessage} 
        />
        
        <main>
          <Routes>
            
            <Route path="/" element={<Home onOrderClick={handleOpenModal} />} />
            <Route path="/gallery" element={<Gallery onOrderClick={handleOpenModal} />} />
            <Route path="/completed" element={<CompletedProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />

            <Route path="/services/frame-houses" element={<FrameHousesService onOrderClick={handleOpenModal} />} />
            <Route path="/services/gas-silicate-houses" element={<GasSilicateHousesService onOrderClick={handleOpenModal} />} />
            <Route path="/services/design" element={<DesignService onOrderClick={handleOpenModal} />} />
            <Route path="/services/landscape-design" element={<LandscapeDesignService onOrderClick={handleOpenModal} />} />

            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail onOrderClick={handleOpenModal} />} /> 
            <Route path="/project-plan/:id" element={<ProjectPlan />} />

            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </main>
        <Footer />
      </div>

  );
}

export default App;