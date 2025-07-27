// src/pages/ProjectDetail.jsx (Исправленная версия)

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams, Link } from 'react-router-dom'; 
import projects from '../data/projects'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { slugify } from '../utils/slugify'

import ProjectEquipment from './ProjectEquipment';
import ProjectQuickViewModal from './ProjectQuickViewModal';
import ImageGalleryModal from '../components/ImageGalleryModal';
import NotFound from './NotFound'; 
import ProjectCard from '../components/ProjectCard';

const VASH_DOMAIN = 'https://marmolhouse.by';
const COMPANY_NAME = 'Marmol House';

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
  const { slug } = useParams();
  const topRef = useRef(null);
  
  const [quickViewProject, setQuickViewProject] = useState(null);

  const project = useMemo(() => {
    return projects.find((p) => slugify(p.title) === slug);
  }, [slug]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [slug]);

  const similarProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter(p => p.type === project.type && p.id !== project.id)
      .slice(0, 6);
  }, [project]);

  const mainSliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }), []);

  const similarProjectsSliderSettings = useMemo(() => ({
    dots: true,
    infinite: similarProjects.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } },
    ]
  }), [similarProjects.length]);

  const handleOrderClick = useCallback(() => {
    if (onOrderClick && project) {
      const message = `Здравствуйте, интересует проект "${project.title}"`;
      onOrderClick(message);
    }
  }, [onOrderClick, project]);

  const handleOpenQuickView = (projectToView) => {
    setQuickViewProject(projectToView);
  };

  if (!project) return <NotFound />;

  const { pageUrl, seoTitle, seoDescription, breadcrumbSchema, productSchema } = useMemo(() => {
    const pageUrl = `${VASH_DOMAIN}/projects/${slug}`;
    const seoTitle = `${project.title} - Проект дома под ключ в Гродно и Беларуси | ${COMPANY_NAME}`;
    const seoDescription = `Закажите проект дома "${project.title}" (${project.description.find(line => line.includes('Общая площадь')) || ''}) для строительства под ключ в Гродно и по всей Беларуси. Узнайте цену и комплектации от компании Marmol House.`;

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
      "image": project.images.map(img => `${VASH_DOMAIN}${img}`),
      "description": project.fullDescription || seoDescription,
      "sku": project.id,
      "brand": { "@type": "Brand", "name": COMPANY_NAME },
      "offers": {
        "@type": "Offer",
        "url": pageUrl,
        "priceCurrency": "BYN",
        "price": project.price.replace(/[^0-9.]/g, ''),
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": COMPANY_NAME }
      }
    });

    return { pageUrl, seoTitle, seoDescription, breadcrumbSchema, productSchema };
  }, [project, slug]);


  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={`${VASH_DOMAIN}${project.images[0]}`} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${VASH_DOMAIN}${project.images[0]}`} />

      <script type="application/ld+json">{breadcrumbSchema}</script>
      <script type="application/ld+json">{productSchema}</script>

      <div ref={topRef} className="max-w-7xl mx-auto px-4 pt-28 py-10">
        <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:underline">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/gallery" className="hover:underline">Проекты</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-800">{project.title}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-6 text-[#17253c]">{project.title}</h1>
        
        {project.fullDescription && (
            <div className="mb-8 max-w-4xl text-base md:text-lg text-gray-700">
                <p>{project.fullDescription}</p>
            </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/2 relative">
            <Slider {...mainSliderSettings}>
              {project.images.map((img, idx) => (
                <div key={idx} className="flex justify-center">
                  <img src={img} alt={`${project.title} - ${project.type} фото ${idx + 1}.`} className="h-[500px] w-full object-cover rounded cursor-pointer" loading="lazy" onClick={() => setSelectedImageIndex(idx)} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full lg:w-1/2 text-[#17253c] flex flex-col max-h-[500px]">
            <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <h2 className="font-semibold text-xl mb-2">Характеристики проекта</h2>
                <ul className="list-disc pl-5 space-y-1">
                    {project.description.map((line, i) => ( <li key={i} className="text-gray-800">{line}</li> ))}
                </ul>
                {project.packages?.length > 0 && (
                <div className="mt-4 mb-4">
                    <h3 className="font-semibold text-lg mb-1">Доступные комплектации:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                    {project.packages.map((line, idx) => ( <li key={idx} className="text-gray-800">{line}</li> ))}
                    </ul>
                </div>
                )}
            </div>
            
            <div className="mt-auto border-t pt-4 flex justify-between items-center">
                <p className="font-semibold text-lg text-red-600">
                  Цена: {project.price}
                </p>
                <button onClick={handleOrderClick} className="bg-[#f9c615] text-[#17253c] font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors transform hover:scale-105">
                    Получить консультацию
                </button>
            </div>
          </div>
        </div>
        
        <ProjectEquipment packages={project.packages} />

        {similarProjects.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center text-[#17253c] mb-10">Похожие проекты</h2>
            <div className="similar-projects-slider">
                <Slider {...similarProjectsSliderSettings}>
                    {similarProjects.map(p => (
                        <div key={p.id} className="px-2 py-2">
                            <ProjectCard project={p} onQuickViewClick={handleOpenQuickView} />
                        </div>
                    ))}
                </Slider>
            </div>
          </section>
        )}
      </div>

      {selectedImageIndex !== null && ( <ImageGalleryModal images={project.images} initialIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} /> )}
      
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