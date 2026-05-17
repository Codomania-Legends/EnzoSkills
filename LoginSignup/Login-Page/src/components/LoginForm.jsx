import React from 'react';
import '../styles/LoginForm.css';
import SocialIcons from './SocialIcons';

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="*****" />

        <div className="links">
          <span>Forgot Password?</span>
          <span>New User!</span>
        </div>
         <button>Login</button>

        <p>
          Don’t have an account? <span>sign up</span>
        </p>

        <SocialIcons />
      </div>
    </div>
  );
}

export default LoginForm;