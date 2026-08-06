import React from 'react';

export default function AboutSection({ onOpenBrochure }) {
  return (
    <section id="er_about" className="er_intro er_section">
      <div className="er_container er_intro-grid">
       
        <div className="er_intro-text">
          <h2>Ernika: Amazon-Themed Villa Plots in Anekal</h2>
          <p>
            Guru Punvaanii brings you Bengaluru's first Amazon Forest-themed premium villa plots in Anekal, Bengaluru. With 220 BMRDA-approved plots across 12.5 acres, the layout here was designed around trees and open corridors, so you can share the same air as the forest.
          </p>
          <p>
            At Ernika by <a href="#er_about">Guru Punvaanii</a>, we believe that you should not have to choose between calm and convenience. Keeping that in mind, this neighbourhood keeps you close to schools, hospitals, and everyday city life. This way, you will be surrounded by the greens for quiet and peace, while also connected to the main city for your everyday needs.
          </p>
          <ul className="er_feature-bullets">
            <li><i className="fas fa-check-circle"></i> 220 BMRDA-approved villa plots across 12.5 acres</li>
            <li><i className="fas fa-check-circle"></i> Bengaluru's First Amazon Forest-Themed Project</li>
            <li><i className="fas fa-check-circle"></i> A to Z Amenities - (26+ Amenities)</li>
            <li><i className="fas fa-check-circle"></i> RC Roads &amp; Underground Utilities</li>
            <li><i className="fas fa-check-circle"></i> Prime Location in Anekal, Bengaluru</li>
          </ul>
          <div>
            <button className="er_btn-sm" type="button" onClick={onOpenBrochure}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
         <div className="er_intro-image">
          <img
            src="https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg"
            alt="Ernika entrance arch"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
