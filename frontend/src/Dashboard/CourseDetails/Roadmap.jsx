import React, { useEffect, useRef } from 'react';
import "./style.css";
import { useCourse } from '../../Utility/Course';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

function WeekBanner({ weekTitle, weekStart }) {
  return (
    <div className="week-banner">
      <div className="week-banner-inner purple small-box-shadow">
        <span className="week-label">{weekStart}</span>
        <span className="week-title">{weekTitle}</span>
      </div>
    </div>
  );
}

function RoadmapNode({ level, index, isLast }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="roadmap-row">
      {/* Connector line running vertically */}
      {!isLast && <div className="vertical-connector" />}

      <div className={`roadmap-node-wrapper ${isLeft ? 'align-left' : 'align-right'}`}>
        {/* Achievement tag above the node */}
        {level.achievement && (
          <div className="achievement-badge">
            <span className="achievement-icon">🏆</span>
            {level.achievement}
          </div>
        )}

        {/* Week banner */}
        {level.weekStart && (
          <WeekBanner weekStart={level.weekStart} weekTitle={level.weekTitle} />
        )}

        {/* Node card */}
        <div className="node-card small-box-shadow white">
          <div className="node-number">{level.levelNumber}</div>
          <div className="node-content">
            <p className="node-topic">{level.topic}</p>
          </div>
          <div className="node-dot" />
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  const { currentCourse } = useCourse();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentCourse?.roadmap) return;

    let ctx = gsap.context(() => {
      // Animate each row as it comes into view
      gsap.utils.toArray(".roadmap-row").forEach((row, index) => {
        // Alternating slide direction based on alignment
        const isLeft = index % 2 === 0;

        gsap.from(row, {
          x: isLeft ? -50 : 50, // Slide from left for left nodes, right for right nodes
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            scroller: ".roadmap-scroll-container", // Important: targeting the scrollable div
            start: "10% 85%", // Trigger when top of row hits 85% of viewport
            toggleActions: "play none none reverse", // Reverses when scrolling back up
          },
        });
      });

      // Optional: Add a subtle pop-in animation to the finish marker
      gsap.from(".finish-marker", {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".finish-marker",
          scroller: ".roadmap-scroll-container",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });

    }, containerRef); // Scope the GSAP context to the container

    return () => ctx.revert(); // Proper cleanup for React Strict Mode
  }, [currentCourse]);

  return (
    <div ref={containerRef} className="roadmap-root">
      {/* Header */}
      <div className="flex slide_up items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/dashboard/courses")}>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
        <h1 className="text-xl text-left font-semibold">
          {currentCourse?.course_name || 'Loading Roadmap…'}
        </h1>
      </div>

      {/* Scrollable track */}
      <div className="roadmap-scroll-container">
        {currentCourse && (
          <div className="roadmap-track">
            {/* Central spine */}
            <div className="spine" />

            {currentCourse.roadmap?.map((level, index) => (
              <RoadmapNode
                key={level.id}
                level={level}
                index={index}
                isLast={index === currentCourse.roadmap.length - 1}
              />
            ))}

            {/* Finish marker */}
            <div className="finish-marker black small-box-shadow-black">
              <span className='text-white'>🎓</span>
              <p className='text-white'>Course Complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Roadmap;