import React, { useState, useEffect, useRef } from 'react';
import Arrow, { DIRECTION } from 'react-arrows';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./style.css";

function renderGameNode(level) {
    const isSpecialNode = level.achievement || level.weekStart;
    return (
        <div id={level.id} key={level.id} className={`node-circle ${isSpecialNode ? 'node-special' : ''}`}>
            {level.weekStart && (
                <div className="week-badge">
                    <span>{level.weekStart}: {level.weekTitle}</span>
                </div>
            )}
            <div className="orb-content">
                <span className="level-num">{level.levelNumber}</span>
                <span className="topic-text">{level.topic}</span>
            </div>
            {level.achievement && (
                <div className="achievement-tag">{level.achievement}</div>
            )}
        </div>
    );
}

function renderConnectingPath(sourceId, targetId) {
    return (
        <Arrow
            className="custom-arrow"
            from={{
                direction: DIRECTION.RIGHT,
                node: () => document.getElementById(sourceId),
                translation: [0.5, 0],
            }}
            to={{
                direction: DIRECTION.LEFT,
                node: () => document.getElementById(targetId),
                translation: [-0.5, 0],
            }}
        />
    );
}

function JavascriptHeroRoadmap() {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const container = useRef(null);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    useGSAP(() => {
        gsap.fromTo(".title-text",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
        gsap.fromTo(".node-circle", 
            { opacity: 0, scale: 0.5, y: 30 }, 
            { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
            "-=0.4"
        );
    }, { scope: container });

    const roadmapLevels = [
        { id: "lvl-1", weekStart: "Week 1", weekTitle: "Foundations", levelNumber: 1, topic: "Variables" },
        { id: "lvl-2", levelNumber: 2, topic: "Data Types" },
        { id: "lvl-3", levelNumber: 3, achievement: "JavaScript Cadet", topic: "Functions" },
        { id: "lvl-4", weekStart: "Week 2", weekTitle: "Advanced Logic", levelNumber: 4, topic: "Scope & Closures" },
        { id: "lvl-5", levelNumber: 5, topic: "Arrays & Objects" },
        { id: "lvl-6", levelNumber: 6, achievement: "Code Conductor", topic: "Control Flow" },
    ];

    return (
        <div ref={container} className='dark-board'>
            <h1 className="title-text">JavaScript Hero Journey</h1>
            <div className='path-wrapper'>
                {roadmapLevels.map((levelNode) => renderGameNode(levelNode))}

                {isComponentMounted && roadmapLevels.slice(1).map((currentLevel, index) => {
                    const previousLevel = roadmapLevels[index];
                    return renderConnectingPath(previousLevel.id, currentLevel.id);
                })}
            </div>
        </div>
    );
}

export default JavascriptHeroRoadmap;