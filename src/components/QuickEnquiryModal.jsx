import React, { useState, useEffect } from 'react';
import OtpVerificationView from './OtpVerificationView.jsx';
import { sendOtp, submitLeadToERP, isValidIndianPhone, cleanPhoneNumber } from '../utils/otpService.js';
import { PROJECTS_DATA } from '../utils/useProjectContext.js';

export default function QuickEnquiryModal({
  isOpen,
  onClose,
  project = null,
  sourceComment = '',
}) {
  // Resolve project details from either project object or projectKey
  let projectKey = 'ernika';
  let projectName = 'Guru Punvaanii Ernika';
  let displayName = 'Ernika';
  let locationText = 'Anekal, South Bengaluru';
  let priceText = '₹4,200 / sq.ft*';
  let badgeText = 'AMAZON THEME VILLA PLOTS';
  let approvalText = 'BMRDA & RERA Approved';

  if (project) {
    if (typeof project === 'string') {
      projectKey = project;
      const data = PROJECTS_DATA[project] || {};
      projectName = data.projectName || `Guru Punvaanii ${project}`;
      displayName = data.shortName || project;
      locationText = data.location || 'Bengaluru Prime';
      priceText = data.priceHighlight ? `${data.priceHighlight.currency}${data.priceHighlight.amount} ${data.priceHighlight.crUnit}` : '';
      badgeText = data.badge || 'PREMIUM PLOTS';
      approvalText = data.approvalBadge || 'RERA & BDA/BMRDA Approved';
    } else if (typeof project === 'object') {
      projectKey = project.id || 'ernika';
      displayName = (project.name || 'Guru Punvaanii').replace('Guru Punvaanii ', '');
      projectName = project.name?.startsWith('Guru Punvaanii') ? project.name : `Guru Punvaanii ${displayName}`;
      locationText = project.location || project.corridor || 'Bengaluru Prime';
      priceText = project.price || project.startingPackage || '';
      badgeText = project.badge || 'LUXURY PLOTS';
      approvalText = project.approval || project.reraNo || 'RERA Approved';
    }
  }

  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: 'Price Quote & Payment Plans',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset state when opened or closed
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setErrorMsg('');
      setLoading(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleQueryTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, queryType: type }));
  };

  // Phase 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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

    const otpRes = await sendOtp(cleanPhone);
    setLoading(false);

    if (otpRes.success) {
      setStep('otp');
    } else {
      setErrorMsg(otpRes.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Phase 2: On OTP Verified Callback
  const handleOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(formData.phone);
    const commentVal = `QUICK ENQUIRY [${formData.queryType}]: ${
      formData.message ? formData.message.trim() : 'Project Card Enquiry'
    } | Source: ${sourceComment || `Project Card - ${displayName}`} (OTP Verified) - ${projectName}`;

    submitLeadToERP({
      name: formData.name.trim(),
      phone: cleanPhone,
      email: formData.email.trim(),
      projectName,
      comments: commentVal,
      source: 'Google Ads Main Landing Card Quick Enquiry',
    });

    setStep('success');
  };

  if (!isOpen) return null;

  const queryTypeOptions = [
    'Price Quote & Payment Plans',
    'Master Plan & Plot Availability',
    'Schedule Free Site Visit',
    'Immediate Call Back',
  ];

  const cleanPhone = cleanPhoneNumber(formData.phone);
  const whatsappUrl = `https://wa.me/919900030491?text=${encodeURIComponent(
    `Hi, I have submitted a quick enquiry for Guru Punvaanii ${displayName}. Please share the current price sheet and availability.`
  )}`;

  return (
    <div
      className="er_modal er_active gp_quick_modal_backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="er_modal-dialog gp_quick_modal_dialog">
        <div className="er_modal-pattern"></div>
        <div className="er_watermark-pin">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c68a28" strokeWidth="1.2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Close Button */}
        <button
          type="button"
          className="er_modal-close"
          onClick={onClose}
          aria-label="Close Quick Enquiry Modal"
          title="Close"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <div className="er_modal-header gp_quick_modal_header">
          <div className="er_modal-brand-tag">
            <span className="er_brand-icon"></span>
            <span>GURU PUNVAANII &nbsp;|&nbsp; QUICK ENQUIRY</span>
          </div>

          <h2 className="gp_quick_modal_title">
            Enquire for <em>{displayName}</em>
          </h2>

          {/* Project Details Highlight Chip */}
          <div className="gp_quick_project_chip">
            <div className="gp_quick_chip_badge">
              <i className="fas fa-check-circle"></i> {approvalText}
            </div>
            <div className="gp_quick_chip_meta">
              <span className="gp_quick_chip_loc">
                <i className="fas fa-map-marker-alt"></i> {locationText}
              </span>
              {priceText && (
                <span className="gp_quick_chip_price">
                  <i className="fas fa-tag"></i> Starting {priceText}
                </span>
              )}
            </div>
          </div>

          <p className="gp_quick_modal_desc">
            Enter your details below to get direct developer pricing, payment schedules, and instant WhatsApp brochures.
          </p>
        </div>

        {/* Form Body */}
        <div className="er_modal-form gp_quick_modal_form">
          {step === 'input' && (
            <form onSubmit={handleRequestOtp}>
              {/* Name */}
              <div className="er_form-group er_full-width" style={{ marginBottom: '12px' }}>
                <label htmlFor="gp_qe_name">FULL NAME *</label>
                <div className="er_input-wrap">
                  <i className="far fa-user er_input-icon"></i>
                  <input
                    type="text"
                    id="gp_qe_name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="er_form-row" style={{ marginBottom: '12px' }}>
                <div className="er_form-group">
                  <label htmlFor="gp_qe_phone">PHONE NUMBER *</label>
                  <div className="er_input-wrap">
                    <i className="fas fa-phone-alt er_input-icon"></i>
                    <input
                      type="tel"
                      id="gp_qe_phone"
                      name="phone"
                      required
                      placeholder="10-digit mobile"
                      maxLength="10"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="er_form-group">
                  <label htmlFor="gp_qe_email">EMAIL ADDRESS</label>
                  <div className="er_input-wrap">
                    <i className="far fa-envelope er_input-icon"></i>
                    <input
                      type="email"
                      id="gp_qe_email"
                      name="email"
                      placeholder="you@email.com (optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Interested In / Query Type Pills */}
              <div className="er_form-group er_full-width" style={{ marginBottom: '12px' }}>
                <label>I AM INTERESTED IN</label>
                <div className="gp_quick_query_grid">
                  {queryTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`gp_quick_query_pill ${formData.queryType === opt ? 'active' : ''}`}
                      onClick={() => handleQueryTypeSelect(opt)}
                    >
                      <i className={`fas ${formData.queryType === opt ? 'fa-dot-circle' : 'fa-circle'}`}></i>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Notes */}
              <div className="er_form-group er_full-width" style={{ marginBottom: '16px' }}>
                <label htmlFor="gp_qe_message">SPECIAL REQUIREMENTS (OPTIONAL)</label>
                <div className="er_input-wrap">
                  <i className="far fa-comment-dots er_input-icon"></i>
                  <input
                    type="text"
                    id="gp_qe_message"
                    name="message"
                    placeholder="Preferred plot size, budget, or timeline..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <p className="er_form-msg er_error" style={{ marginBottom: '12px' }}>
                  ⚠️ {errorMsg}
                </p>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="er_modal-submit-btn gp_quick_submit_btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Sending OTP…</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Get OTP &amp; Submit Quick Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <OtpVerificationView
              phone={cleanPhoneNumber(formData.phone)}
              buttonText="Verify OTP & Submit Enquiry"
              theme="modal"
              onChangePhone={() => setStep('input')}
              onVerified={handleOtpVerified}
            />
          )}

          {step === 'success' && (
            <div className="gp_quick_success_box">
              <div className="gp_quick_success_icon">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="gp_quick_success_title">Enquiry Submitted Successfully!</h3>
              <p className="gp_quick_success_text">
                Thank you <strong>{formData.name}</strong>! Your enquiry for{' '}
                <strong>{projectName}</strong> has been received with high priority.
              </p>
              <p className="gp_quick_success_sub">
                Our property specialist will contact you on <strong>+91 {cleanPhone}</strong> with
                pricing, available plots, and schedule your guided site visit.
              </p>

              <div className="gp_quick_success_actions">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gp_quick_whatsapp_btn"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Instant WhatsApp Connect</span>
                </a>
                <button
                  type="button"
                  className="gp_quick_close_btn"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="gp_quick_privacy_note">
            <i className="fas fa-shield-alt"></i>
            <span>100% Privacy • No Spam Guarantee • Zero Brokerage Directly with Developer</span>
          </div>
        </div>

        {/* Footer Bar with Trust Pillars */}
        <div className="er_modal-footer-bar">
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>
              100% CLEAR<br />TITLES
            </span>
          </div>
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>
              INSTANT<br />RESPONSE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
