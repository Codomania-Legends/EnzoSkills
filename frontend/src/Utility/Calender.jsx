import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Calender({ Weeks }) {
    const [activeWeek, setActiveWeek] = useState(1);

    const currentWeekData = Weeks[activeWeek - 1];
    const activeDayKey = currentWeekData ? Object.keys(currentWeekData)[0] : null;
    const activeDaysList = currentWeekData ? currentWeekData[activeDayKey] : [];

    const [hoverDay, setHoverDay] = useState(false)

    useGSAP(() => {

        gsap.fromTo(".week",
            {
                y: -10,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 1,
            }
        )

        gsap.fromTo(".days",
            {
                y: -10,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 1,
            }
        )
    })

    return (
        <div className="flex flex-col items-center w-full mt-10">

            <div className="relative h-16 w-24">

                <div className="bg-[#5B5B5B] w-1 h-3 rounded-xs absolute -top-2 left-4 z-[100]" />
                <div className="bg-[#5B5B5B] w-1 h-3 rounded-xs absolute -top-2 right-4 z-[100]" />

                <div className="relative h-full w-full">
                    {Weeks?.map((week, index) => {
                        const isCurrent = activeWeek === index + 1;
                        return (
                            <div
                                key={index}
                                style={{ opacity: isCurrent ? "1" : "0" }}
                                className={`week absolute inset-0 w-full h-full darker-blue small-box-shadow cursor-pointer transition-all duration-300 rounded-md flex justify-center items-center ${isCurrent ? 'z-20 opacity-100 scale-100' : 'z-10 opacity-0 scale-95'
                                    }`}
                                onClick={() => setActiveWeek(activeWeek === Weeks?.length ? 1 : activeWeek + 1)}
                            >
                                <h1 className="text-white text-sm font-semibold">
                                    {Object.keys(week)[0]}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="days flex flex-col items-center gap-3 mt-4">
                {activeDaysList?.map((day, index) => (
                    <div
                        style={{
                            rotate: hoverDay ? "10deg" : "0deg",
                        }}
                        key={index}
                        onMouseEnter={() => setHoverDay(true)}
                        onMouseLeave={() => setHoverDay(false)}
                        className="text-xs white small-box-shadow rounded-md py-2 px-6 w-fit text-center cursor-pointer"
                    >
                        {day}
                    </div>
                ))}
            </div>

        </div >
    );
}

export default Calender;