// src/pages/BlogPostPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import NotFound from '../components/NotFound';
import BlogMedia from '../components/BlogMedia';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

    const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://marmolhouse.by/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Блог",
        "item": "https://marmolhouse.by/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title 
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://marmolhouse.by/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://marmolhouse.by${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": "https://marmolhouse.by/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marmol House",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marmolhouse.by/assets/logo.png"
      }
    },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "wordCount": post.content.replace(/<[^>]+>/g, '').split(' ').length
  };

  return (
    <>
      <title>{post.title} | Блог Marmol House</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={`https://marmolhouse.by${post.image}`} />
      <meta property="og:type" content="article" />
      <link rel="canonical" href={`https://marmolhouse.by/blog/${post.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="pt-28 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 mb-8">
            <nav aria-label="breadcrumb" className="text-sm text-gray-500">
                <Link to="/" className="hover:text-yellow-600 hover:underline">Главная</Link>
                <span className="mx-2">/</span>
                <Link to="/blog" className="hover:text-yellow-600 hover:underline">Блог</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-gray-700">{post.title}</span>
            </nav>
        </div>
        <header className="max-w-7xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-end">
                {/* Левая колонка с заголовком */}
                <div className="lg:col-span-8">
                    <span className="text-yellow-600 font-semibold">{post.category}</span>
                    <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-[#17253c] leading-tight">
                        {post.title}
                    </h1>
                </div>
                {/* Правая колонка с мета-информацией */}
                <div className="lg:col-span-4 mt-6 lg:mt-0 pt-4 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-8">
                    <div className="text-sm text-gray-500">
                        <div><strong>Автор:</strong> {post.author.name}</div>
                        <div className="mt-2"><strong>Опубликовано:</strong> {post.displayDate}</div>
                        <div className="mt-2">☕️ {post.readingTime} минут на чтение</div>
                    </div>
                </div>
            </div>
        </header>

        {/* Основная сетка контента (текст + боковая панель) */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <div className="mb-8">
              <BlogMedia 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto object-cover rounded-2xl shadow-lg" 
              />
            </div>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Блок CTA */}
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-[#17253c]">Нужна консультация?</h3>
                <p className="mt-2 text-gray-700">Обсудим ваш проект и ответим на любые вопросы.</p>
                <Link to="/contact" className="mt-4 inline-block bg-[#f9c615] text-[#17253c] font-semibold py-2 px-6 rounded-lg hover:bg-[#e5b512] transition-colors">
                  Связаться с нами
                </Link>
              </div>

              {/* Блок "Другие статьи" */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[#17253c] mb-4">Другие статьи</h3>
                <ul className="space-y-4">
                  {blogPosts.filter(p => p.slug !== slug).map(otherPost => (
                    <li key={otherPost.slug}>
                      <Link to={`/blog/${otherPost.slug}`} className="group flex items-center gap-4">
                        <BlogMedia 
                          src={otherPost.image}
                          alt="" 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">{otherPost.title}</h4>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;