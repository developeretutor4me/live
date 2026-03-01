import { sendEmail } from './emailsender';

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  try {
    await sendEmail({
      subject: 'Account Verification',
      body: `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Account</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1edff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #4b3c78;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0d7ff;
    }
    .email-header {...
      background-color: #ded3ff;
      padding: 32px;
      text-align: center;
    }
    .email-header img {
      max-height: 50px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-body h1 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #5f41b2;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #4b3c78;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #7a4df2;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #6934e3;
    }
    .email-footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #a69ac5;
    }
    a {
      color: #7a4df2;
      word-break: break-all;
    }
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 20px;
      }
      .email-body h1 {
        font-size: 22px;
      }
      .email-body p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://etutor4me.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a6d59b11.png&w=256&q=75" alt="etutor4me" />
    </div>
    <div class="email-body">
      <h1>Confirm Your Email Address</h1>
      <p>Thank you for signing up with us. To complete your registration, please verify your email address by clicking the button below:</p>
      <p style="text-align: center; color: white;">
        <a href="${verificationUrl}" class="cta-button" style="color:white;">Verify My Account</a>
      </p>
      <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>If you did not create an account with us, please disregard this email.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 etutor4me All rights reserved.
    </div>
  </div>...
</body>
</html>
`,
      recipients: [`${email}`],
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email');
  }
}

export async function sendForgotPasswordEmail(email: string, token: string) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    await sendEmail({
      subject: 'Reset Your Password',
      body: `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1edff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #4b3c78;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0d7ff;
    }
    .email-header {
      background-color: #ded3ff;
      padding: 32px;
      text-align: center;
    }
    .email-header img {
      max-height: 50px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-body h1 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #5f41b2;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #4b3c78;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #7a4df2;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #6934e3;
    }
    .email-footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #a69ac5;
    }
    a {
      color: #7a4df2;
      word-break: break-all;
    }
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 20px;
      }
      .email-body h1 {
        font-size: 22px;
      }
      .email-body p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://etutor4me.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a6d59b11.png&w=256&q=75" alt="etutor4me" />
    </div>
    <div class="email-body">
      <h1>Reset Your Password</h1>
      <p>We received a request to reset your password. Click the button below to set up a new password for your account:</p>
      <p style="text-align: center; color: white;">
        <a href="${resetUrl}" class="cta-button" style="color:white;">Reset Password</a>
      </p>
      <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 etutor4me All rights reserved.
    </div>
  </div>
</body>
</html>
`,
      recipients: [`${email}`],
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email');
  }
}

export async function assistantAdminVerificationEmail(
  email: string,
  firstName: string,
  lastName: string
) {
  const fullName = `${firstName} ${lastName}`;

  try {
    await sendEmail({
      subject: 'Assistant Admin Account Created - etutor4me',
      body: `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Assistant Admin Account Created</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1edff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #4b3c78;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0d7ff;
    }
    .email-header {
      background-color: #ded3ff;
      padding: 32px;
      text-align: center;
    }
    .email-header img {
      max-height: 50px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-body h1 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #5f41b2;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #4b3c78;
    }
    .highlight-box {
      background-color: #f8f6ff;
      border-left: 4px solid #7a4df2;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .email-footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #a69ac5;
    }
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 20px;
      }
      .email-body h1 {
        font-size: 22px;
      }
      .email-body p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://etutor4me.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a6d59b11.png&w=256&q=75" alt="etutor4me" />
    </div>
    <div class="email-body">
      <h1>Welcome to etutor4me!</h1>
      <p>Hello ${fullName},</p>
      <div class="highlight-box">
        <p><strong>Your assistant account has been created for the Assistant Admin role at etutor4me.</strong></p>
      </div>
      <p>Please contact management for further details regarding your account setup and access permissions.</p>
      <p>We're excited to have you as part of our team and look forward to working with you.</p>
      <p>Best regards,<br>The etutor4me Team</p>
    </div>
    <div class="email-footer">
      &copy; 2025 etutor4me All rights reserved.
    </div>
  </div>
</body>
</html>
`,
      recipients: [`${email}`],
    });
  } catch (error) {
    console.error('Error sending assistant admin notification email:', error);
    throw new Error('Could not send assistant admin notification email');
  }
}
