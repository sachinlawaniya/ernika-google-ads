/**
 * OTP Verification and Lead Submission Service for Guru Punvaanii
 * Connects with backend otp.php and StrategicERP
 */

const OTP_API_BASE = 'https://gurupunvaanii.com/eoi-customer-form/otp.php';

/**
 * Clean and extract last 10 digits of mobile number
 */
export const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '').slice(-10);
};

/**
 * Validate 10-digit Indian mobile number starting with 6, 7, 8, or 9
 */
export const isValidIndianPhone = (phone) => {
  const clean = cleanPhoneNumber(phone);
  return /^[6-9]\d{9}$/.test(clean);
};

/**
 * Send 6-digit OTP to mobile number
 */
export const sendOtp = async (mobile) => {
  const clean = cleanPhoneNumber(mobile);
  if (!isValidIndianPhone(clean)) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit mobile number.',
    };
  }

  try {
    const res = await fetch(`${OTP_API_BASE}?action=send_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: clean }),
    });

    const data = await res.json();
    if (data && (data.success === true || data.status === 'success' || data.sent === true)) {
      return {
        success: true,
        message: data.message || `OTP sent successfully to +91 ${clean}`,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to send OTP. Please try again.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error while sending OTP. Please check connection and try again.',
    };
  }
};

/**
 * Verify 6-digit OTP
 */
export const verifyOtp = async (mobile, otp) => {
  const cleanPhone = cleanPhoneNumber(mobile);
  const cleanOtp = String(otp || '').replace(/\D/g, '').slice(0, 6);

  if (cleanOtp.length < 6) {
    return {
      success: false,
      message: 'Please enter the complete 6-digit OTP.',
    };
  }

  try {
    const res = await fetch(`${OTP_API_BASE}?action=verify_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: cleanPhone,
        otp: cleanOtp,
      }),
    });

    const data = await res.json();
    if (data && (data.success === true || data.status === 'success' || data.verified === true)) {
      return {
        success: true,
        message: data.message || 'OTP verified successfully.',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Incorrect OTP. Please check and try again.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error while verifying OTP. Please try again.',
    };
  }
};

/**
 * Format Date Time as DD/MM/YYYY HH:mm for StrategicERP
 */
export const getERPFormattedDateTime = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/**
 * Submit verified lead to StrategicERP and trigger conversion tracking
 */
export const submitLeadToERP = ({
  name = '',
  phone = '',
  email = '',
  projectName = 'Guru Punvaanii Properties',
  comments = 'Website Lead (OTP Verified)',
  source = 'Google Ads',
}) => {
  const cleanPhone = cleanPhoneNumber(phone);
  const nowStr = getERPFormattedDateTime();
  const safeName = (name || '').trim();
  const safeEmail = (email || '').trim();

  try {
    // 1. Submit lead to StrategicERP API endpoint
    const apiLeadUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(
      safeName
    )}&Email=${encodeURIComponent(safeEmail)}&MobileNo=${encodeURIComponent(
      cleanPhone
    )}&Comments=${encodeURIComponent(comments)}&ProjectName=${encodeURIComponent(
      projectName
    )}&Source=GoogleAds_LandingPage`;

    fetch(apiLeadUrl, { mode: 'no-cors' }).catch(() => {});

    // 2. Fire StrategicERP Pixel
    const erpPixelUrl =
      `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/` +
      `&field15715=${encodeURIComponent(cleanPhone)}` +
      `&field15713=${encodeURIComponent(safeName)}` +
      `&field33937=${encodeURIComponent(safeEmail)}` +
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
    erpImg.src = erpPixelUrl;

    // 3. Trigger Google Ads conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      });
    }

    return true;
  } catch (err) {
    return false;
  }
};
