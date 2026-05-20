import React, { useEffect } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText);

function TitleAnimation(timeline, className = "titleAnimation") {
    console.log(className)
    const split = new SplitText(`.${className}`, { type: "chars", });

    if (timeline) {
        timeline.from(split.chars, {
            y: -50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.2,
            ease: "power2.out",
        })
    } else {
        gsap.from(split.chars, {
            y: -50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.2,
            ease: "power2.out",
        })
    }
}

export default TitleAnimation