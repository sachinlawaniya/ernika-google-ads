import React, { useState } from 'react';

export default function LocationSection() {
  const [activeTab, setActiveTab] = useState('proximity');

  return (
    <section id="er_location" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">LOCATION &amp; PROXIMITY</span>
        <h2 className="er_section-h2">Location Highlights</h2>
        <div className="er_gold-line"></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button
          className={`er_btn-sm ${activeTab === 'proximity' ? '' : 'outline'}`}
          style={{
            background: activeTab === 'proximity' ? 'var(--er-gold)' : '#f1f5f9',
            color: activeTab === 'proximity' ? '#fff' : '#334155',
            boxShadow: activeTab === 'proximity' ? '0 4px 12px rgba(197,139,45,0.25)' : 'none',
          }}
          onClick={() => setActiveTab('proximity')}
        >
          Proximity Map
        </button>
        <button
          className={`er_btn-sm ${activeTab === 'map' ? '' : 'outline'}`}
          style={{
            background: activeTab === 'map' ? 'var(--er-gold)' : '#f1f5f9',
            color: activeTab === 'map' ? '#fff' : '#334155',
            boxShadow: activeTab === 'map' ? '0 4px 12px rgba(197,139,45,0.25)' : 'none',
          }}
          onClick={() => setActiveTab('map')}
        >
          Google Map
        </button>
      </div>

      {activeTab === 'proximity' ? (
        <div className="er_proximity-iframe-wrap">
          <iframe
            src="https://ernika-proximities.gurupunvaanii.com/"
            scrolling="no"
            allowFullScreen
            loading="lazy"
            title="Ernika Proximity Map"
          ></iframe>
          <a
            href="#er_location"
            className="er_proximity-open-btn"
            title="Proximity Map"
          >
            <span>Proximity Map</span>
            <i className="fas fa-map-marker-alt"></i>
          </a>
        </div>
      ) : (
        <div className="er_proximity-iframe-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.1269080098796!2d77.7129444!3d12.7051389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6f00055baf67%3A0x51603bc8349823aa!2sGuru%20Punvaanii%20Ernika!5e0!3m2!1sen!2sin!4v1779394976906!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ernika Location Map"
            style={{ width: '100%', height: '100%', border: 0 }}
          ></iframe>
        </div>
      )}
    </section>
  );
}
