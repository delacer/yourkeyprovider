import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import './Services.css';
import { Home, Building2, Car, ShieldAlert, CheckCircle } from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const navigate = useNavigate();

  const serviceData = {
    residential: {
      title: "Residential Locksmith",
      slug: "residential-locksmith-cape-town",
      icon: <Home size={32} />,
      desc: "Protecting your family and home in Cape Town with the latest in security hardware and smart technology.",
      items: ["Lock Rekeying", "Deadbolt Installation", "Smart Lock Setup", "Master Key Systems", "Emergency House Lockout", "Gate & Garage Locks"],
      image: "residential.webp"
    },
    commercial: {
      title: "Commercial Security",
      slug: "commercial-security-systems-south-africa",
      icon: <Building2 size={32} />,
      desc: "High-security solutions for businesses, offices, and industrial complexes across the Western Cape.",
      items: ["Access Control Systems", "Panic Bar Installation", "Master Key Design", "Electronic Strikes", "Safe & Vault Services", "Door Closer Repair"],
      image: "commercial.webp"
    },
    automotive: {
      title: "Automotive Services",
      slug: "car-key-locksmith-kuilsriver",
      icon: <Car size={32} />,
      desc: "24/7 mobile locksmithing for all makes and models. We come to you anywhere in Cape Town.",
      items: ["Car Key Replacement", "Transponder Programming", "Ignition Repair", "Key Fob Replacement", "Emergency Trunk Opening", "Laser Cut Keys"],
      image: "automotive.webp"
    }
  };
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Locksmith and Security Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Your Key Provider Locksmiths",
      "address": "36 Hester Street Kuilsriver, Cape Town, South Africa"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Locksmith Services",
      "itemListElement": Object.values(serviceData).map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.desc
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Professional Locksmith Services | Residential, Commercial & Auto</title>
        <meta name="description" content="Expert locksmith solutions in Cape Town. We specialize in residential rekeying, commercial access control, and automotive transponder programming." />
        <meta name="keywords" content="locksmith services Cape Town, car key replacement, commercial security Western Cape, 24/7 lockout" />
        <link rel="canonical" href="https://yourkeyprovider.netlify.app/services" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>
    <div className="services-page">
      <header className="services-header">
        <span className="badge">WHAT WE DO</span>
        <h1>Professional <span>Security Solutions</span></h1>
        <p>From emergency lockouts to advanced access control, we provide precision security for every situation.</p>
      </header>

      <div className="services-tabs">
        {Object.keys(serviceData).map((key) => (
          <button 
            key={key}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {serviceData[key].icon}
            {serviceData[key].title}
          </button>
        ))}
      </div>

      <div className="service-display-card">
        <div className="display-info">
          <div className="display-icon-large">{serviceData[activeTab].icon}</div>
          <h2>{serviceData[activeTab].title}</h2>
          <p>{serviceData[activeTab].desc}</p>
          
          <div className="service-list-grid">
            {serviceData[activeTab].items.map((item, idx) => (
              <div key={idx} className="list-item">
                <CheckCircle size={18} className="blue-text" />
                {item}
              </div>
            ))}
          </div>
          <button 
            className="service-cta-btn" 
            onClick={() => navigate('/appointment')}
          >
            Request a Quote
          </button>
        </div>

        <div className="display-image">
          <div className="image-box">
            <img 
              key={activeTab} 
              src={serviceData[activeTab].image} 
              alt={serviceData[activeTab].title} 
              className="service-main-img"
            />
            <span>{activeTab.toUpperCase()} EXPERTISE</span>
          </div>
        </div>
      </div>

      <section className="emergency-banner">
        <div className="banner-content">
          <ShieldAlert size={48} />
          <div>
            <h3>Locked out right now?</h3>
            <p>Our mobile units are dispatched 24/7. Average arrival time: 18 minutes.</p>
          </div>
        </div>
        <a href="tel:+27837659945" className="emergency-btn">Call +27837659945</a>
      </section>
    </div>
    </>
  );
};

export default Services;