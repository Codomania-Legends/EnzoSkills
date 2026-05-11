 import React from 'react';
import '../styles/LeftSection.css';

import books from '../assets/books.jpg';
import books2 from '../assets/books2.jpg';

function LeftSection() {
  return (
    <div className="left-section">

      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>
      <div className="circle c4"></div>
      <div className="circle c5"></div>
      <div className="circle c6"></div>
      <div className="circle c7"></div>

      <div className="welcome-text">
        <h2>Welcome Back</h2>
        <h3>to</h3>
        <h1>EnzoSkills</h1>
      </div>

      <div className="left-shadow-circle"></div>
      <div className="big-shadow-circle"></div>

      <div className="image1">
        <img src={books} alt="books" />
      </div>

      <div className="image2">
        <img src={books2} alt="books" />
      </div>

    </div>
  );
}

export default LeftSection;