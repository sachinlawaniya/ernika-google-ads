import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function Footer({ onOpenModal }) {
  const { basePath, isElegance } = useProjectContext();
  const navigate = useNavigate();
  const phoneNumber = isElegance ? '7676000909' : '9008347898';
  const displayPhone = isElegance ? '7676 000 909' : '9008 3478 98';

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    if (sectionId === 'er_enquiry') {
      if (window.innerWidth <= 991 && typeof onOpenModal === 'function') {
        onOpenModal('Footer - Book Free Site Visit');
        return;
      }
      const element = document.getElementById('er_enquiry') || document.querySelector('.er_sticky-sidebar-col');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const input = element.querySelector('input');
        if (input) setTimeout(() => input.focus(), 500);
        window.history.replaceState(null, '', `#${sectionId}`);
        return;
      }
      if (typeof onOpenModal === 'function') {
        onOpenModal('Footer - Book Free Site Visit');
        return;
      }
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      navigate(`${basePath}/#${sectionId}`);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const heroEl = document.getElementById('er_hero') || document.getElementById('er_page');
    if (heroEl) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', `${basePath}/`);
    } else {
      navigate(`${basePath}/`);
    }
  };

  return (
    <footer className="gp_footer">
      <div className="gp_footer-top">
        <h2 className="gp_footer-headline">Connecting You to Better Living</h2>
      </div>

      <div className="gp_footer-content">
        {/* Column 1: Brand Info */}
        <div className="gp_footer-col gp_footer-brand">
          <div className="gp_footer-logo">
            <a href={`${basePath}/`} onClick={handleLogoClick}>
              <img
                src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
                alt="Guru Punvaanii Logo"
              />
            </a>
          </div>
          <p className="gp_footer-desc">
            We welcome you to visit Guru Punvaanii. We are here to provide clear, honest guidance at every step of your real estate journey.
          </p>
          <div className="gp_footer-socials">
            <span aria-label="Facebook"><i className="fab fa-facebook-f"></i></span>
            <span aria-label="Twitter"><i className="fab fa-twitter"></i></span>
            <span aria-label="Instagram"><i className="fab fa-instagram"></i></span>
            <span aria-label="Youtube"><i className="fab fa-youtube"></i></span>
          </div>
        </div>

        {/* Column 2: Google Ads Sitelinks */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Quick Links</h3>
          <ul className="gp_footer-links">
            <li><a href="#er_about" onClick={(e) => handleNavClick(e, 'er_about')}>Overview</a></li>
            <li><a href="#er_plots" onClick={(e) => handleNavClick(e, 'er_plots')}>Premium Villa Plots</a></li>
            <li><a href="#er_highlights" onClick={(e) => handleNavClick(e, 'er_highlights')}>Project Highlights</a></li>
            <li><a href="#er_amenities" onClick={(e) => handleNavClick(e, 'er_amenities')}>World-Class Amenities</a></li>
            <li><a href="#er_location" onClick={(e) => handleNavClick(e, 'er_location')}>Location &amp; Connectivity</a></li>
            <li><a href="#er_enquiry" onClick={(e) => handleNavClick(e, 'er_enquiry')}>Book Free Site Visit</a></li>
          </ul>
        </div>

        {/* Column 4: Head Office Location */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Head Office Location</h3>
          <div className="gp_footer-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>9th Avenue, #14, 3rd cross, 1st Floor, N S Iyengar, Road, Kumara Park West, Seshadripuram,Bengaluru, Karnataka 560020</span>
          </div>
          <div className="gp_footer-info-item">
            <i className="fas fa-phone-alt"></i>
            <span>{displayPhone}</span>
          </div>
          <div className="gp_footer-info-item">
            <i className="fas fa-clock"></i>
            <span>Mon - Sat : 10:00 AM - 06:00 PM</span>
          </div>
        </div>

        {/* Column 5: Branch Office Location */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Branch Office Location</h3>
          <div className="gp_footer-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>2nd floor, Guru Punvaanii Pvt Ltd, No 2, Kaushal Emerald, opposite Gandhi Bhavan, Kumara Park West, Bengaluru, Karnataka 560001</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="gp_footer-bottom">
        <p>@2026. All rights reserved Guru Punvaanii</p>
      </div>
    </footer>
  );
}
