import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function BookSiteVisitPage({ onOpenBrochure }) {
  useEffect(() => {
    document.title = 'Book a Free Site Visit | Guru Punvaanii Ernika Anekal';
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    timeSlot: '10:00 AM - 01:00 PM',
    pickupAddress: '',
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

    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const comments = `SITE VISIT BOOKING: Date=${formData.visitDate || 'Not Specified'}, Slot=${formData.timeSlot}, Pickup=${formData.pickupAddress || 'Self Drive'}`;
      const erpUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(formData.name)}&Email=${encodeURIComponent(formData.email || '')}&MobileNo=${encodeURIComponent(formData.phone)}&Comments=${encodeURIComponent(comments)}&ProjectName=Ernika&Source=GoogleAds_BookSiteVisitPage`;
      fetch(erpUrl, { mode: 'no-cors' }).catch(() => {});

      /* OTP logic commented out for direct submission
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
      */

      setPhase('success');
    } catch (err) {
      setPhase('success');
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
      const nextInput = document.getElementById(`er_sv_otp_${index + 1}`);
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
    } catch (err) {
      setPhase('success');
    } finally {
      setLoading(false);
    }
  };

  const visitPerks = [
    {
      title: 'Free Cab Pick-Up & Drop',
      desc: 'Enjoy complimentary AC cab pickup from your doorstep anywhere in Bengaluru.',
      icon: 'fa-taxi',
      color: '#c68a28'
    },
    {
      title: 'Guided On-Site Walkthrough',
      desc: 'Our project engineer will guide you through plot dimensions, RC roads, & open corridors.',
      icon: 'fa-user-nurse',
      color: '#1B3C34'
    },
    // {
    //   title: 'On-Spot Bank Loan Eligibility',
    //   desc: 'Get instant pre-approval check for 80% home loans from SBI & HDFC experts.',
    //   icon: 'fa-file-invoice-dollar',
    //   color: '#0891b2'
    // },
    // {
    //   title: 'Exclusive Launch Discount',
    //   desc: 'Lock in special site visit offers and direct builder plot pricing.',
    //   icon: 'fa-tags',
    //   color: '#7c3aed'
    // }
  ];

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Why Visit Section */}
          <section className="er_section er_container">
            <div className="er_section-head">
              <span className="er_section-label">COMPLIMENTARY SITE VISIT</span>
              <h2 className="er_section-h2">Experience Ernika In Person</h2>
              <div className="er_gold-line"></div>
              <p className="er_section-desc">
                Experience Bengaluru's 1st Amazon Forest-Themed Villa Plots in person. We provide free AC cab pickup and drop for you and your family!
              </p>
            </div>

            <div className="er_perks-grid">
              {visitPerks.map((perk, idx) => (
                <div key={idx} className="er_perk-card">
                  <div className="er_perk-icon" style={{ color: perk.color, backgroundColor: `${perk.color}15` }}>
                    <i className={`fas ${perk.icon}`}></i>
                  </div>
                  <div>
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Contact Card */}
            <div className="er_contact-direct-card" style={{ marginTop: '30px' }}>
              <h3><i className="fas fa-headset"></i> Direct Customer Helpline</h3>
              <p>Prefer talking directly? Call our site visit coordinators now:</p>
              <div className="er_phone-numbers">
                <a href="tel:8546854600" className="er_phone-chip">
                  <i className="fas fa-phone-alt"></i> 8546 8546 00
                </a>
                {/* <a href="tel:7676000909" className="er_phone-chip">
                  <i className="fas fa-phone-alt"></i> 7676 000 909
                </a> */}
              </div>
              <div className="er_timing-badge">
                <i className="fas fa-clock"></i> Site Operating Hours: 10:00 AM - 06:00 PM (Open 7 Days a Week)
              </div>
            </div>
          </section>

          <CtaSection onOpenBrochure={onOpenBrochure} />
          <FaqSection />
        </div>

        {/* Sticky Sidebar Form for Site Visit */}
        <aside className="er_sticky-sidebar-col">
          <div className="er_quick-enquiry-card">
            <div className="er_quick-card-head">
              <span className="er_quick-badge">
                <i className="fas fa-calendar-check"></i> SCHEDULE FREE VISIT
              </span>
              <h3 className="er_quick-title">Book Free Site Visit</h3>
              <p className="er_quick-sub">Choose date &amp; slot for guided inspection &amp; cab pickup</p>
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
                    <label htmlFor="er_sv_name">Your Name *</label>
                    <div className="er_quick-input-icon">
                      <i className="fas fa-user"></i>
                      <input
                        id="er_sv_name"
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
                    <label htmlFor="er_sv_phone">Mobile Number *</label>
                    <div className="er_quick-input-icon">
                      <i className="fas fa-phone-alt"></i>
                      <input
                        id="er_sv_phone"
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
                    <label htmlFor="er_sv_email">Email Address (Optional)</label>
                    <div className="er_quick-input-icon">
                      <i className="fas fa-envelope"></i>
                      <input
                        id="er_sv_email"
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="er_quick-field">
                    <label htmlFor="er_sv_date">Preferred Visit Date *</label>
                    <div className="er_quick-input-icon">
                      <i className="fas fa-calendar-alt"></i>
                      <input
                        id="er_sv_date"
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="er_quick-field">
                    <label htmlFor="er_sv_slot">Preferred Time Slot *</label>
                    <div className="er_quick-input-icon">
                      <i className="fas fa-clock"></i>
                      <select
                        id="er_sv_slot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="er_select-input"
                      >
                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Morning)</option>
                        <option value="01:00 PM - 04:00 PM">01:00 PM - 04:00 PM (Afternoon)</option>
                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="er_quick-submit-btn" disabled={loading}>
                    {loading ? (
                      <span><i className="fas fa-spinner fa-spin"></i> Booking...</span>
                    ) : (
                      <>
                        <span>Confirm Free Site Visit</span>
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
                        id={`er_sv_otp_${idx}`}
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
                        <span>Verify OTP &amp; Confirm Booking</span>
                        <i className="fas fa-check-circle"></i>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="er_quick-back-btn"
                    onClick={() => setPhase('input')}
                  >
                    Edit Booking Details
                  </button>
                </form>
              )}

              {phase === 'success' && (
                <div className="er_quick-success-box">
                  <i className="fas fa-calendar-check er_quick-success-icon"></i>
                  <h4>Form Submitted Successfully!</h4>
                  <p>Thank you <strong>{formData.name}</strong>. Your site visit is confirmed for <strong>{formData.visitDate || 'Today'} ({formData.timeSlot})</strong>.</p>
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
                    onClick={() => setPhase('input')}
                  >
                    Book Another Visit
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
