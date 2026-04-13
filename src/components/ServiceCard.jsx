import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';
import { ShieldCheck, Key, Hammer, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Residential Rekey",
    description: "Secure your home by changing internal lock pins. Ideal for new homeowners or lost keys.",
    features: ["Existing hardware stays", "Includes 2 new keys", "Security audit included"],
    icon: ShieldCheck,
    isEmergency: false
  },
  {
    id: 2,
    title: "Emergency Lockout",
    description: "Stuck outside? Our rapid response mobile units provide damage-free entry 24/7.",
    features: ["20-min average arrival", "Non-destructive entry", "Available 24/7/365"],
    icon: Key,
    isEmergency: true
  },
  {
    id: 3,
    title: "Commercial Systems",
    description: "Advanced security for businesses, including master keys and high-security hardware.",
    features: ["Access control setup", "ADA compliance check", "Bulk hardware discounts"],
    icon: Hammer,
    isEmergency: false
  }
];

const ServiceCard = () => {
  const navigate = useNavigate();

  const handleAction = (isEmergency) => {
    if (isEmergency) {
      window.location.href = 'tel:+27837659945';
    } else {
      navigate('/appointment');
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <span className="section-subtitle">OUR EXPERTISE</span>
        <h2 className="section-title">
          Professional <span className="highlight">Security Solutions</span>
        </h2>
        <p className="section-desc">
          From emergency lockouts to complex commercial installations, 
          we provide elite locksmithing services with precision and speed.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className={`card ${service.isEmergency ? 'is-emergency' : ''}`}
          >
            <div className="card-header">
              <div className="icon-box">
                <service.icon size={28} />
              </div>
              {service.isEmergency && <span className="badge">Priority</span>}
            </div>

            <div className="card-content">
              <h3 className="card-title">{service.title}</h3>
              <p className="card-text">{service.description}</p>
              
              <ul className="feature-list">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <CheckCircle2 size={16} className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              className="card-btn" 
              onClick={() => handleAction(service.isEmergency)}
            >
              {service.isEmergency ? 'Call Dispatch Now' : 'Book Appointment'}
              <ArrowRight size={18} className="btn-arrow" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCard;