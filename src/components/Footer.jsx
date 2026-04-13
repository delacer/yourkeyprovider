import React from 'react';
import { Link } from 'react-router-dom';
import { Key, Phone, Mail, MapPin} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceAreas = [
    "Kuilsriver", "Stellenbosch", "Bellville", "Durbanville", 
    "Brackenfell", "Cape Town CBD", "Somerset West", "Strand", "Kraaifontein"
  ];

  return (
    <footer className="main-footer" aria-label="Site Footer">
      <div className="footer-top-row">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Key size={24} className="blue-text" aria-hidden="true" />
            <div className="brand-text-stack">
              <span className="brand-name">YOUR KEY PROVIDER</span>
              <span className="brand-tagline">LOCKSMITHS</span>
            </div>
          </div>
          <p className="footer-bio">
            <strong>Your Key Provider Locksmiths</strong> is a premier 24/7 mobile security service. 
            We specialize in emergency lockouts and automotive key programming across the <strong>Western Cape</strong>.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=61574277035140" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.tiktok.com/@your.key.provider?_r=1&_t=ZS-95RIKjxKLx6" target="_blank" rel="noreferrer" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href="mailto:mutakwastephen@gmail.com" aria-label="Email Us">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigation</h4>
          <nav aria-label="Footer Navigation">
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>
              <a href="tel:+27837659945" className="footer-contact-link">
                <Phone size={18} className="blue-text" aria-hidden="true" /> +27 83 765 9945
              </a>
            </li>
            <li>
              <a href="mailto:mutakwastephen@gmail.com" className="footer-contact-link">
                <Mail size={18} className="blue-text" aria-hidden="true" /> mutakwastephen@gmail.com
              </a>
            </li>
            <li className="location-item">
              <MapPin size={18} className="blue-text" aria-hidden="true" /> 
              <span>36 Hester Sreet, Kuilsriver, Cape Town</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-middle-row">
        <div className="footer-col">
          <h4>Service Areas</h4>
          <ul className="area-list">
            {serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Your Key Provider. All Rights Reserved.</p>
        <div className="bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;