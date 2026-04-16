import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import './Testimonials.css';

const initialReviews = [
  {
    id: 's1',
    author: "Sarah Jenkins",
    role: "Homeowner",
    location: "Cape Town",
    rating: 5,
    content: "Locked myself out at 2 AM. They were here in 15 minutes and had me back inside in under 5. Professional and fast!"
  },
  {
    id: 's2',
    author: "Mark Thompson",
    role: "Business Manager",
    location: "Bellville",
    rating: 5,
    content: "Upgraded our entire office to biometric locks. The team was knowledgeable and the installation was incredibly clean."
  },
  {
    id: 's3',
    author: "David Rodriguez",
    role: "Car Owner",
    location: "Stellenbosch",
    rating: 5,
    content: "Lost my only car fob. Other places told me a week—Your Key Provider made me a new one on the spot. Saved my week!"
  },
  {
    id: 's4',
    author: "Elena Rossi",
    role: "Property Manager",
    location: "Kuilsriver",
    rating: 5,
    content: "Reliable, honest, and fair pricing. I use them for all my rental properties. Best locksmith in the Western Cape."
  }
];

const Testimonials = () => {
  const [dbReviews, setDbReviews] = useState([]);
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    location: '',
    content: '',
    rating: 5
  });

  // 1. UPDATE: Live Render Backend URL
  const API_URL = "https://yourkeyproviderbackend.onrender.com/reviews/";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setDbReviews(data);
        }
      } catch (err) {
        console.error("Failed to load reviews from live database:", err);
      }
    };
    fetchReviews();
  }, []);

  const allReviews = [...dbReviews, ...initialReviews];
  const displayReviews = [...allReviews, ...allReviews];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedReview = await response.json();
        setDbReviews(prev => [savedReview, ...prev]);
        setFormData({ author: '', role: '', location: '', content: '', rating: 5 });
      }
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="section-label">TRUSTED BY HUNDREDS</span>
        <h2>Client <span>Success Stories</span></h2>
        <p className="section-desc">See why homeowners and businesses in <strong>Cape Town</strong> trust us.</p>
      </div>

      <div className="carousel-viewport">
        <div className="carousel-track">
          {displayReviews.map((review, index) => (
            <figure key={index} className="testimonial-card">
              <div className="card-top">
                <div className="star-rating">
                  {[...Array(Number(review.rating))].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <Quote size={24} className="quote-icon" />
              </div>

              <blockquote className="testimonial-text">
                <p>"{review.content}"</p>
              </blockquote>

              <figcaption className="testimonial-footer">
                <div className="user-info">
                  <strong>{review.author}</strong>
                  <span>{review.role} • {review.location}</span>
                </div>
                <div className="verified-badge">
                  <CheckCircle size={12} /> Verified 
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="testimonial-form">
        <h3>Share Your Experience</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" name="author" placeholder="Your Name" 
            value={formData.author} onChange={handleChange} required 
          />
          <input 
            type="text" name="role" placeholder="Your Role (e.g. Homeowner)" 
            value={formData.role} onChange={handleChange} required 
          />
          <input 
            type="text" name="location" placeholder="Your Location" 
            value={formData.location} onChange={handleChange} required 
          />
          <textarea 
            name="content" placeholder="Your Testimonial" 
            value={formData.content} onChange={handleChange} required 
          />
          <label className="rating-label">
            Rating:
            <select name="rating" value={formData.rating} onChange={handleChange}>
              {[5,4,3,2,1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;