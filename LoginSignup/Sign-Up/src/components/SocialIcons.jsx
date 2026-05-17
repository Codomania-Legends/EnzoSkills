import React from 'react';
import '../styles/SocialIcons.css';

import { FaLinkedinIn, FaGoogle, FaGithub } from 'react-icons/fa';

function SocialIcons() {
  return (
    <div className="social-icons">

      <a href="#">
        <FaLinkedinIn />
      </a>

      <a href="#">
        <FaGoogle />
      </a>

      <a href="#">
        <FaGithub />
      </a>

    </div>
  );
}

export default SocialIcons;