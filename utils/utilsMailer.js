const nodemailer=require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (toEmail, otp, resetLink="yo") => {
  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. You can complete this request in one of two ways:</p>
        
        <h3>Option 1: Click the instant reset link</h3>
        <p>If you are on the same browser/device that requested this reset, click below to set a new password directly:</p>
        <p>
          <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 4px;">
            Reset Password Instantly
          </a>
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

        <h3>Option 2: Use the manual OTP</h3>
        <p>If you opened this email on another device, copy and enter this 6-digit OTP in your original tab:</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #007bff; background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 4px;">
          ${otp}
        </div>
        
        <p style="margin-top: 20px; font-size: 12px; color: #777;">
          This code and link will expire in 10 minutes. If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports=sendResetEmail;