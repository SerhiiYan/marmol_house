import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} aria-label={`Перейти к проекту ${project.title}`}>
      <motion.div
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={project.images[0]}
            alt={`Проект ${project.title}`}
            className="w-full h-64 sm:h-56 lg:h-60 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-[#17253c] text-xs font-semibold px-2 py-1 rounded">
            {project.type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#17253c]">
            {project.title}
            <span className="block text-rose-600 text-base mt-1">{project.price}</span>
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;