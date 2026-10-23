import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function Footer({ onOpenModal, onOpenSiteVisit }) {
  const { basePath, isElegance, isMainLanding } = useProjectContext();
  const navigate = useNavigate();
  const phoneNumber = isElegance ? '7676000909' : '9008347898';
  const displayPhone = isElegance ? '7676 000 909' : '9008 3478 98';

  const handleNavClick = (e, sectionId, path) => {
    e.preventDefault();

    if (path) {
      navigate(path);
      return;
    }

    if (sectionId === 'er_enquiry' || sectionId === 'gp_promo') {
      if (typeof onOpenSiteVisit === 'function') {
        onOpenSiteVisit('Footer - Book Free Site Visit');
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
      if (isMainLanding) {
        navigate(`/#${sectionId}`);
      } else {
        navigate(`${basePath}/#${sectionId}`);
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isMainLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    } else {
      navigate('/');
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
            <a href="/" onClick={handleLogoClick}>
              <img
                src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
                alt="Guru Punvaanii Logo"
              />
            </a>
          </div>
          <p className="gp_footer-desc">
            We welcome you to visit Guru Punvaanii Properties. We are here to provide clear, honest guidance at every step of your real estate journey.
          </p>
          <div className="gp_footer-socials">
            <span aria-label="Facebook"><i className="fab fa-facebook-f"></i></span>
            <span aria-label="Twitter"><i className="fab fa-twitter"></i></span>
            <span aria-label="Instagram"><i className="fab fa-instagram"></i></span>
            <span aria-label="Youtube"><i className="fab fa-youtube"></i></span>
          </div>
        </div>

        {/* Column 2: Projects Sitelinks */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Our Projects</h3>
          <ul className="gp_footer-links">
            <li><a href="/eka/" onClick={(e) => handleNavClick(e, null, '/eka/')}> EKA (Anekal)</a></li>
            <li><a href="/exotica/" onClick={(e) => handleNavClick(e, null, '/exotica/')}> Exotica (Attibele)</a></li>
            <li><a href="/ernika/" onClick={(e) => handleNavClick(e, null, '/ernika/')}> Ernika (Anekal)</a></li>
            <li><a href="/eureka/" onClick={(e) => handleNavClick(e, null, '/eureka/')}> Eureka (Bidadi)</a></li>
            <li><a href="/shyam-residency/" onClick={(e) => handleNavClick(e, null, '/shyam-residency/')}>Shyam Residency (Magadi Rd)</a></li>
            <li><a href="/elegance/" onClick={(e) => handleNavClick(e, null, '/elegance/')}> Elegance (Bidadi)</a></li>
          </ul>
        </div>

        {/* Column 3: Quick Navigation */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Quick Links</h3>
          <ul className="gp_footer-links">
            {isMainLanding ? (
              <>
                <li><a href="#gp_projects" onClick={(e) => handleNavClick(e, 'gp_projects')}>Featured Projects</a></li>
                <li><a href="#gp_about" onClick={(e) => handleNavClick(e, 'gp_about')}>About Guru Punvaanii</a></li>
                <li><a href="#gp_growth" onClick={(e) => handleNavClick(e, 'gp_growth')}>Our Growth &amp; Offerings</a></li>
                <li><a href="#gp_why_us" onClick={(e) => handleNavClick(e, 'gp_why_us')}>Why Choose Us</a></li>
                <li><a href="#gp_reviews" onClick={(e) => handleNavClick(e, 'gp_reviews')}>Customer Reviews</a></li>
                <li><a href="#gp_faqs" onClick={(e) => handleNavClick(e, 'gp_faqs')}>Frequently Asked Questions</a></li>
                <li><a href="#gp_promo" onClick={(e) => handleNavClick(e, 'gp_promo')}>Book VIP Site Visit</a></li>
                <li><a href="#gp_contact" onClick={(e) => handleNavClick(e, 'gp_contact')}>Contact Us</a></li>
              </>
            ) : (
              <>
                <li><a href="#er_about" onClick={(e) => handleNavClick(e, 'er_about')}>Overview</a></li>
                <li><a href="#er_plots" onClick={(e) => handleNavClick(e, 'er_plots')}>Premium Villa Plots</a></li>
                <li><a href="#er_highlights" onClick={(e) => handleNavClick(e, 'er_highlights')}>Project Highlights</a></li>
                <li><a href="#er_amenities" onClick={(e) => handleNavClick(e, 'er_amenities')}>Amenities</a></li>
                <li><a href="#er_location" onClick={(e) => handleNavClick(e, 'er_location')}>Location &amp; Connectivity</a></li>
                <li><a href="#er_enquiry" onClick={(e) => handleNavClick(e, 'er_enquiry')}>Book Free Site Visit</a></li>
              </>
            )}
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
            <span>+91 8546 8546 00 / +91 7676 000 909</span>
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
