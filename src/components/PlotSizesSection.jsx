import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function PlotSizesSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const Plots = project.Plots;
  const [activeImage, setActiveImage] = useState('day');

  if (!Plots) return null;

  return (
    <section className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">AVAILABLE PLOT DIMENSIONS</span>
        <h2 className="er_section-h2">{project.shortName} Villa &amp; Plot Sizes</h2>
        <div className="er_gold-line"></div>
        <p className="er_section-desc">
          {Plots.description}
        </p>
      </div>

      {Plots.type === 'grid' && Plots.list && (
        <div className="er_Plots -grid">
          {Plots.list.map((plot, idx) => (
            <div key={idx} className="er_plot-card">
              <div className="er_plot-header">
                <span className="er_plot-badge">{plot.badge}</span>
                <i className={`fas ${plot.icon} er_plot-icon`}></i>
              </div>
              <h3 className="er_plot-size">{plot.sqft}</h3>
              <p className="er_plot-desc">{plot.desc}</p>
              <ul className="er_plot-features">
                <li><i className="fas fa-check-circle"></i> {project.approvalBadge}</li>
                <li><i className="fas fa-check-circle"></i> Ready for Immediate Registration</li>
                <li><i className="fas fa-check-circle"></i> Individual Water &amp; Power Points</li>
              </ul>
              <button className="er_plot-btn" onClick={() => onOpenBrochure && onOpenBrochure(`Plot Size: ${plot.sqft} (${plot.size}) - Request Price List`)}>
                <span>Request Price List</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {Plots.type === 'premium-card' && (
        <div className="er_premium-plot-card">
          <div className="er_premium-plot-image-container">
            <img
              src={activeImage === 'day' ? Plots.imageDay : Plots.imageNight}
              alt={`${project.shortName} Villa Elevation ${activeImage === 'day' ? 'Day' : 'Night'} View`}
              className="er_premium-plot-image"
            />
            <div className="er_premium-image-toggles">
              <button
                className={`er_toggle-btn ${activeImage === 'day' ? 'active' : ''}`}
                onClick={() => setActiveImage('day')}
              >
                Day View
              </button>
              <button
                className={`er_toggle-btn ${activeImage === 'night' ? 'active' : ''}`}
                onClick={() => setActiveImage('night')}
              >
                Night View
              </button>
            </div>
            <div className="er_premium-image-caption">
              {project.shortName} Villa Elevation {activeImage === 'day' ? 'Day' : 'Night'} View
            </div>
          </div>

          <div className="er_premium-plot-content">
            <div className="er_plot-header">
              <span className="er_plot-badge">{Plots.badge}</span>
              <i className={`fas ${Plots.icon} er_plot-icon`}></i>
            </div>
            <h3 className="er_plot-size" style={{ fontSize: '1.8rem', marginTop: '1rem', color: 'var(--primary-color)' }}>
              {Plots.cardTitle}
            </h3>
            <p className="er_plot-desc" style={{ fontSize: '1rem', lineHeight: '1.6', marginTop: '1rem' }}>
              {Plots.cardDesc}
            </p>
            <ul className="er_plot-features" style={{ marginTop: '1.5rem' }}>
              <li><i className="fas fa-check-circle"></i> {project.approvalBadge}</li>
              <li><i className="fas fa-check-circle"></i> Ready for Immediate Registration</li>
              <li><i className="fas fa-check-circle"></i> Premium Amenities Access</li>
              <li><i className="fas fa-check-circle"></i> Custom Floor Plans Available</li>
            </ul>
            <button
              className="er_plot-btn"
              style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
              onClick={() => onOpenBrochure && onOpenBrochure(`${Plots.cardTitle} - Request Price List`)}
            >
              <span>Request Price List</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
