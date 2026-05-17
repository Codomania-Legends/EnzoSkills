import React from "react";
import "./Assessment.css";

function Assessment() {
  return (
    <div className="assessment">
      <div className="headings">
        <i className="fa-solid fa-arrow-left"></i>
        <b>Fundamentals of JavaScript</b>
      </div>
      <div className="mainSection">
        <div className="testSection medium-box-shadow white">
          <div className="weekbox">
                week1 Day1
          </div>
          <div className="testContent">
            <h2><b>Your Assessment Test 1 : JS Basics</b></h2>
            <div className="btnBox">
              <button className="learnBtn small-box-shadow green">
                Learn for Test
              </button>
              <button className="startBtn small-box-shadow blue">
                Start Test
              </button>
            </div>
          </div>
          <div className="arrowBox">
            <button>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
        <div className="bottomSection">
          <div className="finalBox ">
            <button>
              Final Assessment
            </button>
          </div>
          <div className="quoteBox">
            <h2>
              Test is about to challenge how much you have learned.
            </h2>
            <h1>
              NOT 
            </h1>
            <h2>
              to judge your FUTURE.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;