import { useState } from 'react'
import projects from '../data/projects'
import GalleryFilter from '../components/GalleryFilter'
import ProjectCard from '../components/ProjectCard'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все')

  const filtered = selectedCategory === 'Все'
    ? projects
    : projects.filter(p => p.type === selectedCategory)

  return (
    <section className="pt-20">
      <h1 className="text-3xl font-bold text-center mt-6 mb-2">Наши проекты</h1>
      <GalleryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Gallery
