import React, { useState } from 'react';

export default function QuickEnquiryForm({ onOpenBrochure }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [phase, setPhase] = useState('input'); // 'input' | 'otp' | 'success'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Submit lead to StrategicERP
      const erpUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(formData.name)}&Email=${encodeURIComponent(formData.email || '')}&MobileNo=${encodeURIComponent(formData.phone)}&ProjectName=Ernika&Source=GoogleAds_LandingPage`;
      fetch(erpUrl, { mode: 'no-cors' }).catch(() => {});

      // 2. Dispatch SMS OTP via backend proxy
      const otpRes = await fetch('https://gurupunvaanii.com/otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'send_otp',
          mobile: formData.phone,
          name: formData.name,
        }),
      });

      const data = await otpRes.json().catch(() => ({ success: true }));
      if (data && data.success === false) {
        setErrorMsg(data.message || 'Failed to send OTP. Please try again.');
        setLoading(false);
        return;
      }

      setPhase('otp');
    } catch (err) {
      // Proceed to OTP phase on network fallback
      setPhase('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`er_sticky_otp_${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const verifyRes = await fetch('https://gurupunvaanii.com/otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'verify_otp',
          mobile: formData.phone,
          otp: enteredOtp,
        }),
      });

      const data = await verifyRes.json().catch(() => ({ success: true }));
      if (data && data.success === false) {
        setErrorMsg(data.message || 'Invalid OTP. Please check and re-enter.');
        setLoading(false);
        return;
      }

      setPhase('success');
      // Trigger brochure download
      const link = document.createElement('a');
      link.href = 'https://gurupunvaanii.com/wp-content/uploads/2026/05/Ernika-Brochure.pdf';
      link.download = 'Ernika-Villa-Plots-Brochure.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
        <span className="er_quick-badge">
          <i className="fas fa-crown"></i> BMRDA APPROVED PLOTS
        </span>
        <h3 className="er_quick-title">Express Site Visit &amp; Pricing</h3>
        <p className="er_quick-sub">Instant Plot Pricing &amp; Master Plan Download</p>
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
              <label htmlFor="er_sticky_email">Email Address (Optional)</label>
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

            <button type="submit" className="er_quick-submit-btn" disabled={loading}>
              {loading ? (
                <span><i className="fas fa-spinner fa-spin"></i> Processing...</span>
              ) : (
                <>
                  <span>Get Instant Price &amp; Layout</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
        )}

        {phase === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="er_quick-form">
            <div className="er_quick-otp-notice">
              Enter 6-digit OTP sent to <strong>+91 {formData.phone}</strong>
            </div>

            <div className="er_quick-otp-grid">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`er_sticky_otp_${idx}`}
                  type="text"
                  maxLength="1"
                  inputMode="numeric"
                  className="er_quick-otp-box"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                />
              ))}
            </div>

            <button type="submit" className="er_quick-submit-btn" disabled={loading}>
              {loading ? (
                <span><i className="fas fa-spinner fa-spin"></i> Verifying...</span>
              ) : (
                <>
                  <span>Verify OTP &amp; Download</span>
                  <i className="fas fa-check-circle"></i>
                </>
              )}
            </button>

            <button
              type="button"
              className="er_quick-back-btn"
              onClick={() => setPhase('input')}
            >
              Edit Mobile Number
            </button>
          </form>
        )}

        {phase === 'success' && (
          <div className="er_quick-success-box">
            <i className="fas fa-check-circle er_quick-success-icon"></i>
            <h4>Request Submitted!</h4>
            <p>Brochure &amp; Plot Layout downloading automatically. Our sales team will connect with you shortly.</p>
            <button
              type="button"
              className="er_quick-submit-btn"
              onClick={() => setPhase('input')}
            >
              Submit Another Request
            </button>
          </div>
        )}

        <div className="er_quick-trust-footer">
          <span><i className="fas fa-shield-alt"></i> 100% Privacy Protected</span>
          <span><i className="fas fa-headset"></i> Direct Builder Price</span>
        </div>
      </div>
    </div>
  );
}
