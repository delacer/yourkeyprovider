import React, { useEffect } from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-container">
      <div className="legal-glass-card">
        <h1>Privacy <span className="highlight">Policy</span></h1>
        <p className="last-updated">Last Updated: April 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>Your Key Provider ("we," "our," or "us") is committed to protecting your privacy. This policy explains how we collect and use your data in compliance with the South African POPI Act.</p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Contact details (Name, email, phone number).</li>
            <li>Physical location/address (to provide locksmith services).</li>
            <li>Vehicle or property details related to the service request.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>We use your information to dispatch technicians, provide accurate quotes, and process payments. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2>4. POPI Act Compliance</h2>
          <p>As a South African service provider, we adhere to the Protection of Personal Information Act. You have the right to request access to or deletion of your personal data at any time.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;