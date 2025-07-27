// src/pages/BlogListingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData'; 
import BlogMedia from '../components/BlogMedia';

// SEO Схема для страницы со списком статей
const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Блог о строительстве домов в Беларуси | Marmol House",
  "description": "Полезные статьи, советы и разборы реальных проектов от экспертов Marmol House. Узнайте все о строительстве каркасных и блочных домов, сметах и технологиях.",
  "url": "https://marmolhouse.by/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Marmol House",
    "logo": {
      "@type": "ImageObject",
      "url": "https://marmolhouse.by/assets/logo.png"
    }
  }
};

const BlogListingPage = () => {

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <>
        <title>Наш Блог | Marmol House</title>
        <div className="max-w-7xl mx-auto px-4 py-28 sm:py-32 text-center">
            <h1 className="text-3xl font-bold text-[#17253c]">Статьи в процессе написания</h1>
            <p className="mt-4 text-lg text-gray-600">Мы уже готовим полезные материалы. Загляните сюда чуть позже!</p>
        </div>
      </>
    );
  }

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

  const featuredPost = sortedPosts[0];
  const otherPosts = sortedPosts.slice(1);

  return (
    <>
      <title>Блог о строительстве в Беларуси | Marmol House</title>
      <meta name="description" content="Полезные статьи о строительстве каркасных и блочных домов. Советы, разбор смет, сравнение технологий от экспертов Marmol House." />
      <link rel="canonical" href="https://marmolhouse.by/blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-28 sm:py-32">
        <header className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 items-center">
            <div className="md:col-span-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#17253c] leading-tight">
                Наш блог
              </h1>
            </div>
            <div className="md:col-span-2 mt-4 md:mt-0">
              <p className="text-xl text-gray-600 border-t-2 md:border-t-0 md:border-l-2 border-gray-200 pt-4 md:pt-0 md:pl-8">
                Делимся опытом, разбираем технологии и помогаем вам принять правильные решения.
              </p>
            </div>
          </div>
        </header>

        {/* Закрепленная статья */}
        {featuredPost && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Link to={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="overflow-hidden rounded-lg">
                  <BlogMedia 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-yellow-600 font-semibold">{featuredPost.category}</span>
                  <h2 className="mt-2 text-3xl font-bold text-[#17253c] group-hover:text-yellow-700 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-gray-600">{featuredPost.excerpt}</p>
                  <div className="mt-4 text-sm text-gray-500">{featuredPost.displayDate} · ☕️ {featuredPost.readingTime} мин на чтение</div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Сетка остальных статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="block group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="overflow-hidden rounded-lg">
                  <BlogMedia 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow pt-5">
                  <span className="text-yellow-600 font-semibold">{post.category}</span>
                  <h3 className="mt-2 text-xl font-bold text-[#17253c]">{post.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 flex-grow">{post.excerpt}</p>
                </div>
                <div className="mt-4 text-xs text-gray-500 pt-4 border-t">{post.displayDate} · ☕️ {post.readingTime} мин</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogListingPage;