// src/pages/ProjectDetail.jsx

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams, Link } from 'react-router-dom'; // useNavigate удален, так как не используется
import projects from '../data/projects'; // Убедитесь, что путь к данным верный
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { slugify } from '../utils/slugify'

import ProjectEquipment from './ProjectEquipment';
import ProjectQuickViewModal from './ProjectQuickViewModal';
import ImageGalleryModal from '../components/ImageGalleryModal';
import NotFound from './NotFound'; // Предполагается, что у вас есть компонент NotFound


const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full p-1 ml-2 shadow-md">
    <FaChevronLeft className="text-xl text-gray-800" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-1 mr-2 shadow-md">
    <FaChevronRight className="text-xl text-gray-800" />
  </button>
);

const ProjectDetail = ({ onOrderClick }) => {
  // ИЗМЕНЕНИЕ 1: Получаем slug из URL вместо id
  const { slug } = useParams();

  // ИЗМЕНЕНИЕ 2: Ищем проект, сравнивая сгенерированный слаг с тем, что в URL
  const project = projects.find((p) => slugify(p.title) === slug);

  const [quickViewProject, setQuickViewProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const topRef = useRef(null);

  // ИЗМЕНЕНИЕ 3: useEffect теперь зависит от slug
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [slug]);

  if (!project) return <NotFound />;

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const VASH_DOMAIN = 'https://marmolhouse.by';
  const COMPANY_NAME = 'Marmol House';
  // ИЗМЕНЕНИЕ 4: URL страницы теперь строится на основе слага
  const pageUrl = `${VASH_DOMAIN}/projects/${slug}`;
  
  const seoTitle = `${project.title} - Проект дома под ключ в Гродно и Беларуси | ${COMPANY_NAME}`;
  const areaInfo = project.description.find(line => line.toLowerCase().includes('общая площадь')) || `проект ${project.type.toLowerCase()}`;
  const seoDescription = `Закажите проект дома "${project.title}" (${areaInfo}) для строительства под ключ в Гродно, Минске и по всей Беларуси. Узнайте цену и комплектации от компании ${COMPANY_NAME}.`;
  
  const imageUrl = `${VASH_DOMAIN}${project.images[0]}`;

  // ИЗМЕНЕНИЕ 5: Обновляем URL в JSON-LD схемах
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList",      
    "itemListElement": [            
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": VASH_DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "Проекты", "item": `${VASH_DOMAIN}/gallery` },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": pageUrl }
    ]
  });

  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",                
    "name": project.title,             
    "image": imageUrl,                 
    "description": seoDescription,     
    "sku": project.id, // SKU остается прежним, это уникальный идентификатор товара
    "brand": { "@type": "Brand", "name": COMPANY_NAME },
    "offers": {                        
      "@type": "Offer",
      "url": pageUrl, // Используем новый URL
      "priceCurrency": "BYN",          
      "price": project.price.replace(/[^0-9.]/g, ''), 
      "availability": "https://schema.org/InStock", 
      "seller": { "@type": "Organization", "name": COMPANY_NAME }
    }
  });

  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {/* ИЗМЕНЕНИЕ 6: Обновляем canonical и Open Graph URL */}
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={COMPANY_NAME} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{breadcrumbSchema}</script>
      <script type="application/ld+json">{productSchema}</script>

      <div ref={topRef} className="max-w-6xl mx-auto px-4 pt-28 py-10">
        <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:underline">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/gallery" className="hover:underline">Проекты</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-800">{project.title}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-6 text-[#17253c]">{project.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/2 relative">
            <Slider {...mainSliderSettings}>
              {project.images.map((img, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={img}
                    alt={`${project.title} - ${project.type} фото ${idx + 1}. Строительство домов в Гродно.`}
                    className="h-[500px] w-full object-cover rounded cursor-pointer"
                    loading="lazy"
                    onClick={() => setSelectedImageIndex(idx)}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full lg:w-1/2 text-[#17253c] flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <h2 className="font-semibold text-xl mb-2">Характеристики проекта</h2>
            <ul className="list-disc pl-5 space-y-1 flex-1">
              {project.description.map((line, i) => (
                <li key={i} className="text-gray-800">{line}</li>
              ))}
            </ul>
            {project.packages?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-1">Доступные комплектации:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {project.packages.map((line, idx) => (
                    <li key={idx} className="text-gray-800">{line}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-4 font-semibold text-lg text-red-600">
              Цена: {project.price}
            </p>
          </div>
        </div>
        <ProjectEquipment packages={project.packages} />
      </div>

      {selectedImageIndex !== null && (
        <ImageGalleryModal
          images={project.images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
      
      {quickViewProject && (
        <ProjectQuickViewModal
          project={quickViewProject}
          onClose={() => setQuickViewProject(null)}
          onOrder={onOrderClick}
        />
      )}
    </>
  );
};

export default ProjectDetail;