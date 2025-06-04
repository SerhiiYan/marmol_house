import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Layout from './components/Layout';
import ProjectDetail from './components/ProjectDetail';
import ProjectPlan from './components/ProjectPlan';
import CompletedProjects from './pages/CompletedProjects';

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
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
      </div>
    </Layout>
  );
}

export default App;