import React from 'react';
import { Helmet } from 'react-helmet-async'; // SEO Requirement
import './About.css';
import { ShieldCheck, Wrench, Users, Award, CheckCircle2 } from 'lucide-react';

const About = () => {
  // --- SEO ORGANIZATION SCHEMA ---
  // This tells Google your business is an established authority with 14 years of experience.
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "name": "Your Key Provider Locksmiths",
    "foundingDate": "2012", // Based on 14 years experience
    "description": "Your Key Provider Locksmiths offers professional security solutions in Cape Town. With over 14 years of experience and 50,000 successful entries, we are the trusted choice for residential and commercial security.",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -33.9249,
        "longitude": 18.4241
      },
      "geoRadius": "50000"
    },
    "knowsAbout": ["Locksmithing", "Smart Lock Installation", "Car Key Programming", "Emergency Lockouts"],
    "award": "Certified Professional Security Provider"
  };

  return (
    <>
      <Helmet>
        <title>About Us | 14+ Years of Expert Locksmithing in Cape Town</title>
        <meta name="description" content="Learn about Your Key Provider Locksmiths. Over 14 years experience providing 24/7 emergency locksmith services and advanced security systems in South Africa." />
        <meta name="keywords" content="professional locksmith Cape Town, master key systems SA, car key programming experts" />
        <link rel="canonical" href="https://yourkeyprovider.netlify.app/about" />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
    <div className="about-page">
      {/* Section 1: Hero Story */}
      <section className="about-hero">
        <div className="about-content">
          <span className="section-subtitle">OUR STORY</span>
          <h1 className="about-title">
            Your Key Provider <br/>
            <span>Locksmiths</span>
          </h1>
          <p className="about-text">
            For over a decade, we’ve been the literal "key" to security in our community. 
            <strong> Your Key Provider Locksmiths</strong> was founded on a simple principle: 
            providing elite-level security with the personal touch of a neighbor. We don't just 
            fix locks; we build trust.
          </p>
          
          <div className="check-list">
            <div className="check-item"><CheckCircle2 size={18} /> Fully Licensed, Bonded & Insured</div>
            <div className="check-item"><CheckCircle2 size={18} /> Rapid 24/7 Mobile Dispatch</div>
            <div className="check-item"><CheckCircle2 size={18} /> Advanced Key-Cutting Technology</div>
          </div>
        </div>
        
        <div className="about-image-stack">
          <div className="image-main">
            <img src='/technic-team.webp' alt="Technical Team" />
            <div className="img-overlay-text">YKP LOCKSMITHS</div>
          </div>
          <div className="image-accent">
            <Award size={40} />
            <p>Certified Professional Security Provider</p>
          </div>
        </div>
      </section>

      {/* Section 2: Stats (The "Proof") */}
      <section className="stats-bar">
        <div className="stat-item">
          <h2>14+</h2>
          <p>Years Experience</p>
        </div>
        <div className="stat-item">
          <h2>50k+</h2>
          <p>Successful Entry</p>
        </div>
        <div className="stat-item">
          <h2>18min</h2>
          <p>Avg. Response</p>
        </div>
        <div className="stat-item">
          <h2>100%</h2>
          <p>Service Guarantee</p>
        </div>
      </section>

      {/* Section 3: Values */}
      <section className="values-section">
        <h2 className="values-heading"><span>Why choose us</span></h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="v-icon"><ShieldCheck size={32} /></div>
            <h3>Reliable Security</h3>
            <p>We supply and install top-tier hardware from brands you know, ensuring your property remains impenetrable.</p>
          </div>

          <div className="value-card">
            <div className="v-icon"><Wrench size={32} /></div>
            <h3>Precision Craft</h3>
            <p>From complex master key systems to automotive transponder keys, our precision is our signature.</p>
          </div>

          <div className="value-card">
            <div className="v-icon"><Users size={32} /></div>
            <h3>Local Commitment</h3>
            <p>We are your neighbors. Being local means we arrive faster and care more about the results we provide.</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;