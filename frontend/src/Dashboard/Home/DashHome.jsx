import React, { useRef, Suspense } from 'react';
import Greet from './Greet';
import CourseProgress from './CourseProgress';
import ProgressBox from './ProgressBox';
// import { useUser } from '../../Utility/UserDetails';
import { useCourse } from '../../Utility/Course';
import { useUser } from '../../Utility/UserDetails';

// 🚀 Dynamically import the heavy graph so it doesn't block the page load!
const LazyActivityGraph = React.lazy(() => import('./ActivityGraph'));

function DashHome() {
  const containerRef = useRef(null);

  const { myCourses } = useCourse()
  const { userDetails } = useUser()

  return (
    <div ref={containerRef} className='h-full overflow-y-auto md:overflow-hidden md:h-full w-full flex flex-col md:flex-row justify-start md:justify-center items-stretch md:items-center gap-6 md:gap-0 p-4 sm:p-6 md:py-0 md:px-0 box-border'>

      <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-start md:justify-around items-stretch md:items-start px-0 md:px-8 gap-6 md:gap-0'>
        <Greet />

        {/* 🧹 Removed the ghost 'slide-up' class from here */}
        <div className='h-[350px] md:h-[50%] w-full rounded-[2em] overflow-y-scroll py-6 px-6 sm:px-8 [&::-webkit-scrollbar]:hidden dark-blue medium-box-shadow'>
          {myCourses
            && <CourseProgress Courses={myCourses} User={userDetails} />}
        </div>
      </div>

      <div className='h-auto md:h-full w-full md:w-1/2 flex flex-col justify-start md:justify-around items-stretch md:items-start px-0 md:px-0 gap-6 md:gap-0'>
        <ProgressBox />

        {/* ⏳ The Suspense wrapper shows a fallback UI while the chart library loads */}
        <Suspense fallback={<div className="w-full md:w-[95%] h-64 rounded-[2em] flex justify-center items-center text-gray-400 bg-[#212121] small-box-shadow">Loading Chart...</div>}>
          <LazyActivityGraph />
        </Suspense>
      </div>
    </div>
  );
}

export default DashHome;