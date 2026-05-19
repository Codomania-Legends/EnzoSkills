import React from 'react'
import "./Learning.css";

function Resource({ number, title }) {
  return (
    <div className="resource">
      <h2>{number}</h2>
      <p>{title}</p>
    </div>
  );
}
function Learning() {
  const weeks = [
    { week1: ["Test 1", "Test 2"] },
    { week2: ["Test 3", "Test 4"] },
    { week3: ["Test 5", "Test 6"] },
    { week4: ["Test 7", "Test 8"] }
  ]
  return (
    <div className='dash'>
      <div className='heading'>
          <i className="fa-solid fa-arrow-left" ></i>
          <b>Fundamentals of JavaScript</b>
      </div>
      <div className='courseContainer'>
        <div className='learningSection'>
          <div className='weekBox'>
            Week1 Day1
          </div>
          <div className='topicBox'>
            <p>• Learning & Understanding what JS is?</p>
          </div>
          <div className='resourceBox'>
            <h2><b>Resources to Learn</b></h2>
            <Resource number="1" title="JS Basics" />
            <Resource number="2" title="JS Understanding" />
            <Resource number="3" title="Data Types" />
            <Resource number="4" title="Data Types" />
            <Resource number="5" title="Data Types" />
            <Resource number="6" title="Data Types" />
          </div>
        </div>
        <div className='introSection'>
            <div className="introHeading">
            <h2><b>Introduction to JavaScript</b></h2>
            </div>
            <div className="theoryBox">
            <p>
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
              JavaScript was initially created to "make web pages alive".
              The programs in this language are called scripts. They can be
              written right in a web page’s HTML and run automatically as
              the page loads. Scripts are provided and executed as plain
              text. They don’t need special preparation or compilation to
              run.In this aspect, JavaScript is very different from
              another language called Java.
            </p>
            </div>
            <div className='btnSection'>
              <img id='downArrow' src="/Courses/Polygon_3.png" />
              <button className="roadmapBtn small-box-shadow blue">
                Roadmap
              </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Learning