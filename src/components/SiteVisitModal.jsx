import React, { useState, useEffect } from 'react';
import { useProjectContext, PROJECTS_DATA } from '../utils/useProjectContext.js';
import OtpVerificationView from './OtpVerificationView.jsx';
import { sendOtp, submitLeadToERP, isValidIndianPhone, cleanPhoneNumber } from '../utils/otpService.js';

export default function SiteVisitModal({ isOpen, onClose, sourceComment, projectKey }) {
  const { shortName: ctxShortName, projectName: ctxProjectName, project: ctxProject } = useProjectContext();

  const currentProject = (projectKey && PROJECTS_DATA[projectKey]) || ctxProject || PROJECTS_DATA['ernika'];
  const shortName = currentProject?.shortName || ctxShortName || 'Guru Punvaanii';
  const projectName = currentProject?.projectName || ctxProjectName || 'Guru Punvaanii Properties';

  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setStep('input');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
    });
    setLoading(false);
    setMsg({ text: '', type: '' });
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMsg({ text: '', type: '' });
  };

  // Phase 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (!formData.name.trim()) {
      setMsg({ text: '⚠️ Please enter your full name.', type: 'error' });
      return;
    }

    const cleanPhone = cleanPhoneNumber(formData.phone);
    if (!isValidIndianPhone(cleanPhone)) {
      setMsg({ text: '⚠️ Please enter a valid 10-digit mobile number.', type: 'error' });
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setMsg({ text: '⚠️ Please enter a valid email address.', type: 'error' });
        return;
      }
    }

    setLoading(true);

    const otpRes = await sendOtp(cleanPhone);
    setLoading(false);

    if (otpRes.success) {
      setStep('otp');
    } else {
      setMsg({ text: `⚠️ ${otpRes.message}`, type: 'error' });
    }
  };

  // Phase 2: On OTP Verified Callback
  const handleOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(formData.phone);
    const comments = `SITE VISIT BOOKING: ${formData.message.trim() ? `Message=${formData.message.trim()} | ` : ''}Source: ${sourceComment || 'Book Site Visit Modal'} (OTP Verified) - ${shortName} Landing Page`;

    submitLeadToERP({
      name: formData.name,
      phone: cleanPhone,
      email: formData.email,
      projectName,
      comments,
      source: 'Google Ads Site Visit Modal',
    });

    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div
      className="er_modal er_active"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="er_modal-dialog er_sitevisit-modal-dialog">
        <div className="er_modal-pattern"></div>
        <div className="er_watermark-pin">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c68a28" strokeWidth="1.2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Close Button */}
        <button className="er_modal-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <div className="er_modal-header">
          <div className="er_modal-brand-tag">
            <span className="er_brand-icon"></span>
            <span>GURU PUNVAANII &nbsp;|&nbsp; {shortName.toUpperCase()}</span>
          </div>
          <h2>
            Book Your Free <em>Site Visit</em>
          </h2>
          <p>
            Experience {shortName} in person with free doorstep AC cab pickup &amp; guided plot inspection.
          </p>
        </div>

        {/* Form Body */}
        <div className="er_modal-form">
          {step === 'input' && (
            <form onSubmit={handleRequestOtp}>
              <div className="er_form-group er_full-width" style={{ marginBottom: '12px' }}>
                <label htmlFor="er_sv_modal_name">FULL NAME *</label>
                <div className="er_input-wrap">
                  <i className="far fa-user er_input-icon"></i>
                  <input
                    type="text"
                    id="er_sv_modal_name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="er_form-row" style={{ marginBottom: '12px' }}>
                <div className="er_form-group">
                  <label htmlFor="er_sv_modal_phone">PHONE NUMBER *</label>
                  <div className="er_input-wrap">
                    <i className="fas fa-phone-alt er_input-icon"></i>
                    <input
                      type="tel"
                      id="er_sv_modal_phone"
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
                  <label htmlFor="er_sv_modal_email">EMAIL ADDRESS</label>
                  <div className="er_input-wrap">
                    <i className="far fa-envelope er_input-icon"></i>
                    <input
                      type="email"
                      id="er_sv_modal_email"
                      name="email"
                      placeholder="you@email.com (optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="er_form-group er_full-width" style={{ marginBottom: '14px' }}>
                <label htmlFor="er_sv_modal_msg">MESSAGE / REMARKS</label>
                <div className="er_input-wrap">
                  <i className="fas fa-comment-alt er_input-icon"></i>
                  <input
                    type="text"
                    id="er_sv_modal_msg"
                    name="message"
                    placeholder="Preferred plot size (30x40, 30x50) or your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="er_modal-submit-btn" disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{loading ? 'Sending OTP…' : 'Get OTP & Confirm Site Visit'}</span>
              </button>
            </form>
          )}

          {step === 'otp' && (
            <OtpVerificationView
              phone={cleanPhoneNumber(formData.phone)}
              buttonText="Verify OTP & Confirm Free Site Visit"
              theme="modal"
              onChangePhone={() => setStep('input')}
              onVerified={handleOtpVerified}
            />
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '22px 16px', background: 'rgba(34,197,94,0.06)', border: '1.5px solid #22c55e', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '22px', fontWeight: 700 }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Site Visit Booked Successfully!
              </h3>
              <p style={{ fontSize: '13.5px', color: '#475569', marginBottom: '18px', lineHeight: 1.5 }}>
                Thank you <strong>{formData.name}</strong>! Your mobile number <strong>+91 {cleanPhoneNumber(formData.phone)}</strong> has been verified. Your free site visit request for <strong>{shortName}</strong> has been registered. Our property manager will call you shortly to confirm the pickup details.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--er-gold, #C58B2D)', color: '#ffffff', fontWeight: 700, fontSize: '13.5px', padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(198,138,40,0.35)', transition: 'all 0.3s ease' }}
              >
                <span>Close &amp; Return to Page</span>
              </button>
            </div>
          )}

          {msg.text && (
            <p className={`er_form-msg ${msg.type === 'error' ? 'er_error' : 'er_success'}`} style={{ marginTop: '8px' }}>
              {msg.text}
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', margin: '10px 0 4px' }}>
            Guided Plot Inspection • Doorstep AC Cab Pickup • 100% Secure
          </p>
        </div>

        {/* Footer Bar */}
        <div className="er_modal-footer-bar">
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>{currentProject?.trustBadges?.[0] ? currentProject.trustBadges[0].split(' ')[0] : '100%'}<br />{currentProject?.trustBadges?.[0] ? currentProject.trustBadges[0].split(' ')[1] : 'APPROVED'}</span>
          </div>
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>FREE<br />SITE VISIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
