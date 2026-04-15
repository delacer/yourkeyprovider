import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'
import './Gallery.css';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({ file: null, caption: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.file) return;
    const newItem = {
      id: gallery.length + 1,
      url: URL.createObjectURL(formData.file),
      caption: formData.caption
    };
    setGallery(prev => [newItem, ...prev]);
    setFormData({ file: null, caption: '' });
  };

  return (
    <>
    <Helmet>
  <title>Your Key Provider Locksmiths - Work Gallery</title>
  <meta name="description" content="Browse our locksmith work gallery showcasing completed projects in Cape Town and surrounding areas." />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Your Key Provider Locksmiths Work Gallery",
      "image": gallery.map(item => item.url),
      "description": "Gallery of locksmith projects completed in Cape Town, Bellville, Stellenbosch, and Kuilsriver."
    })}
  </script>
</Helmet>
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>Our Work Gallery</h2>
        <p className="gallery-desc">A showcase of projects we’ve completed for clients.</p>
      </div>

      {/* Carousel */}
      <div className="gallery-viewport" aria-live="off">
        <div className="gallery-track">
          {[...gallery, ...gallery].map((item, index) => (
            <figure key={index} className="gallery-card" aria-hidden={index >= gallery.length}>
              <img src={item.url} alt={`Locksmith project - ${item.caption}`} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Upload Form */}
      <div className="gallery-form">
        <h3>Upload Your Work</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            name="file" 
            accept="image/*" 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="caption" 
            placeholder="Caption" 
            value={formData.caption} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">Add to Gallery</button>
        </form>
      </div>
    </section>
    </>
  );
};

export default Gallery;
