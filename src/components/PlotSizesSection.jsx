import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function PlotSizesSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const Plots = project.plots;
  const [activeImage, setActiveImage] = useState('day');

  if (!Plots) return null;

  return (
    <section id="er_plots" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">AVAILABLE PLOT DIMENSIONS</span>
        <h2 className="er_section-h2">{project.shortName} Villa &amp; Plot Sizes</h2>
        <div className="er_gold-line"></div>
        <p className="er_section-desc">
          {Plots.description}
        </p>
      </div>

      {Plots.type === 'grid' && Plots.list && Plots.list.length === 1 && (
        <div className="er_plot-single-showcase-wrap">
          {Plots.list.map((plot, idx) => (
            <div key={idx} className="er_plot-showcase-card">
              {/* Top Row: Tags & Location */}
              <div className="er_plot-sc-header">
                <div className="er_plot-sc-badge-group">
                  <span className="er_plot-sc-badge">
                    <i className="fas fa-crown"></i> {plot.badge || 'PREMIUM PLOTS'}
                  </span>
                </div>
                <div className="er_plot-sc-units-tag">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Main Content: 2-Column Split */}
              <div className="er_plot-sc-body">
                {/* Left Column: Dimensions & Chips */}
                <div className="er_plot-sc-left">
                  <div className="er_plot-sc-size-highlight">
                    <span className="er_plot-sc-label">AVAILABLE PLOT DIMENSIONS</span>
                    <h3 className="er_plot-sc-title">{plot.sqft || 'Various Plot Sizes Available'}</h3>
                    {plot.size && <p className="er_plot-sc-dims">{plot.size}</p>}
                  </div>

                  <p className="er_plot-sc-desc">{plot.desc}</p>

                  {/* Dimension Chips */}
                  <div className="er_plot-dimension-chips">
                    {(plot.dimensionChips || [
                      { size: '30 × 40 FT', sqft: '1,200 SqFt (3BHK)' },
                      { size: '30 × 50 FT', sqft: '1,500 SqFt (Duplex)' },
                      { size: '40 × 60 FT', sqft: '2,400 SqFt (Grand Villa)' },
                      { size: 'UNIQUE SIZE PLOTS', sqft: 'Custom Dimensions' }
                    ]).map((chip, cIdx) => (
                      <div key={cIdx} className="er_dimension-chip">
                        <span className="er_chip-size">{chip.size}</span>
                        <span className="er_chip-sqft">{chip.sqft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Highlights & CTA */}
                <div className="er_plot-sc-right">
                  <h4 className="er_plot-sc-features-title">
                    <i className="fas fa-star" style={{ color: '#c68a28' }}></i> Key Highlights &amp; Approvals
                  </h4>

                  <div className="er_plot-sc-features-grid">
                    {(plot.features || [
                      `${project.approvalBadge || 'GOVT'} Approved & Clear Legal Title`,
                      'Ready for Immediate Registration',
                      'Underground Electricity & Water Connections',
                      '30 to 50 Ft Wide Concrete RC Roads',
                      'Lush Parks, Miyawaki Forest & Amenities',
                      'Dedicated Street Lighting & Gated Security'
                    ]).map((feat, fIdx) => (
                      <div key={fIdx} className="er_plot-sc-feat-item">
                        <span className="er_plot-sc-check">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="er_plot-sc-cta-box">
                    <div className="er_plot-sc-cta-text">
                      <strong>Need Plot Layout &amp; Pricing Details?</strong>
                      <span>Get the complete master plan &amp; price sheet on your phone</span>
                    </div>
                    <button
                      type="button"
                      className="er_plot-sc-btn"
                      onClick={() => onOpenBrochure && onOpenBrochure(`Plot Sizes: ${plot.sqft || plot.size || 'Dimensions'} - Request Price List`)}
                    >
                      <span>Request Complete Price List</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {Plots.type === 'grid' && Plots.list && Plots.list.length > 1 && (
        <div className="er_plots-grid">
          {Plots.list.map((plot, idx) => (
            <div key={idx} className="er_plot-card">
              <div className="er_plot-card-top">
                <span className="er_plot-badge">
                  <i className="fas fa-gem"></i> {plot.badge}
                </span>
                <div className="er_plot-icon-wrap">
                  <i className={`fas ${plot.icon || 'fa-vector-square'} er_plot-icon`}></i>
                </div>
              </div>

              <div className="er_plot-info-block">
                {plot.size && <div className="er_plot-dimension-tag">{plot.size}</div>}
                <h3 className="er_plot-size">{plot.sqft}</h3>
              </div>

              <p className="er_plot-desc">{plot.desc}</p>

              <div className="er_plot-divider"></div>

              <ul className="er_plot-features">
                <li>
                  <span className="er_plot-check-icon"><i className="fas fa-check"></i></span>
                  <span>{project.approvalBadge || 'GOVT. & RERA APPROVED'}</span>
                </li>
                <li>
                  <span className="er_plot-check-icon"><i className="fas fa-check"></i></span>
                  <span>Ready for Immediate Registration</span>
                </li>
                <li>
                  <span className="er_plot-check-icon"><i className="fas fa-check"></i></span>
                  <span>Individual Water &amp; Power Points</span>
                </li>
              </ul>

              <div className="er_plot-card-footer">
                <button
                  type="button"
                  className="er_plot-btn"
                  onClick={() => onOpenBrochure && onOpenBrochure(`Plot Size: ${plot.sqft} (${plot.size || 'Plots'}) - Request Price List`)}
                >
                  <span>Request Price List</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {Plots.type === 'premium-card' && (
        <div className="er_premium-plot-card" style={{ display: 'flex', border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden', background: '#fff', marginTop: '2rem' }}>
          <div className="er_premium-plot-image-container" style={{ flex: '1', minWidth: '350px' }}>
            <img
              src={activeImage === 'day' ? Plots.imageDay : Plots.imageNight}
              alt={`${project.shortName} Villa Elevation`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="er_premium-image-toggles" style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px' }}>
              <button
                style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: activeImage === 'day' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                onClick={() => setActiveImage('day')}
              >
                Day View
              </button>
              <button
                style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: activeImage === 'night' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                onClick={() => setActiveImage('night')}
              >
                Night View
              </button>
            </div>
          </div>

          <div className="er_premium-plot-content" style={{ flex: '1.5', padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '28px', color: '#1B3C34', marginBottom: '8px', fontFamily: 'serif' }}>{Plots.cardTitle || project.shortName}</h3>
            
            <div style={{ color: '#666', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#c68a28' }}></i>
              {Plots.location || project.location}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              {Plots.sizeArea && (
                <div style={{ border: '1px solid #eaeaea', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#fafafa' }}>
                  <i className="fas fa-chart-area" style={{ color: '#666' }}></i>
                  <strong>Size:</strong> {Plots.sizeArea}
                </div>
              )}
              {Plots.units && (
                <div style={{ border: '1px solid #eaeaea', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#fafafa' }}>
                  <i className="fas fa-home" style={{ color: '#666' }}></i>
                  <strong>Units:</strong> {Plots.units}
                </div>
              )}
            </div>

            <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.5', marginBottom: '20px' }}>
              {Plots.cardDesc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
              {Plots.features?.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444' }}>
                  <i className="fas fa-check-circle" style={{ color: '#c68a28' }}></i>
                  {feature}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
              {/* <button 
                style={{ background: '#c68a28', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                Explore {project.shortName} <i className="fas fa-arrow-right"></i>
              </button> */}
              
              <button 
                style={{ background: '#c68a28', color: '#fff', border: '1px solid #c68a28', padding: '12px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                onClick={() => onOpenBrochure && onOpenBrochure(`${Plots.cardTitle} - Request Details`)}
              >
                Request Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
