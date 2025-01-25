import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ message: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setFeedback({ message: '', error: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ message: 'A password reset link has been sent to your email.', error: '' });
      } else {
        setFeedback({ message: '', error: data.message || 'Failed to send reset email.' });
      }
    } catch (error) {
      setFeedback({
        message: '',
        error: error.message === 'Failed to fetch'
          ? 'Server is unavailable. Please try again later.'
          : 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Enter your email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {feedback.message && <p className="success-message">{feedback.message}</p>}
        {feedback.error && <p className="error-message">{feedback.error}</p>}
        <button type="submit" className="send-reset-link-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
