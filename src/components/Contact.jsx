import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'; 
import { useLocation } from 'react-router-dom';
import './Contact.css';
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight, Loader2 } from 'lucide-react';

const Contact = () => {
  const reactLocation = useLocation(); // Renamed to avoid the global conflict
const isContactPage = reactLocation.pathname === '/contact';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Track success status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Hide success message if they start typing again
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('https://yourkeyprovider-dashboard.vercel.app/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          service: formData.subject,
          urgency: formData.subject === "Commercial Quote" ? "High" : "Normal",
          location: "Website Inquiry",
          message: formData.message
        }),
      });

      if (response.ok) {
        setSuccess(true); // Trigger success UI
        // Clear the form fields
        setFormData({ 
          firstName: '', 
          lastName: '', 
          phone: '', 
          email: '', 
          subject: 'General Inquiry', 
          message: '' 
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Could not connect to the service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "name": "Your Key Provider Locksmiths",
    "description": "Contact our expert locksmith team in Cape Town for emergency lockouts, residential security, and commercial quotes.",
    "url": "https://yourkeyprovider.netlify.app/contact",
    "telephone": "+27837659945",
    "email": "mutakwastephen@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "36 Hester Street Kuilsriver",
      "addressRegion": "Cape Town",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.9284, 
      "longitude": 18.6771
    },
    "openingHours": "Mo-Su 00:00-23:59"
  };

  return (
    <>
      {isContactPage && (
        <Helmet>
          <title>Contact Us | Emergency Locksmith Cape Town & Kuilsriver</title>
          <meta name="description" content="Contact Your Key Provider Locksmiths for 24/7 emergency service..." />
          <link rel="canonical" href="https://yourkeyprovider.netlify.app/contact" />
          <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        </Helmet>
      )}
    <div className="contact-page">
      <div className="bg-glow-bottom"></div>
      
      <div className="contact-container">
        <div className="contact-info">
          <span className="contact-badge">GET IN TOUCH</span>
          <h2 className="contact-title">
            We’re Here to <br/>
            <span>Help You Secure</span> What Matters.
          </h2>
          <p className="contact-subtitle">
            Have a question about our security systems or need a custom quote? 
            Our team is available 24/7 for emergency dispatch and consultations.
          </p>

          <div className="contact-cards-grid">
            <div className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-text">
                <h4>Call Support</h4>
                <p>+27837659945</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h4>Email Us</h4>
                <p>mutakwastephen@gmail.com</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div className="info-text">
                <h4>Visit HQ</h4>
                <p>36 Hester St Kuilsriver, Cape Town, SA</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <div className="info-text">
                <h4>Working Hours</h4>
                <p>24/7 Emergency Service</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form-card">
          <div className="form-header">
            <MessageSquare size={24} className="blue-text" />
            <h3>Send a Message</h3>
          </div>

          <form className="modern-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-field">
                <label>First Name</label>
                <input 
                  name="firstName" 
                  type="text" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="John" 
                  required 
                />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input 
                  name="lastName" 
                  type="text" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Doe" 
                  required 
                />
              </div>
            </div>
            <div className="input-field">
              <label>Phone Number</label>
              <input 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="083 765 9945" 
                required 
              />
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <input 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="john@example.com" 
                required 
              />
            </div>

            <div className="input-field">
              <label>Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange}>
                <option>General Inquiry</option>
                <option>Commercial Quote</option>
                <option>Emergency Locksmith</option>
                <option>Residential Security</option>
              </select>
            </div>

            <div className="input-field">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="How can we help you?" 
                rows="4" 
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            {success && (
            <div className="success-banner">
              <p>✅ Success! Your request has been sent to our team.</p>
            </div>
          )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;