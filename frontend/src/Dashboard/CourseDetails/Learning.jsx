import React from 'react'
import Calender from '../../Utility/Calender'

function Learning() {
  const weeks = [
    { week1: ["Test 1", "Test 2"] },
    { week2: ["Test 3", "Test 4"] },
    { week3: ["Test 5", "Test 6"] },
    { week4: ["Test 7", "Test 8"] }
  ]
  return (
    <div>
      <Calender Weeks={weeks} />
    </div>
  )
}

export default Learning