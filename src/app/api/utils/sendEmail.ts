import { sendEmail } from './emailsender';

export async function sendVerificationEmail(email: string, token: string, firstName: string = '') {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || '').replace(/\/+$/, '');
  const verificationUrl = `${baseUrl}/verify?token=${token}`;
  const displayName = firstName || 'there';

  try {
    await sendEmail({
      subject: 'One Last Step — Verify Your Email | eTutor4Me',
      body: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f0fa;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f0fa;">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Hero Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#c4b5fd 100%);padding:0;position:relative;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 30px 0 30px;">
                    <img src="https://etutor4me.com/_next/static/media/logo.a6d59b11.png" alt="eTutor4Me" style="height:28px;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 30px 30px 30px;">
                    <h1 style="margin:0;font-size:36px;font-weight:800;color:#ffffff;line-height:1.1;text-transform:uppercase;font-family:'Segoe UI',Impact,sans-serif;">ONE LAST<br/>STEP</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 30px 30px 30px;">
              <p style="margin:0 0 16px;font-size:16px;color:#4b3c78;">Hi ${displayName},</p>
              <p style="margin:0 0 16px;font-size:15px;color:#4b3c78;line-height:1.6;">
                Welcome to <strong>eTutor4me!</strong> We're excited to have you on board.
                Before we can fully activate your account, we just need to confirm your email address.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#4b3c78;line-height:1.6;">
                Please click the button below to verify your email and unlock access to your dashboard, learning tools, and more.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:30px;background:linear-gradient(90deg,#f97316,#a855f7);">
                    <a href="${verificationUrl}" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">Verify My Email</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:14px;color:#6b5b95;line-height:1.5;">
                Didn't sign up for <strong>eTutor4Me</strong>? You can safely ignore this email.
              </p>
              <p style="margin:0;font-size:14px;color:#6b5b95;">See you inside,</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="background-color:#ffffff;padding:0 30px;">
              <hr style="border:none;border-top:1px solid #e8e0f5;margin:0;" />
            </td>
          </tr>

          <!-- Services Section -->
          <tr>
            <td style="background-color:#ffffff;padding:30px;">
              <h2 style="margin:0 0 8px;font-size:24px;color:#7c3aed;font-weight:800;">Our Best Services</h2>
              <p style="margin:0 0 24px;font-size:13px;color:#6b5b95;line-height:1.5;">
                These are the features students love the most, built to help you learn faster, smarter, and with confidence.
              </p>

              <!-- Service 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="50" valign="top" style="padding-right:14px;">
                    <div style="width:44px;height:44px;background-color:#ede9fe;border-radius:10px;text-align:center;line-height:44px;font-size:20px;">👩‍🏫</div>
                  </td>
                  <td valign="top">
                    <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#4b3c78;">Qualified eTutors</p>
                    <p style="margin:0;font-size:13px;color:#6b5b95;line-height:1.4;">Get matched with experienced eTutors specialized in every subject and grade level.</p>
                  </td>
                </tr>
              </table>

              <!-- Service 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="50" valign="top" style="padding-right:14px;">
                    <div style="width:44px;height:44px;background-color:#ede9fe;border-radius:10px;text-align:center;line-height:44px;font-size:20px;">📅</div>
                  </td>
                  <td valign="top">
                    <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#4b3c78;">Flexible Scheduling</p>
                    <p style="margin:0;font-size:13px;color:#6b5b95;line-height:1.4;">Book sessions that fit your routine — after school, weekends, or even last-minute before exams.</p>
                  </td>
                </tr>
              </table>

              <!-- Service 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50" valign="top" style="padding-right:14px;">
                    <div style="width:44px;height:44px;background-color:#ede9fe;border-radius:10px;text-align:center;line-height:44px;font-size:20px;">💎</div>
                  </td>
                  <td valign="top">
                    <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#4b3c78;">Multiple Plan Options</p>
                    <p style="margin:0;font-size:13px;color:#6b5b95;line-height:1.4;">From pay-as-you-go to flexible bundles and premium memberships, choose what works best for you.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#1e1b3a" style="background-color:#1e1b3a;padding:24px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="https://etutor4me.com/_next/static/media/logo.a6d59b11.png" alt="eTutor4Me" style="height:24px;margin-bottom:8px;" />
                    <p style="margin:4px 0 0;font-size:12px;color:#a09abc;">www.eTutor4me.com</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;font-size:12px;color:#a09abc;">contact@etutor4me.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      recipients: [email],
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email');
  }
}

export async function sendForgotPasswordEmail(email: string, token: string) {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || '').replace(/\/+$/, '');
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

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
      &copy; ${new Date().getFullYear()} etutor4me All rights reserved.
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
      &copy; ${new Date().getFullYear()} etutor4me All rights reserved.
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
