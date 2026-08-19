import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function Header({ onOpenModal }) {
  const [menuActive, setMenuActive] = useState(false);
  const { pathname } = useLocation();
  const { shortName, basePath } = useProjectContext();

  const navLinks = [
    { label: 'About Us', path: `${basePath}/` },
    { label: `${shortName} Plots `, path: `${basePath}/villa-Plots ` },
    { label: 'Project Highlights', path: `${basePath}/project-highlights` },
    { label: 'Location & Connectivity', path: `${basePath}/location` },
    { label: 'Book Site Visit', path: `${basePath}/book-site-visit` },
  ];

  const isLinkActive = (targetPath) => {
    const cleanTarget = targetPath.replace(/\/$/, '');
    const cleanPathname = pathname.replace(/\/$/, '');
    const cleanBase = basePath.replace(/\/$/, '');

    if (cleanTarget === cleanBase) {
      return cleanPathname === cleanBase;
    }
    return cleanPathname === cleanTarget || cleanPathname.startsWith(cleanTarget + '/');
  };

  return (
    <>
      <header className="gp_custom-header">
        <div className="gp_header-inner">
          <div className="gp_logo">
            <Link to={`${basePath}/`}>
              <img
                src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
                alt="Guru Punvaanii Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          {/* <nav className="gp_desktop-nav-wrap">
            <ul className="gp_menu">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`gp_menu-link ${isLinkActive(item.path) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}

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
                <Link
                  to={item.path}
                  className={`gp_m-link ${isLinkActive(item.path) ? 'active' : ''}`}
                  onClick={() => setMenuActive(false)}
                >
                  {item.label}
                </Link>
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
