import React, { useEffect } from 'react';
import './LegalPages.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-container">
      <div className="legal-glass-card">
        <h1>Terms of <span className="highlight">Service</span></h1>
        <p className="last-updated">Last Updated: April 2026</p>

        <section>
          <h2>1. Service Authorization</h2>
          <p>By requesting a lockout service, you certify that you are the legal owner or authorized occupant of the property or vehicle. We reserve the right to request valid ID and proof of ownership before performing any work.</p>
        </section>

        <section>
          <h2>2. Emergency Call-Out Fees</h2>
          <p>A non-refundable call-out fee is applicable once a technician is dispatched. This fee covers our travel and administrative costs even if the service is cancelled upon arrival.</p>
        </section>

        <section>
          <h2>3. Estimates & Final Pricing</h2>
          <p>Quotes provided via phone or chat are estimates based on your description. Final pricing may vary depending on the specific lock hardware, security level, and time on site.</p>
        </section>

        <section>
          <h2>4. Liability</h2>
          <p>Your Key Provider is not responsible for damage caused by pre-existing lock failures or for minor cosmetic wear resulting from non-destructive entry attempts.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;