import React from "react";

function Card(props) {
  return (
    /* Fixed Card layout constraints:
      - Laptop/Desktop: h-55 w-55
      - Mobile (max-md): w-full h-auto to dynamically breathe with text row wrap breaking.
    */
    <div className="h-55 w-55 max-md:w-full max-md:h-auto overflow-hidden rounded-3xl p-[15px] relative small-box-shadow white bg-white flex flex-col justify-between">
      <div>
        {/* .top */}
        <div className="flex justify-between items-center">
          {/* .day */}
          <span className="text-sm">
            <b>
              {props.day} <br />
              {props.course}
            </b>
          </span>
          <i className="fa-solid fa-bars text-sm text-gray-600"></i>
        </div>

        {/* .line */}
        <div className="h-[1px] w-full bg-[#7a85bc] mt-[15px]"></div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {/* .taskSection */}
        <div className="flex justify-between items-center">
          {/* .tasks */}
          <span className="text-[#465abdb8] text-[12px] flex items-center gap-1">
            <i className="fa-solid fa-check"></i>
            <span>5/6 Tasks</span>
          </span>

          {/* .badges */}
          <span className="flex items-center gap-[5px]">
            <img className="h-4 w-auto object-contain" src={props.badgeImage} alt="Badge" />
            <b className="text-sm">{props.badge}</b>
          </span>
        </div>

        {/* .level */}
        <div className="h-[8px] w-full bg-[#c1c2c4] rounded-[10px]">
          <div className="h-[8px] w-[80%] bg-[#7a85bc] rounded-[10px]"></div>
        </div>

        {/* .scoreSection */}
        <div className="flex justify-between text-sm">
          <span className="score flex items-center gap-1">
            <i className="fa-regular fa-calendar"></i> Score
          </span>
          <span className="percent font-bold">82%</span>
        </div>

        {/* .star */}
        <div className="flex items-center gap-[3px]">
          <img className="h-[12px] w-[12px]" src="/Records/star.svg" alt="star" />
          <img className="h-[12px] w-[12px]" src="/Records/star.svg" alt="star" />
          <img className="h-[12px] w-[12px]" src="/Records/star.svg" alt="star" />
          <img className="h-[12px] w-[12px]" src="/Records/star.svg" alt="star" />
          <img className="h-[12px] w-[12px]" src="/Records/star.svg" alt="star" />
          <b className="text-xs ml-1">4.0</b>
        </div>

        {/* .review */}
        <span className="block text-[13px] text-[rgba(29,29,29,0.847)] line-clamp-1">
          Review: Good understanding
        </span>
      </div>
    </div>
  );
}

function Records() {
  const data = [
    { day: "Day 1", course: "C/C++", badge: "Silver", badgeImage: "/Records/silver.png" },
    { day: "Day 2", course: "JavaScript", badge: "Silver", badgeImage: "/Records/silver.png" },
    { day: "Day 3", course: "Java (Core+Advance)", badge: "Gold", badgeImage: "/Records/gold.png" },
    { day: "Day 4", course: "Node js", badge: "Gold", badgeImage: "/Records/gold.png" },
    { day: "Day 5", course: "React js", badge: "Bronze", badgeImage: "/Records/bronze.png" },
    { day: "Day 6", course: "Web Development", badge: "Bronze", badgeImage: "/Records/bronze.png" },
    { day: "Day 7", course: "Database Management", badge: "Silver", badgeImage: "/Records/silver.png" },
    { day: "Weekly", course: "Assessment", badge: "Silver", badgeImage: "/Records/silver.png" },
  ];

  return (
    /* Parent container scroll fix:
      - Added `max-md:h-screen max-md:overflow-y-auto max-md:pb-20` -> This isolates mobile scrolling so touch gestures never freeze.
      - Added `box-border` to prevent absolute layout breakouts.
    */
    <div className="w-full h-[90%] max-md:h-screen max-md:overflow-y-auto box-border">
      
      {/* Main Layout Wrapper:
        - Desktop: `flex justify-between relative`
        - Mobile: `flex flex-col gap-6 pt-16 px-4` -> Safely pushes content below the layout absolute header.
      */}
        <div className="flex items-center gap-4 mb-5">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
          <h1 className="text-3xl font-bold text-gray-900">My Records</h1>
        </div>
      <div className="flex flex-col md:flex-row justify-between w-full relative gap-6 md:gap-0 max-md:pt-14 max-md:px-4">
        
        {/* #history Heading Segment:
          - Mobile safely resets to relative document placement layout flow so `absolute` position coordinates do not cause overlapping text structures.
        */}

        {/* .record Main Grid Container:
          - Desktop (md and up): Locked to strict original metrics `h-[68vh] w-[65vw] grid-cols-4`
          - Mobile (max-md): Switches to fluid auto heights (`h-auto w-full`) and grids cleanly into columns.
        */}
        <div className="h-[68vh] w-[65vw] max-md:w-full max-md:h-auto grid grid-cols-4 max-md:grid-cols-1 sm:max-md:grid-cols-2 gap-[18px]">
          {data.map((item, index) => (
            <Card
              key={index}
              day={item.day}
              course={item.course}
              badge={item.badge}
              badgeImage={item.badgeImage}
            />
          ))}
        </div>

        {/* .records Right Achievement Panel:
          - Desktop: `h-[60vh] w-[19vw]`
          - Mobile: Stacks underneath the grid seamlessly as a full-width clean dashboard card (`w-full h-auto p-6 mt-4`).
        */}
        <div className="flex flex-col items-center justify-evenly h-[60vh] w-[19vw] max-md:w-full max-md:h-auto max-md:p-6 max-md:gap-4 max-md:mt-4 rounded-4xl small-box-shadow white bg-white relative">
          <span className="flex pl-8 max-md:pl-0 items-end w-full">
            <b>Recent Achievement</b>
          </span>

          {/* .image */}
          <img className="h-[30vh] w-[14vw] max-md:h-44 max-md:w-auto object-contain" src="/Records/badges.png" alt="Badges" />

          {/* #image overlay */}
          <img className="h-[60px] w-[60px] absolute top-37 max-md:top-24 object-contain" src="/Records/java.png" alt="Java" />

          {/* #earned */}
          <b className="w-full text-md font-extrabold text-center px-4">You earned the Gold Badge in JavaScript</b>

          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-gray-500">Consistency is the key!</p>
            <span className="text-sm text-indigo-600 font-semibold cursor-pointer hover:underline">View all accomplishments</span>
          </div>
        </div>

        {/* #many Bottom Navigation Scroll Indicator Trigger */}
        <div className="absolute bottom-[-60px] max-md:relative max-md:bottom-0 max-md:left-0 max-md:translate-x-0 max-md:w-full max-md:flex max-md:justify-center max-md:mt-6 left-[45%]">
          <button className="h-12 w-12 border-none rounded-full small-box-shadow blue flex items-center justify-center cursor-pointer">
            <i className="fa-solid fa-angles-down text-white text-xs"></i>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Records;