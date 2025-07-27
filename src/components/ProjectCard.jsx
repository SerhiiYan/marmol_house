// src/components/ProjectCard.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { slugify } from '../utils/slugify'; 

const ProjectCard = ({ project, onQuickViewClick }) => {

  const imageAltText = `Проект ${project.type.toLowerCase()} "${project.title}" для строительства в Гродно и Беларуси.`;
  const keyFeature = project.description.find(line => line.toLowerCase().includes('площадь')) || project.description[0];

  const projectUrl = `/projects/${slugify(project.title)}`;

  return (

    <Link to={projectUrl} aria-label={`Узнать больше о проекте ${project.title}`}>

      <motion.article
        className="bg-white shadow-lg rounded-xl overflow-hidden group transition-all duration-300 cursor-pointer h-full flex flex-col"
        whileHover={{ y: -5, scale: 1.02, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={project.images[0]}
            alt={imageAltText} 
            className="w-full h-56 object-cover"
            loading="lazy"
            width="400" 
            height="224"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-black/10 sm:bg-transparent sm:opacity-0 sm:group-hover:bg-black/40 sm:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <button 
                  onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onQuickViewClick(project);
                  }}
                  className="flex items-center bg-white/90 text-gray-900 font-semibold py-2 px-4 rounded-lg transform transition-transform scale-90 sm:scale-100 hover:!scale-105"
                  aria-label={`Быстрый просмотр проекта ${project.title}`}
              >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Быстрый просмотр
              </button>
          </div>
          <div className="absolute top-2 right-2 bg-yellow-400 text-[#17253c] text-xs font-semibold px-2 py-1 rounded">
            {project.type}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex justify-between items-start sm:block">

              <h3 className="text-lg font-semibold text-[#17253c] group-hover:text-yellow-600 transition-colors">
                {project.title}
              </h3>

              <span className="block sm:hidden text-rose-600 text-base font-semibold whitespace-nowrap">
                {project.price}
              </span>
            </div>

            {keyFeature && (
              <p className="text-sm text-gray-600 mt-1 truncate" title={keyFeature}>
                {keyFeature}
              </p>
            )}
          </div>
          
          <div className="mt-4">
            <div className="hidden sm:flex items-center justify-end -mt-8">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="hidden sm:block font-semibold text-rose-600 text-lg">
              {project.price}
            </span>
          </div>

        </div>
      </motion.article>
    </Link>
  );
};

export default ProjectCard;