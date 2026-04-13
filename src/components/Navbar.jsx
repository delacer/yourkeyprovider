import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Key } from 'lucide-react';
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourkeyprovider.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": location.pathname.split('/')[1] || "Current",
        "item": `https://yourkeyprovider.com${location.pathname}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

    <nav className="navbar">
      <Link to="/" className="brand-container">
  <div className="logo-icon-wrapper">
    <Key size={28} className="nav-icon" />
  </div>
  <div className="brand-text">
    <span className="company-name">
      YOUR <span className="highlight">KEY</span> PROVIDER
    </span>
    <span className="company-tagline">LOCKSMITHS</span>
  </div>
</Link>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/services" onClick={toggleMenu}>Services</Link>
        </li>
        <li>
          <Link to="/appointment" onClick={toggleMenu}>Booking</Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleMenu}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </li>
      </ul>
      <a href="tel:+27837659945" className="cta">Call Now</a>
    </nav>
    </>
  );
};

export default Navbar;