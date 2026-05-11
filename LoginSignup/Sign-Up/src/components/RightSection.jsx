 import React from 'react';
import '../styles/RightSection.css';

import books from '../assets/books.jpg';
import books2 from '../assets/books2.jpg';

function RightSection() {
  return (
    <div className="right-section">
        

      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>
      <div className="circle c4"></div>
      <div className="circle c5"></div>
      <div className="circle c6"></div>
      <div className="circle c7"></div>

      <div className="welcome-text">
        <h4>Welcome Back</h4>
        <h5>to</h5>
        <h2>EnzoSkills</h2>
      </div>

      <div className="right-shadow-circle"></div>
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

export default RightSection;