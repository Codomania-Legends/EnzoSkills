import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Calender({ Weeks, onDaySelect }) {
    const containerRef = useRef();
    const [activeWeekIndex, setActiveWeekIndex] = useState(1);

    const [hoveredDayIndex, setHoveredDayIndex] = useState(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);

    const currentWeekData = Weeks[activeWeekIndex - 1];
    const activeWeekName = currentWeekData ? Object.keys(currentWeekData)[0] : null;
    const activeDaysList = currentWeekData ? currentWeekData[activeWeekName] : [];

    useGSAP(() => {
        gsap.fromTo(".week",
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1 }
        );

        gsap.fromTo(".day-item",
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1 }
        );
    }, { dependencies: [activeWeekIndex], scope: containerRef });

    const handleDayClick = (index, dayName) => {
        setSelectedDayIndex(index);
        if (onDaySelect) {
            onDaySelect(activeWeekName, dayName);
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center w-full mt-2">
            <div className="relative h-16 w-24">
                <div className="bg-[#5B5B5B] w-1 h-3 rounded-xs absolute -top-2 left-4 z-[100]" />
                <div className="bg-[#5B5B5B] w-1 h-3 rounded-xs absolute -top-2 right-4 z-[100]" />

                <div className="relative h-full w-full">
                    {Weeks?.map((week, index) => {
                        const isCurrent = activeWeekIndex === index + 1;
                        return (
                            <div
                                key={index}
                                style={{ opacity: isCurrent ? "1" : "0" }}
                                className={`week absolute inset-0 w-full h-full darker-blue small-box-shadow cursor-pointer transition-all duration-300 rounded-md flex justify-center items-center ${isCurrent ? 'z-20 opacity-100 scale-100' : 'z-10 opacity-0 scale-95'}`}
                                onClick={() => {
                                    setActiveWeekIndex(activeWeekIndex === Weeks?.length ? 1 : activeWeekIndex + 1);
                                    setSelectedDayIndex(null); // Reset day selection when week changes
                                }}
                            >
                                <h1 className="text-white text-sm font-semibold">
                                    {Object.keys(week)[0]}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="days flex flex-col items-start gap-3 mt-4 w-fit">
                {activeDaysList?.map((dayName, index) => (
                    <div
                        key={index}
                        style={{
                            rotate: hoveredDayIndex === index ? "10deg" : "0deg",
                        }}
                        onClick={() => handleDayClick(index, dayName)}
                        onMouseEnter={() => setHoveredDayIndex(index)}
                        onMouseLeave={() => setHoveredDayIndex(null)}
                        className={`day-item text-xs white small-box-shadow rounded-md py-2 px-6 w-full text-left cursor-pointer transition-all ${selectedDayIndex === index ? 'bg-gray-200 font-bold scale-105' : ''}`}
                    >
                        {dayName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calender;