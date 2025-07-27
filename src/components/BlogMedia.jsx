// src/components/BlogMedia.jsx

import React from 'react';

const BlogMedia = ({ src, alt, className }) => {

  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  if (isVideo) {
    return (
      <video 
        src={src}
        alt={alt} 
        className={className}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      loading="lazy" 
    />
  );
};

export default BlogMedia;