import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Quote, CheckCircle } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Homeowner",
    location: "Cape Town",
    text: "Locked myself out at 2 AM. They were here in 15 minutes and had me back inside in under 5. Professional and fast!",
    rating: 5
  },
  {
    id: 2,
    name: "Mark Thompson",
    role: "Business Manager",
    location: "Bellville",
    text: "Upgraded our entire office to biometric locks. The team was knowledgeable and the installation was incredibly clean.",
    rating: 5
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Car Owner",
    location: "Stellenbosch",
    text: "Lost my only car fob. Other places told me a week—Your Key Provider made me a new one on the spot. Saved my week!",
    rating: 5
  },
  {
    id: 4,
    name: "Elena Rossi",
    role: "Property Manager",
    location: "Kuilsriver",
    text: "Reliable, honest, and fair pricing. I use them for all my rental properties. Best locksmith in the Western Cape.",
    rating: 5
  }
];

const Testimonials = () => {
  const displayReviews = [...reviews, ...reviews];
  const testimonialSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Your Key Provider Locksmiths",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": reviews.length.toString()
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.name },
      "reviewBody": r.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(testimonialSchema)}</script>
      </Helmet>

      <section className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="testimonials-header">
          <span className="section-label">TRUSTED BY HUNDREDS</span>
          <h2 id="testimonials-title">Client <span>Success Stories</span></h2>
          <p className="section-desc">See why homeowners and businesses in <strong>Cape Town</strong> trust us for their security.</p>
        </div>

        <div className="carousel-viewport" aria-live="off">
          <div className="carousel-track">
            {displayReviews.map((review, index) => (
              <figure 
                key={index} 
                className="testimonial-card"
                aria-hidden={index >= reviews.length}
              >
                <div className="card-top">
                  <div className="star-rating" aria-label={`Rated ${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote size={24} className="quote-icon" aria-hidden="true" />
                </div>

                <blockquote className="testimonial-text">
                  <p>"{review.text}"</p>
                </blockquote>

                <figcaption className="testimonial-footer">
                  <div className="user-info">
                    <strong>{review.name}</strong>
                    <span>{review.role} • {review.location}</span>
                  </div>
                  <div className="verified-badge">
                    <CheckCircle size={12} aria-hidden="true" /> Verified 
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;