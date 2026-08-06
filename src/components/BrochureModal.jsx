import React, { useState, useEffect, useRef } from 'react';

const BROCHURE_URL = 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf';

export default function BrochureModal({ isOpen, onClose }) {
  const [step, setStep] = useState('input'); // 'input', 'otp', 'success'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [timerCount, setTimerCount] = useState(120);
  const [canResend, setCanResend] = useState(false);

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const timerRef = useRef(null);

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
    setOtp(['', '', '', '', '', '']);
    setLoading(false);
    setMsg({ text: '', type: '' });
    setTimerCount(120);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startCountdown = () => {
    setTimerCount(120);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (cleanVal && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').substring(0, 6);
    if (!pasteData) return;

    const newOtp = ['', '', '', '', '', ''];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    if (pasteData.length === 6) {
      otpRefs[5].current?.focus();
    } else {
      otpRefs[Math.min(pasteData.length, 5)].current?.focus();
    }
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

  // Phase 1: Request OTP
  const handleRequestOtp = async (e) => {
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
      const res = await fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=send_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanPhone }),
      });
      const data = await res.json();
      setLoading(false);

      if (data && (data.success || data.status === 'success' || data.sent)) {
        setStep('otp');
        setMsg({ text: `📲 OTP sent to +91 ${cleanPhone}`, type: 'success' });
        startCountdown();
        setTimeout(() => otpRefs[0].current?.focus(), 100);
      } else {
        setMsg({ text: `⚠️ ${data.message || 'Failed to send OTP. Please try again.'}`, type: 'error' });
      }
    } catch (err) {
      setLoading(false);
      setMsg({ text: '⚠️ Network error sending OTP. Please try again.', type: 'error' });
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    setMsg({ text: '🔄 Sending new OTP...', type: 'success' });

    try {
      const res = await fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=send_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanPhone }),
      });
      const data = await res.json();
      if (data && (data.success || data.status === 'success' || data.sent)) {
        setMsg({ text: `🔄 New OTP sent to +91 ${cleanPhone}`, type: 'success' });
        startCountdown();
      } else {
        setMsg({ text: `⚠️ ${data.message || 'Failed to resend OTP.'}`, type: 'error' });
      }
    } catch (err) {
      setMsg({ text: '⚠️ Error resending OTP.', type: 'error' });
    }
  };

  // Phase 2: Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (!enteredOtp || enteredOtp.length < 4) {
      setMsg({ text: '⚠️ Please enter the full 6-digit OTP.', type: 'error' });
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    setLoading(true);
    setMsg({ text: 'Verifying OTP...', type: 'success' });

    try {
      const res = await fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanPhone, otp: enteredOtp }),
      });
      const data = await res.json();

      if (data && (data.success || data.status === 'success' || data.verified)) {
        submitLeadToERP(cleanPhone);
      } else {
        setLoading(false);
        setMsg({ text: `❌ ${data.message || 'Incorrect OTP. Please try again.'}`, type: 'error' });
      }
    } catch (err) {
      setLoading(false);
      setMsg({ text: '⚠️ OTP verification failed. Please try again.', type: 'error' });
    }
  };

  // StrategicERP Lead Submission & Conversion Trigger
  const submitLeadToERP = (cleanPhone) => {
    const nowStr = getERPFormattedDateTime();
    const erpUrl =
      `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/` +
      `&field15715=${encodeURIComponent(cleanPhone)}` +
      `&field15713=${encodeURIComponent(name)}` +
      `&field33937=${encodeURIComponent(email)}` +
      `&field15730=${encodeURIComponent('Guru Punvaanii Ernika')}` +
      `&field15800=${encodeURIComponent(nowStr)}` +
      `&field31227=${encodeURIComponent(nowStr)}` +
      `&field31228=${encodeURIComponent('Digital Marketing')}` +
      `&field31229=${encodeURIComponent('Google Ads')}` +
      `&field31230=${encodeURIComponent('/ Google Ads /')}` +
      `&field37710=${encodeURIComponent('+91')}` +
      `&field15716=${encodeURIComponent('Brochure Download (OTP Verified) - Ernika React')}` +
      `&field34785=`;

    // Fire StrategicERP Pixel Request
    const erpImg = new Image();
    erpImg.src = erpUrl;

    // Trigger Google Ads Conversion Event if script exists
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      });
    }

    setLoading(false);
    setStep('success');
    setMsg({ text: '✓ Mobile Verified & Enquiry Recorded!', type: 'success' });
  };

  const handleDownloadPdf = () => {
    window.open(BROCHURE_URL, '_blank', 'noopener,noreferrer');
  };

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
            <form onSubmit={handleRequestOtp}>
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
                <span>{loading ? 'Sending OTP…' : 'Get OTP & Download'}</span>
              </button>
            </form>
          )}

          {step === 'otp' && (
            <div style={{ textTransform: 'none', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>
                Verify Your Mobile
              </h3>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                We sent a 6-digit OTP to
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fdf6e3', border: '1.5px solid #c9a84c', borderRadius: '30px', padding: '4px 16px', fontSize: '13px', fontWeight: 700, color: '#b8862e', marginBottom: '16px' }}>
                <i className="fas fa-mobile-alt"></i>
                <span>+91 {phone}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    maxLength="1"
                    inputMode="numeric"
                    className="er_otp-box"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                  />
                ))}
              </div>

              <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                {!canResend ? (
                  <span>Resend OTP in <strong style={{ color: '#b8862e' }}>{formatTimer(timerCount)}</strong></span>
                ) : (
                  <button type="button" onClick={handleResendOtp} style={{ background: 'none', border: 'none', color: '#b8862e', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
                    Resend OTP
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button type="button" className="er_modal-submit-btn" onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  style={{ background: '#fffdf7', border: '1px solid #c68a28', color: '#c68a28', padding: '10px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  ← CHANGE MOBILE
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34,197,94,0.06)', border: '1.5px solid #22c55e', borderRadius: '10px' }}>
              <div style={{ width: '40px', height: '40px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px', fontWeight: 700 }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Enquiry Submitted Successfully!
              </h3>
              <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '16px', lineHeight: 1.5 }}>
                Your mobile number has been verified and your Enquiry has been recorded. Click below to view and download the official brochure.
              </p>
              <button
                type="button"
                onClick={handleDownloadPdf}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--er-gold)', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(198,138,40,0.35)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Brochure PDF</span>
              </button>
            </div>
          )}

          {msg.text && (
            <p className={`er_form-msg ${msg.type === 'error' ? 'er_error' : 'er_success'}`}>
              {msg.text}
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', margin: '8px 0 14px' }}>
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
