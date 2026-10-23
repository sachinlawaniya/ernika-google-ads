import React, { useState, useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import HeroSection from '../components/HeroSection.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import OtpVerificationView from '../components/OtpVerificationView.jsx';
import { sendOtp, submitLeadToERP, isValidIndianPhone, cleanPhoneNumber } from '../utils/otpService.js';

export default function BookSiteVisitPage({ onOpenBrochure }) {
  const { isElegance, shortName, projectName, project } = useProjectContext();

  useEffect(() => {
    document.title = `Book a Free Site Visit | ${projectName}`;
    window.scrollTo(0, 0);
  }, [isElegance, projectName]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    timeSlot: '10:00 AM - 01:00 PM',
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
  const handleFormSubmit = async (e) => {
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
    const comments = `SITE VISIT BOOKING: Date=${formData.visitDate || 'Not Specified'}, Slot=${formData.timeSlot}, Message=${formData.message || 'None'} (OTP Verified) - ${shortName} Landing Page`;

    submitLeadToERP({
      name: formData.name,
      phone: cleanPhone,
      email: formData.email,
      projectName,
      comments,
      source: 'Google Ads Site Visit Page',
    });

    setPhase('success');
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
    {
      title: 'Official Document Inspection',
      desc: 'Examine complete physical approval copies, converted sanction plans, and legal title documents.',
      icon: 'fa-file-signature',
      color: '#c68a28'
    },
    {
      title: 'Instant Customized Pricing',
      desc: 'Receive transparent pricing breakdowns with instant bank loan eligibility assessment.',
      icon: 'fa-calculator',
      color: '#1B3C34'
    }
  ];

  return (
    <main>
      <HeroSection onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Why Visit Section */}
          <section className="er_section er_container">
            <div className="er_section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <span className="er_section-badge" style={{ margin: '0 0 8px 0' }}>EXPERIENCE IN PERSON</span>
              <h2 className="er_section-title">Why Book a Dedicated Site Visit?</h2>
              <p className="er_section-sub">
                Nothing compares to standing on the ground where your future home will stand. Experience the tranquility, wide roads, and master planning first-hand.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {visitPerks.map((perk, idx) => (
                <div key={idx} style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${perk.color}15`,
                    color: perk.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    <i className={`fas ${perk.icon}`}></i>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{perk.title}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{perk.desc}</p>
                </div>
              ))}
            </div>

            {/* Site Visit Protocol Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1B3C34 0%, #112822 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '32px'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                  color: '#c68a28',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  ★ COMFORT &amp; SAFETY FIRST
                </span>
                <h3 style={{ margin: '8px 0 12px 0', fontSize: '20px', fontWeight: 700 }}>
                  Doorstep Cab Service Guidelines
                </h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '650px' }}>
                  Our sanitized AC cabs are dispatched at your preferred time slot anywhere across Bengaluru. Pickups are scheduled at your doorstep with real-time driver tracking and professional customer care support.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#e2e8f0' }}>
                  <span><i className="fas fa-check-circle" style={{ color: '#c68a28', marginRight: '6px' }}></i> Dedicated Chauffeur</span>
                  <span><i className="fas fa-check-circle" style={{ color: '#c68a28', marginRight: '6px' }}></i> Family-Friendly AC Cars</span>
                  <span><i className="fas fa-check-circle" style={{ color: '#c68a28', marginRight: '6px' }}></i> Zero Cost &amp; Zero Obligation</span>
                </div>
              </div>
            </div>
          </section>

          <CtaSection onOpenBrochure={onOpenBrochure} />
          <FaqSection />
        </div>

        {/* Sidebar Sticky Booking Form */}
        <aside id="er_enquiry" className="er_sticky-sidebar-col">
          <div className="er_quick-enquiry-card">
            <div className="er_quick-card-head">
              <span className="er_quick-badge">
                <i className="fas fa-calendar-check"></i> FREE VIP SERVICE
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
                        inputMode="numeric"
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
                        required
                      >
                        <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                        <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                        <option value="04:00 PM - 06:30 PM">Evening (04:00 PM - 06:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="er_quick-field">
                    <label htmlFor="er_sv_message">Pickup Address / Remarks</label>
                    <div className="er_quick-input-icon er_quick-textarea-icon">
                      <i className="fas fa-map-marker-alt"></i>
                      <textarea
                        id="er_sv_message"
                        name="message"
                        rows="2"
                        placeholder="Your pickup area / landmark in Bengaluru..."
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
                        <span>Get OTP &amp; Confirm Booking</span>
                        <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </form>
              )}

              {phase === 'otp' && (
                <OtpVerificationView
                  phone={cleanPhoneNumber(formData.phone)}
                  buttonText="Verify OTP &amp; Confirm Booking"
                  theme="quick"
                  onChangePhone={() => setPhase('input')}
                  onVerified={handleOtpVerified}
                />
              )}

              {phase === 'success' && (
                <div className="er_quick-success-box">
                  <i className="fas fa-calendar-check er_quick-success-icon"></i>
                  <h4>Site Visit Confirmed!</h4>
                  <p>
                    Thank you <strong>{formData.name}</strong>! Your mobile number <strong>+91 {cleanPhoneNumber(formData.phone)}</strong> has been verified. Your free site visit is confirmed for <strong>{formData.visitDate || 'Your Selected Date'} ({formData.timeSlot})</strong>. Our team will contact you shortly to confirm the cab pickup details.
                  </p>
                  <button
                    type="button"
                    className="er_quick-submit-btn"
                    style={{ background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1' }}
                    onClick={() => {
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        visitDate: '',
                        timeSlot: '10:00 AM - 01:00 PM',
                        message: '',
                      });
                      setPhase('input');
                    }}
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
