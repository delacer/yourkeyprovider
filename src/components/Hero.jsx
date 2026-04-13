import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';
import { Shield, Key, Car, Building2, Home, Phone, Star } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const services = [
    { icon: <Home size={24} />, label: "Residential", angle: 0 },
    { icon: <Key size={24} />, label: "Emergency", angle: 72 },
    { icon: <Building2 size={24} />, label: "Commercial", angle: 144 },
    { icon: <Car size={24} />, label: "Automotive", angle: 216 },
    { icon: <Shield size={24} />, label: "Security", angle: 288 },
  ];
  const heroSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Locksmith Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Your Key Provider Locksmiths",
      "address": "Cape Town, South Africa"
    },
    "areaServed": "Cape Town",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Security Solutions",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": `${s.label} Locksmith` }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Key Provider | 24/7 Professional Locksmith Cape Town</title>
        <meta name="description" content="Expert locksmith services in Cape Town. 24/7 Emergency dispatch, residential security, and automotive key programming. 18-minute average arrival time." />
        <script type="application/ld+json">{JSON.stringify(heroSchema)}</script>
      </Helmet>

      <section className="hero-wrapper">
        <div className="hero-text-side">
          <div className="badge-reveal">
            <span className="dot" aria-hidden="true"></span>
            <span className="badge-text">Secure. Reliable. Fast.</span>
          </div>
          <h1 className="hero-main-title">
            Your Security, <br/>
            <span className="text-gradient">Our Priority.</span>
          </h1>
          
          <p className="hero-description">
            Premium <strong>locksmith services in Cape Town</strong> for the modern world. 
            We combine <strong>traditional craftsmanship</strong> with <strong>smart-home technology</strong> 
            to keep your property safe 24/7.
          </p>
          
          <div className="hero-btn-group">
            <button 
              className="cta-button primary" 
              onClick={() => window.location.href = 'tel:+27837659945'}
              aria-label="Call for Emergency Dispatch"
            >
              <Phone size={20} aria-hidden="true" /> 
              <span>Emergency Dispatch</span>
            </button>

            <button 
              className="cta-button outline"
              onClick={() => navigate('/services')}
              aria-label="Browse our locksmith solutions"
            >
              Browse Solutions
            </button>
          </div>

          <div className="hero-trust-footer">
            <p>Trusted by 5,000+ Cape Town residents & businesses</p>
            <div className="trust-stars" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#fbbf24" stroke="none" />
              ))}
            </div>
          </div>
        </div>

        <div className="orbit-viewport" aria-hidden="true"> 
          <div className="stationary-center">
            <div className="center-logo">
              <img 
                src="/locksmith.jpeg" 
                alt="Your Key Provider Locksmiths Logo - Serving Cape Town" 
                className="logo-img" 
                loading="eager" 
              />
            </div>
            <div className="pulse-ring ring-1"></div>
            <div className="pulse-ring ring-2"></div>
          </div>

          <div className="rotating-orbit">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="service-node" 
                style={{ '--angle': `${s.angle}deg` }}
              >
                <div className="service-circle upright">
                  <div className="icon-wrapper">{s.icon}</div>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}
            <div className="dashed-ring"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;