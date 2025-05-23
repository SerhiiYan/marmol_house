import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Prices from './pages/Prices'
import Materials from './pages/Materials'
import Contact from './pages/Contact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Layout from './components/Layout'
import ProjectDetail from './components/ProjectDetail'
import ProjectPlan from './components/ProjectPlan'

function App() {
  return (
    <Layout>
      <div className="min-h-screen bg-white text-dark">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/project-plan/:id" element={<ProjectPlan />} />
            <Route path="/equipment" element={<Prices />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
      </div>
    </Layout>
  )
}

export default App
