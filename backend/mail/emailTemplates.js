// emailTemplates.js

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #333, #212121); padding: 20px; text-align: center;">
    <h1 style="color: #4CAF50; margin: 0;">Email Confirmation Required</h1>
  </div>
  <div style="background-color: #1e1e1e; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
    <p>Hello,</p>
    <p>Welcome to our platform! To complete your registration, we need to confirm your email address. Please use the following code:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>For security reasons, this code will expire in 15 minutes.</p>
    <p>If this wasn't you, just disregard this message.</p>
    <p>Cheers,<br>Your Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated email. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #333, #212121); padding: 20px; text-align: center;">
    <h1 style="color: #4CAF50; margin: 0;">Your Password Has Been Reset</h1>
  </div>
  <div style="background-color: #1e1e1e; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
    <p>Hi there,</p>
    <p>We’ve successfully updated your password. If this wasn't you, please let us know immediately.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>To keep your account safe, consider:</p>
    <ul style="color: #ddd; padding-left: 20px;">
      <li>Choosing a robust, unique password</li>
      <li>Activating two-factor authentication</li>
      <li>Not reusing passwords across sites</li>
    </ul>
    <p>Thank you for securing your account.</p>
    <p>Best,<br>Your Support Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated email. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #333, #212121); padding: 20px; text-align: center;">
    <h1 style="color: #4CAF50; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background-color: #1e1e1e; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
    <p>Hello,</p>
    <p>We’ve received a request to reset your password. If this wasn’t initiated by you, feel free to ignore this email.</p>
    <p>To proceed with resetting your password, click the link below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Your Password</a>
    </div>
    <p>This link will remain active for 1 hour.</p>
    <p>Best regards,<br>Your Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated email. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const ORDER_PLACED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #333, #212121); padding: 20px; text-align: center;">
    <h1 style="color: #4CAF50; margin: 0;">Order Confirmed!</h1>
  </div>
  <div style="background-color: #1e1e1e;color:white padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
    <p>Hi there,</p>
    <p>Thank you for your purchase! We’ve received your order and are getting it ready. Below are the details of your order:</p>
    <div style="margin: 20px 0;">
      <h2 style="color: #4CAF50;">Order Details</h2>
      <ul style="color: #ddd; padding-left: 20px;">
        {orderItems}
      </ul>
    </div>
    <p>Total Amount: ₹{total}</p>
    <p>Payment Id: {paymentMethod}</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your Company</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated email. Please do not reply.</p>
  </div>
</body>
</html>
`;
