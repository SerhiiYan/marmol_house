import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Layout from './components/Layout';
import ProjectDetail from './components/ProjectDetail';
import ProjectPlan from './components/ProjectPlan';
import CompletedProjects from './pages/CompletedProjects';
import NotFound from './components/NotFound';

function App() {
  return (
    <Layout>
      <div className="min-h-screen bg-white text-dark scrollbar-gutter-stable">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/project-plan/:id" element={<ProjectPlan />} />
            <Route path="/completed" element={<CompletedProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Layout>
  );
}

export default App;