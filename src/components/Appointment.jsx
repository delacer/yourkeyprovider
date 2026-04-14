import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import "./Appointment.css";
import { Calendar, Clock, MapPin, ShieldCheck, ChevronRight, AlertCircle, PhoneCall } from 'lucide-react';

const Appointment = () => {
  const [requestType, setRequestType] = useState('scheduled');
  
  const [formData, setFormData] = useState({
    service: 'Emergency House Lockout',
    name: '',
    phone: '',
    location: '',
    date: '',
    time: 'Morning (8am - 12pm)'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      clientName: formData.name,
      clientPhone: formData.phone,
      address: formData.location,
      serviceType: formData.service,
      status: requestType === 'emergency' ? 'urgent' : 'pending',
      scheduledTime: requestType === 'scheduled' 
        ? `${formData.date} ${formData.time}` 
        : new Date().toISOString()
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) throw new Error("Database sync failed");

      const whatsappNumber = "27837659945";
      const message = `*NEW ${requestType.toUpperCase()} REQUEST*%0a` +
                      `--------------------------%0a` +
                      `*Service:* ${formData.service}%0a` +
                      `*Name:* ${formData.name}%0a` +
                      `*Phone:* ${formData.phone}%0a` +
                      `*Location:* ${formData.location}%0a` +
                      (requestType === 'scheduled' 
                        ? `*Date:* ${formData.date}%0a*Time:* ${formData.time}` 
                        : `*Priority:* IMMEDIATE DISPATCH`);

      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    } catch (error) {
      console.error("Sync Error:", error);
      window.open(`https://wa.me/27837659945?text=Manual Inquiry from ${formData.name}`, '_blank');
    }
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "name": "Your Key Provider Locksmiths",
    "image": "https://yourkeyprovider.netlify.app/og-image.jpg", 
    "@id": "https://yourkeyprovider.netlify.app",
    "url": "https://yourkeyprovider.netlify.app",
    "telephone": "+27837659945",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cape Town",
      "addressRegion": "Western Cape",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.9249,
      "longitude": 18.4241
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <>
      <Helmet>
        <title>24/7 Emergency Locksmith | 18min Arrival | Your Key Provider</title>
        <meta name="description" content="Fast 24-hour locksmith services in Cape Town. Specialized in house lockouts, car key programming, and smart lock installation. Get help now." />
        <meta name="keywords" content="locksmith Cape Town, emergency locksmith, car lockout, house lockout, smart lock installation" />
        <link rel="canonical" href="https://yourkeyprovider.netlify.app/appointment" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="appt-page">
        <div className="appt-container">
          <aside className="appt-sidebar">
            <div className="brand-badge">Your Key Provider Locksmiths</div>
            <h2 className="appt-title">Fast Access to <br/><span>Expert Locksmiths</span></h2>
            <p className="appt-desc">Available 24/7 for emergencies. Our average arrival time is currently <strong>18 minutes</strong>.</p>
            
            <div className="benefit-list">
              <div className="benefit-item">
                <div className="b-icon"><ShieldCheck size={20} /></div>
                <span>Licensed & Fully Insured Technicians</span>
              </div>
              <div className="benefit-item">
                <div className="b-icon"><Clock size={20} /></div>
                <span>Transparent Pricing - No Hidden Fees</span>
              </div>
              <div className="benefit-item">
                <div className="b-icon"><MapPin size={20} /></div>
                <span>Local Service in your Neighborhood</span>
              </div>
            </div>
          </aside>

          <main className={`appt-form-wrapper ${requestType === 'emergency' ? 'emergency-mode' : ''}`}>
            <div className="mode-selector">
              <button 
                className={requestType === 'scheduled' ? 'active' : ''} 
                onClick={() => setRequestType('scheduled')}
              >
                <Calendar size={18} /> Regular Appointment
              </button>
              <button 
                className={requestType === 'emergency' ? 'active emergency' : ''} 
                onClick={() => setRequestType('emergency')}
              >
                <AlertCircle size={18} /> Emergency Dispatch
              </button>
            </div>

            <form className="appt-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <label>What service do you need?</label>
                <select name="service" className="service-select" onChange={handleChange}>
                  <optgroup label="Emergency (High Priority)">
                    <option>Emergency House Lockout</option>
                    <option>Emergency Car Lockout</option>
                    <option>Broken Key Extraction</option>
                  </optgroup>
                  <optgroup label="Residential & Smart Home">
                    <option>Smart Lock Installation</option>
                    <option>Re-keying Existing Locks</option>
                    <option>New Lock Installation</option>
                    <option>Mailbox / Gate Locks</option>
                  </optgroup>
                  <optgroup label="Automotive">
                    <option>Car Key Replacement</option>
                    <option>Ignition Repair</option>
                    <option>Transponder Programming</option>
                  </optgroup>
                  <optgroup label="Commercial">
                    <option>Master Key Systems</option>
                    <option>Panic Bar Installation</option>
                    <option>Access Control Systems</option>
                    <option>Safe Opening/Repair</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="e.g. Michael Smith" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="083 765 9945" required onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Service Location</label>
                <div className="input-with-icon">
                  <MapPin className="i-left" size={18} />
                  <input type="text" name="location" placeholder="Enter street address and city" required onChange={handleChange} />
                </div>
              </div>

              {requestType === 'scheduled' && (
                <div className="form-grid">
                  <div className="input-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date" onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Time Window</label>
                    <select name="time" onChange={handleChange}>
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 8pm)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="confirm-btn">
                  {requestType === 'emergency' ? 'DISPATCH NOW' : 'BOOK APPOINTMENT'}
                  <ChevronRight size={20} />
                </button>
                <a href="tel:+27837659945" className="call-instead">
                  <PhoneCall size={16} /> or Call 083 765 9945
                </a>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Appointment;