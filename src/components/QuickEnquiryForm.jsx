import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import OtpVerificationView from './OtpVerificationView.jsx';
import { sendOtp, submitLeadToERP, isValidIndianPhone, cleanPhoneNumber } from '../utils/otpService.js';

export default function QuickEnquiryForm({ onOpenBrochure, onClose, formId = 'er_enquiry' }) {
  const { project, shortName, projectName } = useProjectContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [phase, setPhase] = useState('input'); // 'input' | 'otp' | 'success'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({ ...formData, [name]: value });
    setErrorMsg('');
  };

  // Phase 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanPhone = cleanPhoneNumber(formData.phone);
    if (!isValidIndianPhone(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setErrorMsg('Please enter a valid email address');
        return;
      }
    }

    setLoading(true);
    setErrorMsg('');

    const otpRes = await sendOtp(cleanPhone);
    setLoading(false);

    if (otpRes.success) {
      setPhase('otp');
    } else {
      setErrorMsg(otpRes.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Phase 2: On OTP Verified Callback
  const handleOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(formData.phone);
    const comments = `${formData.message || 'Quick Enquiry Form'} (OTP Verified) - ${shortName} Landing Page`;

    submitLeadToERP({
      name: formData.name,
      phone: cleanPhone,
      email: formData.email,
      projectName,
      comments,
      source: 'Google Ads Quick Enquiry Form',
    });

    setPhase('success');
  };

  return (
    <div id={formId} className={`er_quick-enquiry-card ${project.id === 'shyam_residency' ? 'er_theme-shyam' : ''}`}>
      {/* Premium Luxury Header Banner */}
      <div className="er_quick-card-head">
        <div className="er_quick-head-top">
          <div className="er_quick-head-text-group">
            {project.badge && (
              <span className="er_quick-badge">
                <i className="fas fa-tree"></i> {project.badge}
              </span>
            )}
            <h3 className="er_quick-title">{project.formHeading}</h3>
          </div>
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
        </div>
        {project.priceHighlight ? (
          <div className={`er_quick-price-split ${!project.priceHighlight.amount && !project.priceHighlight.price ? 'er_quick-rera-only' : ''}`}>
            {/* Left Side: RERA Approved / RERA No Badge */}
            <div className="er_quick-split-left">
              {project.priceHighlight.reraNumber && (
                <div className="er_quick-rera-pill">
                  <div className="er_quick-rera-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9.5" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="1.8 1.5" fill="rgba(212, 175, 55, 0.15)" />
                      <circle cx="12" cy="12" r="7.5" stroke="#d4af37" strokeWidth="1" fill="none" />
                      <path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="er_quick-rera-info">
                    <span className="er_quick-rera-title">{project.priceHighlight.reraTitle || 'RERA APPROVED'}</span>
                    <span className="er_quick-rera-no">{project.priceHighlight.reraNumber}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Rate / Price Display */}
            {(project.priceHighlight.amount || project.priceHighlight.price) && (
              <div className="er_quick-split-right">
                <div className="er_quick-price-val">
                  <span className="er_price-currency">{project.priceHighlight.currency || '₹'}</span>
                  <span className="er_price-amount">{project.priceHighlight.amount || project.priceHighlight.price.replace(/[₹*]/g, '')}</span>
                  {project.priceHighlight.crUnit && (
                    <span className="er_price-cr"> {project.priceHighlight.crUnit}</span>
                  )}
                  <span className="er_price-star">{project.priceHighlight.star || '*'}</span>
                </div>
                <div className="er_quick-price-unit">{project.priceHighlight.unit || 'ONWARDS'}</div>
              </div>
            )}
          </div>
        ) : (
          <p className="er_quick-sub">{project.formSubHeading}</p>
        )}
      </div>

      <div className="er_quick-card-body">
        {errorMsg && (
          <div className="er_quick-error">
            <i className="fas fa-exclamation-circle"></i> {errorMsg}
          </div>
        )}

        {phase === 'input' && (
          <form onSubmit={handleRequestOtp} className="er_quick-form">
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
                  inputMode="numeric"
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
                  placeholder="Email ID (optional)"
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
                  placeholder="Preferred plot size (30x40, 30x50) or remarks..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="er_quick-submit-btn" disabled={loading}>
              {loading ? (
                <span><i className="fas fa-spinner fa-spin"></i> Sending OTP...</span>
              ) : (
                <>
                  <span>Get OTP &amp; Submit</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
        )}

        {phase === 'otp' && (
          <OtpVerificationView
            phone={cleanPhoneNumber(formData.phone)}
            buttonText="Verify OTP &amp; Submit Enquiry"
            theme="quick"
            onChangePhone={() => setPhase('input')}
            onVerified={handleOtpVerified}
          />
        )}

        {phase === 'success' && (
          <div className="er_quick-success-box">
            <i className="fas fa-check-circle er_quick-success-icon"></i>
            <h4>Enquiry Submitted Successfully!</h4>
            <p>
              Thank you <strong>{formData.name}</strong>! Your mobile number <strong>+91 {cleanPhoneNumber(formData.phone)}</strong> has been verified. Our senior property manager will get in touch with you shortly.
            </p>
            <button
              type="button"
              className="er_quick-submit-btn"
              style={{ background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', marginBottom: '8px' }}
              onClick={() => {
                setFormData({ name: '', email: '', phone: '', message: '' });
                setPhase('input');
              }}
            >
              Submit Another Inquiry
            </button>
            {onClose && (
              <button
                type="button"
                className="er_quick-submit-btn"
                style={{ background: 'transparent', color: '#64748b', border: 'none', marginTop: '4px', textDecoration: 'underline', cursor: 'pointer', boxShadow: 'none' }}
                onClick={onClose}
              >
                Close Form
              </button>
            )}
          </div>
        )}

        <div className="er_quick-trust-footer">
          <span><i className="fas fa-shield-alt"></i> {project.approvalBadge}</span>
        </div>
      </div>
    </div>
  );
}
