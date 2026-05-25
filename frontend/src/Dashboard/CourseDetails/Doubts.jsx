import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Doubts() {
  const container = useRef(null);
  useGSAP(() => {
    gsap.fromTo(container.current, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'});
  }, { scope: container });

  return (
    <div ref={container}>Doubts</div>
  )
}

export default Doubts