// src/components/ProjectCard.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Добавляем иконки
import { EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const ProjectCard = ({ project, onQuickViewClick }) => {
  return (
    // 1. ВСЯ КАРТОЧКА ТЕПЕРЬ ССЫЛКА (но кнопка будет перехватывать клик)
    <Link to={`/projects/${project.id}`} aria-label={`Перейти к проекту ${project.title}`}>
      <motion.div
        className="bg-white shadow-lg rounded-xl overflow-hidden group transition-all duration-300 cursor-pointer"
        whileHover={{ y: -5, scale: 1.02, shadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={project.images[0]}
            alt={`Проект ${project.title}`}
            className="w-full h-56 object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Кнопка быстрого просмотра, как и раньше */}
          <div className="absolute inset-0 bg-black/10 sm:bg-transparent sm:opacity-0 sm:group-hover:bg-black/40 sm:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <button 
                  // 2. ДОБАВЛЯЕМ ПЕРЕХВАТ КЛИКА
                  onClick={(e) => {
                      e.preventDefault(); // <-- Это предотвратит переход по ссылке родителя
                      e.stopPropagation(); // Останавливаем "всплытие" события
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
         <div className="p-4">
          {/* --- НАЧАЛО ИЗМЕНЕНИЙ --- */}

          {/* Контейнер для заголовка и цены (для мобильных) */}
          <div className="flex justify-between items-start sm:block">
            {/* Заголовок */}
            <h3 className="text-lg font-semibold text-[#17253c] group-hover:text-yellow-600 transition-colors">
              {project.title}
            </h3>
            
            {/* Цена (видима только на мобильных) */}
            <span className="block sm:hidden text-rose-600 text-base font-semibold whitespace-nowrap">
              {project.price}
            </span>
          </div>

          {/* Иконка-подсказка (для десктопа) */}
          <div className="hidden sm:flex items-center justify-end -mt-5">
             <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Цена (видима только на десктопе) */}
          <span className="hidden sm:block font-semibold text-rose-600 text-lg mt-1">
            {project.price}
          </span>
          
          {/* --- КОНЕЦ ИЗМЕНЕНИЙ --- */}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;