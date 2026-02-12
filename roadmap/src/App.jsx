import React, { useEffect, useRef } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import gsap from "gsap";

const App = () => {
  // 1. We need a reference to the element we want to move
  const level2Ref = useRef(null);
  const level3Ref = useRef(null);

  // 2. This hook gives us a function to force the line to redraw
  const updateXarrow = useXarrow();

  useEffect(() => {
    gsap.to("#level1", {
      y: () => gsap.utils.random(-100, 100), // Move down 50 pixels
      x: () => gsap.utils.random(-100, 100),
      duration: 1, // Take 2 seconds
      repeat: -1, // Repeat forever
      yoyo: true, // Go back and forth (yo-yo style)
      ease: "power1.inOut",

      // 4. THE MAGIC PART:
      // "onUpdate" runs on every single frame of the animation.
      // We call updateXarrow() here so the line sticks to the moving div.
      onUpdate: updateXarrow,
    });
    // 3. Simple GSAP Animation: Float Up and Down
    gsap.to(level2Ref.current, {
      y: () => gsap.utils.random(-100, 100), // Move down 50 pixels
      x: () => gsap.utils.random(-100, 100),
      duration: 1, // Take 2 seconds
      repeat: -1, // Repeat forever
      yoyo: true, // Go back and forth (yo-yo style)
      ease: "power1.inOut",

      // 4. THE MAGIC PART:
      // "onUpdate" runs on every single frame of the animation.
      // We call updateXarrow() here so the line sticks to the moving div.
      onUpdate: updateXarrow,
    });
    gsap.to(level3Ref.current, {
      y: () => gsap.utils.random(-100, 100), // Move down 50 pixels
      x: () => gsap.utils.random(-100, 100),
      duration: 1, // Take 2 seconds
      repeat: -1, // Repeat forever
      yoyo: true, // Go back and forth (yo-yo style)
      ease: "power1.inOut",

      // 4. THE MAGIC PART:
      // "onUpdate" runs on every single frame of the animation.
      // We call updateXarrow() here so the line sticks to the moving div.
      onUpdate: updateXarrow,
    });
  }, []);

  return (
    <div style={containerStyle}>
      {/* --- Level 1 (Static) --- */}
      <div id="level1" style={levelStyle}>
        Learn HTML
      </div>

      {/* --- Level 2 (Moving) --- */}
      <div
        id="level2"
        ref={level2Ref} // Connect the Ref here so GSAP can find it
        style={{
          ...levelStyle,
          left: "200px",
          top: "100px",
          background: "#FFC300",
        }}
      >
        Learn CSS
      </div>

      <div
        id="level3"
        ref={level3Ref} // Connect the Ref here so GSAP can find it
        style={{
          ...levelStyle,
          left: "500px",
          top: "500px",
          background: "#FFC300",
        }}
      >
        Learn JS
      </div>

      {/* --- The Magic Line --- */}
      <Xarrow
        start="level1"
        end="level2"
        color="#ff007f"
        strokeWidth={5}
        path="smooth" // This makes the "S" curve
        curveness={1} // How curvy?
        showHead={false} // Hide the arrow head
        dashness={{ animation: 1 }} // Make the dashes move!
      />
      <Xarrow
        start="level2"
        end="level3"
        color="#ff007f"
        strokeWidth={5}
        path="smooth" // This makes the "S" curve
        curveness={1} // How curvy?
        showHead={false} // Hide the arrow head
        dashness={{ animation: 1 }} // Make the dashes move!
      />
    </div>
  );
};

// --- Simple Styles for clarity ---
const containerStyle = {
  // position: "relative",
  // height: "400px",
  // background: "#f0f8ff",
  // padding: "50px",
};

const levelStyle = {
  position: "absolute",
  // width: "60px",
  // height: "60px",
  background: "#FF5733",
  // borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  zIndex: 10, // Keep levels on top of the line
};

export default App;
