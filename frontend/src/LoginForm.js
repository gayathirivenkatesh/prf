import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'adminpass') {
      onLogin('admin');
      navigate('/home');
    } else if (username === 'student' && password === 'studentpass') {
      onLogin('student');
      navigate('/student-home');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // Decode the JWT
      console.log('Google User Info:', decoded);

      // Extract email and check domain
      const email = decoded.email;
      const allowedDomain = 'bitsathy.ac.in'; // Replace with your organization's domain

      if (email.endsWith(`@${allowedDomain}`)) {
        // Check if the email belongs to a student or admin
        const emailPattern = /\.(cs|it|ec|mc|ee|ce|bt|ad|ct)(\d{2})@bitsathy\.ac\.in$/i; // Adjust departments as needed
        const isStudent = emailPattern.test(email);
        
        const userRole = isStudent ? 'student' : 'admin';
        onLogin(userRole);
        navigate(userRole === 'admin' ? '/home' : '/student-home');
      } else {
        setError(`Only users with @${allowedDomain} emails can log in.`);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGoogleLoginFailure = () => {
    setError('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId="71806838086-gtdpmf0v1vhri82g8cu9qqu2nmfanir3.apps.googleusercontent.com">
      <div className="login-container">
        <div className="form-header">
          <img src={`${process.env.PUBLIC_URL}/assets/BIT.jpeg`} alt="logo" className="logo" />
          <h1>Placement Registration Form</h1>
          <h2>Welcome Back!!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>

        <div className="login-with-account">
          <h3>Login Using Account</h3>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
