import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function Header({ onOpenModal }) {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { shortName, basePath } = useProjectContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', sectionId: 'er_about' },
    { label: `${shortName} Plots`, sectionId: 'er_plots' },
    { label: 'Project Highlights', sectionId: 'er_highlights' },
    { label: 'Amenities', sectionId: 'er_amenities' },
    { label: 'Location & Connectivity', sectionId: 'er_location' },
    { label: 'Book Site Visit', sectionId: 'er_enquiry' },
  ];

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuActive(false);

    if (sectionId === 'er_enquiry') {
      if (window.innerWidth <= 991 && typeof onOpenModal === 'function') {
        onOpenModal('Header Menu - Book Free Site Visit');
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
        onOpenModal('Header Menu - Book Free Site Visit');
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
    setMenuActive(false);
    const heroEl = document.getElementById('er_hero') || document.getElementById('er_page');
    if (heroEl) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', `${basePath}/`);
    } else {
      navigate(`${basePath}/`);
    }
  };

  return (
    <>
      <header className={`gp_custom-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="gp_header-inner">
          <div className="gp_logo">
            <a href={`${basePath}/`} onClick={handleLogoClick}>
              <img
                src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
                alt="Guru Punvaanii Logo"
              />
            </a>
          </div>

          <button
            className="gp_menu-toggle"
            aria-label="Menu Toggle"
            onClick={() => setMenuActive(true)}
          >
            <span className="gp_hamburger-icon">
              <span className="gp_bar gp_bar-top"></span>
              <span className="gp_bar gp_bar-mid"></span>
              <span className="gp_bar gp_bar-bot"></span>
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`gp_menu-backdrop ${menuActive ? 'active' : ''}`}
        onClick={() => setMenuActive(false)}
      ></div>

      {/* Mobile Drawer Menu */}
      <div className={`gp_mobile-modal ${menuActive ? 'active' : ''}`}>
        <button
          className="gp_mobile-close"
          aria-label="Close Menu"
          onClick={() => setMenuActive(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="gp_mobile-modal-inner">
          <ul className="gp_mobile-menu">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <a
                  href={`#${item.sectionId}`}
                  className="gp_m-link"
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="gp_mobile-social">
            <span aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </span>
            <span aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span aria-label="Youtube">
              <i className="fab fa-youtube"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
