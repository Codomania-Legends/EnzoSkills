import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Hyperspeed from "./Hyperspeed";

gsap.registerPlugin(SplitText);

function App() {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(textRef.current, { type: "chars" });

    // 🎨 Static styles
    gsap.set(split.chars, {
      fontSize: 40,
      letterSpacing: 5,
      color: "black",
    });

    const tl = gsap.timeline();

    // 🖼️ Image Animation: Added Scale + Elastic Bounce
    tl.fromTo(
      imgRef.current,
      {
        opacity: 0,
        x: -30,
        y: -15,
        scale: 0.5, // Start small
        rotation: -10, // Slight tilt
        filter: "drop-shadow(0px 0px 0px rgb(255 255 255 / 80%))",
      },
      {
        ease: "elastic.out(1, 0.75)", // 🏀 Bouncy arrival
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        opacity: 1,
        filter: "drop-shadow(4px 4px 9px rgb(255 255 255 / 80%))",
      },
    )
      // 🔤 Text Animation: Cinematic Blur + Snap
      .from(
        split.chars,
        {
          opacity: 0,
          filter: "blur(10px)", // 🔥 Adds cinematic motion blur!
          scale: 0, // Explode from size 0
          x: () => gsap.utils.random(-150, 150), // Wider scatter area
          y: () => gsap.utils.random(-150, 150),
          rotation: () => gsap.utils.random(-90, 90), // More chaotic rotation
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "random",
          },
          ease: "back.out(2)", // 🧲 Magnetic snap (overshoots target slightly)
        },
        "-=1",
      ); // ⚡️ Overlap: Starts while image is still moving
    // .to(split.chars, {
    //   opacity: 0,
    //   delay: 1,
    //   x: () => gsap.utils.random(-150, 150), // Wider scatter area
    //   y: () => gsap.utils.random(-150, 150),
    //   duration: 1,
    //   filter: "blur(10px)",
    //   scale: 0,
    //   stagger: {
    //     amount: 0.6,
    //     from: "random",
    //   },
    //   ease: "back.in(2)",
    // })
    // .to(imgRef.current, {
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "power3.in",
    // });

    // 🧹 Simple cleanup to prevent duplicate text in strict mode
    return () => split.revert();
  }, []);

  return (
    <>
      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: "mountainDistortion",
          length: 400,
          roadWidth: 9,
          islandWidth: 2,
          lanesPerRoad: 3,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 50,
          lightPairsPerRoadWay: 50,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],

          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.05, 400 * 0.15],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.2, 0.2],
          carFloorSeparation: [0.05, 1],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0xff102a, 0xeb383e, 0xff102a],
            rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
            sticks: 0xdadafa,
          },
        }}
      />
      {/* ;
      <img
        ref={imgRef}
        alt="Logo"
        style={{
          height: "7em",
          position: "absolute",
          zIndex: -1,
        }}
        src="/E.png"
      />
      <span ref={textRef} style={{ fontFamily: "Prata" }}>
        Enzo Skills
      </span>*/}
      <button style={{ position: "relative", zIndex: 500 }}>Learn More</button>
    </>
  );
}

export default App;
