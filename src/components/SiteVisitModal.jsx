import React, { useState, useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function SiteVisitModal({ isOpen, onClose, sourceComment }) {
  const { shortName, projectName, project } = useProjectContext();

  const [step, setStep] = useState('input'); // 'input' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    timeSlot: '10:00 AM - 01:00 PM',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const getTodayDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        visitDate: prev.visitDate || getTomorrowDateStr(),
      }));
    } else {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setStep('input');
    setFormData({
      name: '',
      phone: '',
      email: '',
      visitDate: getTomorrowDateStr(),
      timeSlot: '10:00 AM - 01:00 PM',
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

  const getERPFormattedDateTime = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (!formData.name.trim()) {
      setMsg({ text: '⚠️ Please enter your full name.', type: 'error' });
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
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

    try {
      const nowStr = getERPFormattedDateTime();
      const comments = `SITE VISIT BOOKING: Date=${formData.visitDate || 'Tomorrow'}, Slot=${formData.timeSlot}, Message=${formData.message.trim() || 'Site Visit Requested'} | Source: ${sourceComment || 'Book Site Visit Modal'} - ${shortName} Landing Page`;

      // 1. Submit lead to StrategicERP lead creation API
      const apiLeadUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(formData.name.trim())}&Email=${encodeURIComponent(formData.email.trim() || '')}&MobileNo=${encodeURIComponent(cleanPhone)}&Comments=${encodeURIComponent(comments)}&ProjectName=${encodeURIComponent(shortName)}&Source=GoogleAds_LandingPage`;
      fetch(apiLeadUrl, { mode: 'no-cors' }).catch(() => { });

      // 2. Fire StrategicERP Image Pixel
      const erpUrl =
        `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/` +
        `&field15715=${encodeURIComponent(cleanPhone)}` +
        `&field15713=${encodeURIComponent(formData.name.trim())}` +
        `&field33937=${encodeURIComponent(formData.email.trim())}` +
        `&field15730=${encodeURIComponent(projectName)}` +
        `&field15800=${encodeURIComponent(nowStr)}` +
        `&field31227=${encodeURIComponent(nowStr)}` +
        `&field31228=${encodeURIComponent('Digital Marketing')}` +
        `&field31229=${encodeURIComponent('Google Ads')}` +
        `&field31230=${encodeURIComponent('/ Google Ads /')}` +
        `&field37710=${encodeURIComponent('+91')}` +
        `&field15716=${encodeURIComponent(comments)}` +
        `&field34785=`;

      const erpImg = new Image();
      erpImg.src = erpUrl;

      // 3. Trigger Google Ads Conversion Event
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

  if (!isOpen) return null;

  return (
    <div className="er_modal er_active" role="dialog" aria-modal="true">
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
          <h2 id="er_brochureTitle">
            Book a <em>Free Site Visit</em>
          </h2>
          <p>
            Experience <strong>{projectName}</strong> in person. Guided plot inspection &amp; layout walkthrough!
          </p>
        </div>

        {/* Form Body */}
        <div className="er_modal-form">
          {step === 'input' && (
            <form onSubmit={handleSubmit}>
              <div className="er_form-group er_full-width" style={{ marginBottom: '10px' }}>
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

              <div className="er_form-row" style={{ marginBottom: '10px' }}>
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
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="er_form-row" style={{ marginBottom: '10px' }}>
                <div className="er_form-group">
                  <label htmlFor="er_sv_modal_date">VISIT DATE *</label>
                  <div className="er_input-wrap">
                    <i className="far fa-calendar-alt er_input-icon"></i>
                    <input
                      type="date"
                      id="er_sv_modal_date"
                      name="visitDate"
                      min={getTodayDateStr()}
                      required
                      value={formData.visitDate}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>

                <div className="er_form-group">
                  <label htmlFor="er_sv_modal_slot">TIME SLOT *</label>
                  <div className="er_input-wrap">
                    <i className="far fa-clock er_input-icon"></i>
                    <select
                      id="er_sv_modal_slot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="er_select-input"
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 10px 0 38px',
                        border: '1px solid #f3e9d8',
                        borderRadius: '10px',
                        fontSize: '12px',
                        color: '#1e293b',
                        background: '#fdfbf7',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="10:00 AM - 01:00 PM">10 AM - 1 PM (Morning)</option>
                      <option value="01:00 PM - 04:00 PM">1 PM - 4 PM (Afternoon)</option>
                      <option value="04:00 PM - 06:00 PM">4 PM - 6 PM (Evening)</option>
                    </select>
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
                <span>{loading ? 'Confirming Visit…' : 'Confirm Free Site Visit'}</span>
              </button>
            </form>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '18px 14px', background: 'rgba(34,197,94,0.06)', border: '1.5px solid #22c55e', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '22px', fontWeight: 700 }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Site Visit Booked Successfully!
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px', lineHeight: 1.5 }}>
                Thank you <strong>{formData.name}</strong>! Your free site visit for <strong>{shortName}</strong> is scheduled for <strong>{formData.visitDate} ({formData.timeSlot})</strong>. Our team will contact you shortly to confirm details.
              </p>
              <a
                href={project.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--er-gold, #C58B2D)', color: '#ffffff', fontWeight: 700, fontSize: '13.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(198,138,40,0.35)', transition: 'all 0.3s ease', marginBottom: '8px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Project Brochure PDF</span>
              </a>
            </div>
          )}

          {msg.text && (
            <p className={`er_form-msg ${msg.type === 'error' ? 'er_error' : 'er_success'}`} style={{ marginTop: '8px' }}>
              {msg.text}
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', margin: '10px 0 4px' }}>
            Guided Plot Inspection • Instant Confirmation • 100% Secure
          </p>
        </div>

        {/* Footer Bar */}
        <div className="er_modal-footer-bar">
          <div className="er_trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>{project.trustBadges?.[0] ? project.trustBadges[0].split(' ')[0] : '100%'}<br />{project.trustBadges?.[0] ? project.trustBadges[0].split(' ')[1] : 'APPROVED'}</span>
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
