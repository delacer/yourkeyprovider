import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import Services from "./components/Services"; 
import About from "./components/About";
import Contact from "./components/Contact";
import Appointment from "./components/Appointment";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Gallery from './components/Gallery';
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div style={{ padding: "100px 20px", textAlign: "center" }}>
    <h1>404 - Key Not Found</h1>
    <p>It looks like the page you're looking for has been locked away or moved.</p>
    <a href="/" className="cta" style={{ display: 'inline-block', marginTop: '20px' }}>Return to Home</a>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Helmet>
          <html lang="en-ZA" /> 
          <meta name="geo.region" content="ZA-WC" />
          <meta name="geo.placename" content="Cape Town" />
          <meta name="geo.position" content="-33.9249;18.4241" />
          <meta name="ICBM" content="-33.9249, 18.4241" />
          <meta name="author" content="Your Key Provider Locksmiths" />
        </Helmet>

        <div className="app-container">
          <Navbar />
          
          <main id="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <section id="home">
                    <Hero />
                  </section>
                  
                  <section id="services-preview" className="section-padding">
                    <ServiceCard />
                  </section>

                  <section id="testimonial" className="section-padding">
                    <Testimonials />
                  </section>
                  <section id="gallery" className="section-padding">
                    <Gallery />
                  </section>


                  <section id="contact-home" className="section-padding">
                    <Contact />
                  </section>
                </>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;