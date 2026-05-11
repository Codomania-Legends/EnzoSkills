 import React from 'react';
import '../styles/SignupForm.css';
import SocialIcons from './SocialIcons';

function SignupForm() {
  return (
    <div className="signup-container">

      <div className="signup-box">

        <h1>Signup</h1>
        <p className="small-text">Sign up to continue</p>

        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Email</label>
        <input type="email" placeholder="Enter email" />

        <label>Password</label>
        <input type="password" placeholder="*****" />

        <div className="bottom-links">
          <span>Already a User?</span>
          <span>Login</span>
        </div>

        <button>Signup</button>

        <SocialIcons />
          <div className="corner"></div>

      </div>

    </div>
  );
}

export default SignupForm;