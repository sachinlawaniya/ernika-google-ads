import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ onOpenModal }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <header className="gp_custom-header">
        <div className="gp_header-inner">
          <div className="gp_logo">
            <Link to="/ernika/">
              <img
                src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
                alt="Guru Punvaanii Logo"
              />
            </Link>
          </div>

          <button
            className="gp_menu-toggle"
            aria-label="Menu Toggle"
            onClick={() => setMenuActive(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`gp_menu-backdrop ${menuActive ? 'active' : ''}`}
        onClick={() => setMenuActive(false)}
      ></div>

      {/* Compact Right Side Menu Drawer */}
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
            <li><Link to="/ernika/" className="gp_m-link" onClick={() => setMenuActive(false)}>Overview</Link></li>
            <li><Link to="/ernika/villa-plots" className="gp_m-link" onClick={() => setMenuActive(false)}>Villa Plots</Link></li>
            <li><Link to="/ernika/project-highlights" className="gp_m-link" onClick={() => setMenuActive(false)}>Project Highlights</Link></li>
            <li><Link to="/ernika/location" className="gp_m-link" onClick={() => setMenuActive(false)}>Location &amp; Connectivity</Link></li>
            <li><Link to="/ernika/book-site-visit" className="gp_m-link" onClick={() => setMenuActive(false)}>Book Free Site Visit</Link></li>
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
