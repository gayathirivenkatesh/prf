import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';

const router = express.Router();

// Generate password reset token
const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email format
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the user exists in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = generateResetToken(email);

    // Create reset link
    const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

    // Configure nodemailer to send the reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Email service (adjust as needed)
      auth: {
        user: process.env.SMTP_USER, // Email address sending the emails
        pass: process.env.SMTP_PASS, // Email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER, // Sender's email
      to: email, // Recipient's email
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'A password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Error in forgot-password route:', error.message);
    res.status(500).json({ message: 'Error sending reset email. Please try again.' });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Validate inputs
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by email
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been updated successfully.' });
  } catch (error) {
    console.error('Error in reset-password route:', error.message);
    res.status(500).json({ message: 'Error resetting the password. Please try again.' });
  }
});

export default router;
