import React, { useState, useEffect } from 'react';

const BROCHURE_URL = 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf';

export default function BrochureModal({ isOpen, onClose, sourceComment }) {
  const [step, setStep] = useState('input'); // 'input' | 'success' (OTP commented out)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setStep('input');
    setName('');
    setPhone('');
    setEmail('');
    setLoading(false);
    setMsg({ text: '', type: '' });
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const getERPFormattedDateTime = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  // Direct Lead Submission to StrategicERP (OTP logic commented out)
  const handleSubmitLead = (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (!name.trim()) {
      setMsg({ text: '⚠️ Full Name is required.', type: 'error' });
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setMsg({ text: '⚠️ Please enter a valid 10-digit mobile number.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setMsg({ text: '⚠️ Please enter a valid email address.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const nowStr = getERPFormattedDateTime();
      const commentVal = sourceComment
        ? `${sourceComment} - Ernika Landing Page`
        : 'Download Brochure Form - Ernika Landing Page';

      const erpUrl =
        `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/` +
        `&field15715=${encodeURIComponent(cleanPhone)}` +
        `&field15713=${encodeURIComponent(name.trim())}` +
        `&field33937=${encodeURIComponent(email.trim())}` +
        `&field15730=${encodeURIComponent('Guru Punvaanii Ernika')}` +
        `&field15800=${encodeURIComponent(nowStr)}` +
        `&field31227=${encodeURIComponent(nowStr)}` +
        `&field31228=${encodeURIComponent('Digital Marketing')}` +
        `&field31229=${encodeURIComponent('Google Ads')}` +
        `&field31230=${encodeURIComponent('/ Google Ads /')}` +
        `&field37710=${encodeURIComponent('+91')}` +
        `&field15716=${encodeURIComponent(commentVal)}` +
        `&field34785=`;

      // Fire StrategicERP Pixel Request
      const erpImg = new Image();
      erpImg.src = erpUrl;

      // Trigger Google Ads Conversion Event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        });
      }

      setLoading(false);
      setStep('success');
    } catch (err) {
      setLoading(false);
      setStep('success');
    }
  };

  /* OTP LOGIC COMMENTED OUT FOR DIRECT SUBMISSION
  const handleRequestOtp = async (e) => {
    // OTP request code commented out
  };
  const handleVerifyOtp = async () => {
    // OTP verification code commented out
  };
  */

  if (!isOpen) return null;

  return (
    <div className="er_modal er_active" role="dialog" aria-modal="true">
      <div className="er_modal-dialog">
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
            <span>GURU PUNVAANII &nbsp;|&nbsp; ERNIKA</span>
          </div>
          <h2 id="er_brochureTitle">
            Get the <em>ERNIKA</em><br />layout & brochure
          </h2>
          <p>
            Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and RERA documents — straight to your phone.
          </p>
        </div>

        {/* Form Body */}
        <div className="er_modal-form">
          {step === 'input' && (
            <form onSubmit={handleSubmitLead}>
              <div className="er_form-group er_full-width" style={{ marginBottom: '12px' }}>
                <label htmlFor="er_bName">FULL NAME *</label>
                <div className="er_input-wrap">
                  <i className="far fa-user er_input-icon"></i>
                  <input
                    type="text"
                    id="er_bName"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="er_form-row" style={{ marginBottom: '16px' }}>
                <div className="er_form-group">
                  <label htmlFor="er_bPhone">PHONE NUMBER *</label>
                  <div className="er_input-wrap">
                    <i className="fas fa-phone-alt er_input-icon"></i>
                    <input
                      type="tel"
                      id="er_bPhone"
                      required
                      placeholder="10-digit mobile"
                      maxLength="10"
                      inputMode="numeric"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
                <div className="er_form-group">
                  <label htmlFor="er_bEmail">EMAIL ADDRESS *</label>
                  <div className="er_input-wrap">
                    <i className="far fa-envelope er_input-icon"></i>
                    <input
                      type="email"
                      id="er_bEmail"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="er_modal-submit-btn" disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>{loading ? 'Submitting…' : 'Submit & Download Brochure'}</span>
              </button>
            </form>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(34,197,94,0.06)', border: '1.5px solid #22c55e', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '24px', fontWeight: 700 }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Form Submitted Successfully!
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '18px', lineHeight: 1.5 }}>
                Thank you <strong>{name}</strong>! Your enquiry has been received. Click below to download the official Ernika brochure PDF.
              </p>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--er-gold, #C58B2D)', color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(198,138,40,0.35)', transition: 'all 0.3s ease' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Brochure PDF</span>
              </a>
            </div>
          )}

          {msg.text && (
            <p className={`er_form-msg ${msg.type === 'error' ? 'er_error' : 'er_success'}`}>
              {msg.text}
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', margin: '12px 0 6px' }}>
            No spam — only the Ernika brochure and updates you ask for.
          </p>
        </div>

        {/* Footer Bar */}
        <div className="er_modal-footer-bar">
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>RERA<br />APPROVED</span>
          </div>
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>BMRDA<br />LAYOUT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
