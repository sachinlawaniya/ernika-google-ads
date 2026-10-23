import React, { useState, useEffect, useRef } from 'react';
import { sendOtp, verifyOtp } from '../utils/otpService.js';

export default function OtpVerificationView({
  phone,
  onVerified,
  onChangePhone,
  buttonText = 'Verify OTP & Continue',
  theme = 'default', // 'default' | 'modal' | 'dark' | 'quick'
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState(`OTP sent to +91 ${phone}`);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Auto-focus first digit on mount
  useEffect(() => {
    const t = setTimeout(() => {
      inputRefs[0]?.current?.focus();
    }, 150);
    return () => clearTimeout(t);
  }, []);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (index, value) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);
    setErrorMsg('');

    if (clean && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newOtp = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setErrorMsg('');

    if (pasted.length === 6) {
      inputRefs[5]?.current?.focus();
    } else {
      inputRefs[Math.min(pasted.length, 5)]?.current?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || resending) return;
    setResending(true);
    setErrorMsg('');
    setInfoMsg('Sending new OTP...');

    const res = await sendOtp(phone);
    setResending(false);

    if (res.success) {
      setTimer(60);
      setCanResend(false);
      setInfoMsg(`🔄 New OTP sent to +91 ${phone}`);
      setOtp(['', '', '', '', '', '']);
      inputRefs[0]?.current?.focus();
    } else {
      setErrorMsg(res.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP');
      const firstEmptyIndex = otp.findIndex((d) => !d);
      if (firstEmptyIndex !== -1) {
        inputRefs[firstEmptyIndex]?.current?.focus();
      }
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await verifyOtp(phone, enteredOtp);
    setLoading(false);

    if (res.success) {
      if (typeof onVerified === 'function') {
        onVerified();
      }
    } else {
      setErrorMsg(res.message || 'Incorrect OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs[0]?.current?.focus();
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`gp_otp_verification_view ${isDark ? 'gp_otp_dark' : ''}`}
      style={{
        padding: '16px 12px',
        textAlign: 'center',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(248, 250, 252, 0.9)',
        borderRadius: '12px',
        border: isDark ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid #e2e8f0',
        margin: '6px 0',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: isDark ? 'rgba(212,175,55,0.15)' : '#fef3c7',
            color: '#c68a28',
            fontSize: '17px',
            marginBottom: '6px',
          }}
        >
          <i className="fas fa-mobile-alt"></i>
        </div>
        <h4
          style={{
            margin: '0 0 4px',
            fontSize: '16px',
            fontWeight: 700,
            color: isDark ? '#ffffff' : '#1e293b',
            letterSpacing: '0.2px',
          }}
        >
          Verify Mobile Number
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: '12.5px',
            color: isDark ? '#cbd5e1' : '#64748b',
          }}
        >
          Enter 6-digit OTP sent to{' '}
          <strong style={{ color: isDark ? '#f6d365' : '#c68a28' }}>+91 {phone}</strong>
        </p>
      </div>

      {infoMsg && !errorMsg && (
        <div
          style={{
            fontSize: '11.5px',
            color: '#16a34a',
            background: 'rgba(22, 163, 74, 0.08)',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          <i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i>
          {infoMsg}
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            fontSize: '12px',
            color: '#dc2626',
            background: 'rgba(220, 38, 38, 0.08)',
            padding: '6px 12px',
            borderRadius: '6px',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          <i className="fas fa-exclamation-circle" style={{ marginRight: '4px' }}></i>
          {errorMsg}
        </div>
      )}

      {/* 6 OTP Input Boxes */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(4px, 1.8vw, 8px)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '14px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={idx === 0 ? handlePaste : undefined}
            style={{
              width: 'clamp(34px, 9vw, 42px)',
              height: 'clamp(42px, 11vw, 48px)',
              textAlign: 'center',
              fontSize: 'clamp(18px, 4.5vw, 22px)',
              fontWeight: 700,
              borderRadius: '8px',
              border: isDark ? '1.5px solid rgba(212,175,55,0.4)' : '1.5px solid #cbd5e1',
              background: isDark ? 'rgba(0,0,0,0.4)' : '#ffffff',
              color: isDark ? '#ffffff' : '#0f172a',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
              padding: 0,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#c68a28';
              e.target.style.boxShadow = '0 0 0 3px rgba(198,138,40,0.25)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = isDark ? 'rgba(212,175,55,0.4)' : '#cbd5e1';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
            }}
          />
        ))}
      </div>

      {/* Resend OTP Bar */}
      <div
        style={{
          fontSize: '12px',
          color: isDark ? '#94a3b8' : '#64748b',
          marginBottom: '14px',
        }}
      >
        {!canResend ? (
          <span>
            Resend OTP in{' '}
            <strong style={{ color: isDark ? '#f6d365' : '#c68a28', fontWeight: 700 }}>
              {formatTimer(timer)}
            </strong>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            style={{
              background: 'transparent',
              border: 'none',
              color: isDark ? '#f6d365' : '#c68a28',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '12.5px',
              padding: '6px 8px',
            }}
          >
            {resending ? 'Sending...' : 'Resend OTP Now'}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '46px',
            padding: '12px 18px',
            background: 'linear-gradient(135deg, #c68a28 0%, #b3781f 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(198,138,40,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              <span>Verifying OTP...</span>
            </>
          ) : (
            <>
              <i className="fas fa-shield-alt"></i>
              <span>{buttonText}</span>
            </>
          )}
        </button>

        {typeof onChangePhone === 'function' && (
          <button
            type="button"
            onClick={onChangePhone}
            style={{
              background: 'transparent',
              border: 'none',
              color: isDark ? '#94a3b8' : '#64748b',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '6px',
            }}
          >
            ← Change Mobile Number
          </button>
        )}
      </div>
    </div>
  );
}
