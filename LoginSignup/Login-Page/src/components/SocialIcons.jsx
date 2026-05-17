 import React from 'react';
import '../styles/SocialIcons.css';
import { FaLinkedinIn, FaGoogle, FaGithub } from 'react-icons/fa';

function SocialIcons() {
  return (
    <div className="social-icons">
      <div className="icon">
        <FaLinkedinIn />
      </div>

      <div className="icon">
        <FaGoogle />
      </div>

      <div className="icon">
        <FaGithub />
      </div>
    </div>
  );
}

export default SocialIcons;