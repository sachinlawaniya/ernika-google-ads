import React from 'react';

export default function Footer() {
  return (
    <footer className="gp_footer">
      <div className="gp_footer-top">
        <h2 className="gp_footer-headline">Connecting You to Better Living</h2>
      </div>

      <div className="gp_footer-content">
        {/* Column 1: Brand Info */}
        <div className="gp_footer-col gp_footer-brand">
          <div className="gp_footer-logo">
            <img
              src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png"
              alt="Guru Punvaanii Logo"
            />
          </div>
          <p className="gp_footer-desc">
            We welcome you to visit Guru Punvaanii. We are here to provide clear, honest guidance at every step of your real estate journey.
          </p>
          <div className="gp_footer-socials">
            <span aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </span>
            <span aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </span>
            <span aria-label="Youtube">
              <i className="fab fa-youtube"></i>
            </span>
          </div>
        </div>

        {/* Column 2: Project Pages */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Project Pages</h3>
          <ul className="gp_footer-links">
            <li><span>Elegance</span></li>
            <li><span>Eka</span></li>
            <li><span>Exotica</span></li>
            <li><span>Ernika</span></li>
            <li><span>Eureka</span></li>
            <li><span>Etasha</span></li>
            <li><span>Shyam Residency</span></li>
            <li><span>SPN</span></li>
            <li><span>Ekansh</span></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="gp_footer-col">
          <h3 className="gp_footer-title">Quick Links</h3>
          <ul className="gp_footer-links">
            <li><span>Our Projects</span></li>
            <li><span>About Us</span></li>
            <li><span>Privacy Policy</span></li>
            <li><span>Terms of Service</span></li>
            <li><span>FAQ</span></li>
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
            <span>8546 8546 00</span>
          </div>
          <div className="gp_footer-info-item">
            <i className="fas fa-phone-alt"></i>
            <span>7676 000 909</span>
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
