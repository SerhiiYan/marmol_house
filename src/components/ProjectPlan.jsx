import { useParams } from 'react-router-dom'; 
import projects from '../data/projects'; 

const ProjectPlan = () => {
  const { id } = useParams(); 
  const project = projects.find((proj) => proj.id === parseInt(id)); 

  if (!project) {
    return <div>Проект не найден</div>; 
  }

  return (
    <section className="project-plan">
      <h1 className="text-center text-2xl font-bold">План проекта: {project.title}</h1>
      <div className="plan-image-container text-center mt-6">
        <img
            src={project.images[project.images.length - 1]} 
            alt={`План проекта ${project.title}`}
            loading="lazy"
            className="max-w-full max-h-[80vh] object-contain mx-auto"
        />
      </div>
    </section>
  );
};

export default ProjectPlan;
