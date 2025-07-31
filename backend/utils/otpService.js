// utils/otpService.js
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"StayLuxe Hotel Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Two-Factor Authentication Code - StayLuxe Hotel',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 32px; margin: 0;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center;">
            <div style="background: rgba(255,255,255,0.2); width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 28px; color: white;">🔐</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
              Two-Factor Authentication
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">
              Executive Assistant Login
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 32px;">
            <h2 style="color: #1f2937; margin: 0 0 16px; font-size: 18px; font-weight: 600;">
              Your Security Code
            </h2>
            
            <p style="color: #6b7280; margin: 0 0 24px; font-size: 14px; line-height: 1.6;">
              To complete your login to the StayLuxe Hotel Executive Assistant portal, please enter the following 6-digit code:
            </p>

            <!-- OTP Display -->
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 2px dashed #d1d5db; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <div style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; color: #1f2937; letter-spacing: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ${otp}
              </div>
              <p style="color: #6b7280; margin: 8px 0 0; font-size: 12px; font-weight: 500;">
                Enter this code in the login form
              </p>
            </div>

            <!-- Security Notice -->
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="display: flex; align-items: flex-start;">
                <span style="color: #d97706; font-size: 16px; margin-right: 8px;">⚠️</span>
                <div>
                  <h4 style="color: #92400e; margin: 0 0 4px; font-size: 14px; font-weight: 600;">
                    Security Notice
                  </h4>
                  <p style="color: #92400e; margin: 0; font-size: 12px; line-height: 1.5;">
                    This code will expire in <strong>5 minutes</strong>. If you didn't request this code, please ignore this email and contact support immediately.
                  </p>
                </div>
              </div>
            </div>

            <!-- Instructions -->
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <h4 style="color: #0c4a6e; margin: 0 0 8px; font-size: 14px; font-weight: 600;">
                How to use this code:
              </h4>
              <ol style="color: #0c4a6e; margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.6;">
                <li>Return to the login page</li>
                <li>Enter the 6-digit code above</li>
                <li>Click "Verify OTP" to complete login</li>
              </ol>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 24px; text-align: center;">
              <p style="color: #9ca3af; margin: 0 0 8px; font-size: 12px;">
                StayLuxe Hotel - Executive Assistant Portal
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                This is an automated security message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ 2FA OTP email sent:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Failed to send 2FA OTP email:', error);
    throw error;
  }
};

// Export existing OTP functions for backward compatibility
export const sendOtp = async (email, phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    await sendOtpEmail(email, otp);
    return { success: true, otp };
  } catch (error) {
    console.error('OTP sending failed:', error);
    return { success: false, error: error.message };
  }
};

export const verifyOtp = async (email, otp) => {
  // This would typically verify against stored OTP
  // For now, we'll return a mock verification
  return { success: true, message: 'OTP verified successfully' };
};
