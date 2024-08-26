import nodemailer from 'nodemailer';
const email = "yerrasujeethchandra@gmail.com";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	ORDER_PLACED_TEMPLATE,
} from "./emailTemplates.js";

// Create a transporter object using Gmail SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yerrasujeethchandra@gmail.com',
        pass: 'jgbs ogbh bhkh nmrc' // Use an App Password if 2-Step Verification is enabled
    }
});

export const sendVerificationEmail = async (email, verificationToken) => {
    const mailOptions = {
        from: 'yerrasujeethchandra@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully', response);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: 'yerrasujeethchandra@gmail.com',
        to: email,
        subject: 'Welcome!',
        html: `
            <p>Welcome, ${name}!</p>
            <p>Company Name: Auth Company</p>
        `
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully', response);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const mailOptions = {
        from: 'yerrasujeethchandra@gmail.com',
        to: email,
        subject: 'Reset your password',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL)
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully', response);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const mailOptions = {
        from: 'yerrasujeethchandra@gmail.com',
        to: email,
        subject: 'Password Reset Successful',
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Password reset success email sent successfully', response);
    } catch (error) {
        console.error('Error sending password reset success email:', error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

export const sendOrderConfirmationEmail = async (email, orderDetails) => {
    const orderItems = orderDetails.products.map(product => `
        <li>
            <strong>Product:</strong> ${product.name}<br>
            <strong>Quantity:</strong> ${product.quantity}<br>
            <strong>Price:</strong> $${product.price}
        </li>
    `).join('');

    const mailOptions = {
        from: 'yerrasujeethchandra@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        html: ORDER_PLACED_TEMPLATE
            .replace('{orderItems}', orderItems)
            .replace('{total}', orderDetails.total)
            .replace('{paymentMethod}', orderDetails.payment.paymentId)
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully', response);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw new Error(`Error sending order confirmation email: ${error}`);
    }
};
