import React from "react";
import "./Text.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Text() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log(show);
  }, [show]);
  return (
    <div
      className="textDiv"
      // Ends when you leave the whole area
    >
      <span className="text1">Start Guessing</span>
      <br />
      <span className="text2">
        Start <span className="master">Mastering.</span>
      </span>
      <br />
      <div
        onMouseEnter={() => setShow(true)} // Hover starts here
        onMouseLeave={() => setShow(false)}
        className="hoverme"
      >
        {/* Main Button */}
        <button
          onMouseEnter={() => setShow(true)} // Hover starts here
          onMouseLeave={() => setShow(false)}
          className="btn-learnMore"
        >
          Learn More
        </button>

        {/* Ghost Buttons */}
        <button
          className={`btn-learnMore ${show ? "btn-back-show-1" : "btn-back-hide"}`}
        >
          <span style={{ opacity: 0 }}>Learn More</span>
        </button>
        <button
          className={`btn-learnMore ${show ? "btn-back-show-2" : "btn-back-hide"}`}
        >
          <span style={{ opacity: 0 }}>Learn More</span>
        </button>
      </div>
    </div>
  );
}
