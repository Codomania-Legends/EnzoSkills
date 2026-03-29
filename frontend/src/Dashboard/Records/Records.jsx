import React from 'react'
import "./Records.css"
function Records() 
{
  return (
    <>
      <div className='re'>
        <span id='history'><i class="fa-solid fa-arrow-left"></i><b>History</b></span>
        <div className='record'>
          <div id='box'>
          <div className='boxes'>
            <span id='days'><b>Day 1 <br />C/C++</b>  <i class="fa-solid fa-bars" style={{color: 'rgba(35, 35, 35, 0.79)'}}></i></span>
            <span id='tasks'><i class="fa-solid fa-check" style={{color: 'rgb(0, 139, 2)'}}></i> 5/6 Tasks</span><span id='badges'><img className='silver' src="/Dashboard/Records/silver.png"/><b>Silver</b></span>
            <span id='score'><i class="fa-regular fa-calendar" style={{color: 'rgb(84, 84, 84)'}}></i> Score</span><span id='percent'>82%</span>
          </div>
          <div className='boxes'>
            hello
          </div>
          <div className='boxes'>
            hello
          </div>
          <div className='boxes'>
            hello
          </div>
          </div>
          <div id='box'>
            <div className='boxes'>
            hello
          </div>
          <div className='boxes'>
            hello
          </div>
          <div className='boxes'>
            hello
          </div>
          <div className='boxes'>
            hello
          </div>
          </div>
        </div>
        <div className='records'>
          <span id='reward'><b>Recent Achievement</b></span>
          <img className='image' src="/Dashboard/Records/badges.png"  />
          <b id='earned'>You earned the Gold Badge in JavaScript</b>
          <p id='key'>Consistency is the key!</p>
          <p id='view'>View all accomplishments</p>
        </div>
      </div>
      
    </>
  )
}

export default Records