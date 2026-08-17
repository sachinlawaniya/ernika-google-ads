import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function QuickEnquiryForm({ onOpenBrochure, onClose }) {
  const { isElegance, shortName, projectName } = useProjectContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [phase, setPhase] = useState('input'); // 'input' | 'success'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Submit lead to StrategicERP API
      const erpUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(formData.name.trim())}&Email=${encodeURIComponent(formData.email.trim() || '')}&MobileNo=${encodeURIComponent(cleanPhone)}&Comments=${encodeURIComponent(formData.message || 'Quick Enquiry Form')}&ProjectName=${encodeURIComponent(shortName)}&Source=GoogleAds_LandingPage`;
      fetch(erpUrl, { mode: 'no-cors' }).catch(() => {});

      // 2. Fire StrategicERP Image Pixel
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const nowStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
      const pixelUrl = `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/&field15715=${encodeURIComponent(cleanPhone)}&field15713=${encodeURIComponent(formData.name.trim())}&field33937=${encodeURIComponent(formData.email.trim())}&field15730=${encodeURIComponent(projectName)}&field15800=${encodeURIComponent(nowStr)}&field31227=${encodeURIComponent(nowStr)}&field31228=${encodeURIComponent('Digital Marketing')}&field31229=${encodeURIComponent('Google Ads')}&field31230=${encodeURIComponent('/ Google Ads /')}&field37710=${encodeURIComponent('+91')}&field15716=${encodeURIComponent('Quick Enquiry Form')}&field34785=`;
      const erpImg = new Image();
      erpImg.src = pixelUrl;

      // 3. Trigger Google Ads conversion event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        });
      }

      setPhase('success');
    } catch (err) {
      setPhase('success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="er_quick-enquiry-card">
      {/* Premium Luxury Header Banner */}
      <div className="er_quick-card-head">
        {onClose && (
          <button
            type="button"
            className="er_quick-header-close-btn"
            onClick={onClose}
            aria-label="Close Enquiry Form"
            title="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        <span className="er_quick-badge">
          <i className="fas fa-tree"></i> {isElegance ? 'PREMIUM VILLA PLOTS' : 'AMAZON THEMED VILLA PLOTS'}
        </span>
        <h3 className="er_quick-title">{shortName} Villa Plots - Anekal</h3>
        <p className="er_quick-sub">{isElegance ? 'Luxury Approved Villa Plots Community' : '220 BMRDA Approved Plots across 12.5 Acres'}</p>
      </div>

      <div className="er_quick-card-body">
        {errorMsg && (
          <div className="er_quick-error">
            <i className="fas fa-exclamation-circle"></i> {errorMsg}
          </div>
        )}

        {phase === 'input' && (
          <form onSubmit={handleFormSubmit} className="er_quick-form">
            <div className="er_quick-field">
              <label htmlFor="er_sticky_name">Your Name *</label>
              <div className="er_quick-input-icon">
                <i className="fas fa-user"></i>
                <input
                  id="er_sticky_name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="er_quick-field">
              <label htmlFor="er_sticky_phone">Mobile Number *</label>
              <div className="er_quick-input-icon">
                <i className="fas fa-phone-alt"></i>
                <input
                  id="er_sticky_phone"
                  type="tel"
                  name="phone"
                  placeholder="10-digit Mobile No."
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="er_quick-field">
              <label htmlFor="er_sticky_email">Email Address</label>
              <div className="er_quick-input-icon">
                <i className="fas fa-envelope"></i>
                <input
                  id="er_sticky_email"
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="er_quick-field">
              <label htmlFor="er_sticky_msg">Plot Dimensions / Remarks</label>
              <div className="er_quick-input-icon er_quick-textarea-icon">
                <i className="fas fa-comment-alt"></i>
                <textarea
                  id="er_sticky_msg"
                  name="message"
                  rows="2"
                  placeholder="Preferred plot size (30x40, 30x50) or site visit date..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="er_quick-submit-btn" disabled={loading}>
              {loading ? (
                <span><i className="fas fa-spinner fa-spin"></i> Submitting...</span>
              ) : (
                <>
                  <span>Get Price List &amp; Details</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
        )}

        {phase === 'success' && (
          <div className="er_quick-success-box">
            <i className="fas fa-check-circle er_quick-success-icon"></i>
            <h4>Form Submitted Successfully!</h4>
            <p>Thank you for your enquiry. Your details have been received. Click below to download the official brochure.</p>
            <a
              href="https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="er_quick-submit-btn"
              style={{ textDecoration: 'none', marginBottom: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <i className="fas fa-download"></i>
              <span>Download Brochure PDF</span>
            </a>
            <button
              type="button"
              className="er_quick-submit-btn"
              style={{ background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1' }}
              onClick={() => {
                setFormData({ name: '', email: '', phone: '', message: '' });
                setPhase('input');
              }}
            >
              Submit Another Inquiry
            </button>
          </div>
        )}

        <div className="er_quick-trust-footer">
          <span><i className="fas fa-shield-alt"></i> BMRDA Approved</span>
          <span><i className="fas fa-tag"></i> Direct Builder Price</span>
        </div>
      </div>
    </div>
  );
}
