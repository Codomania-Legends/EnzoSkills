import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import { useCourse } from '../../Utility/Course';

function WeekBanner({ weekTitle, weekStart }) {
  return (
    <div className="week-banner">
      <div className="week-banner-inner">
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
        <div className="node-card">
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

  return (
    <div className="roadmap-root">
      {/* Header */}
      <div className="roadmap-header">
        <h1 className="roadmap-title">
          {currentCourse?.course_name || 'Loading Roadmap…'}
        </h1>
        {currentCourse && (
          <p className="roadmap-subtitle">
            {currentCourse.roadmap?.length} milestones · Your learning journey
          </p>
        )}
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
            <div className="finish-marker">
              <span>🎓</span>
              <p>Course Complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Roadmap;