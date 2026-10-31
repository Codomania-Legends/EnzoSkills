
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useUser } from '../../Utility/UserDetails';
import { useCourse } from '../../Utility/Course';
import { getOverallAverageProgress, getCourseProgress } from '../../Utility/CourseProgressHelper';

function ProgressBox() {
  const containerRef = useRef(null);
  const { userDetails } = useUser();
  const { myCourses } = useCourse();
  const userData = userDetails || { streak: 0, badges: [] };
  const [, setRefreshKey] = useState(0);

  // Live listen for progress changes
  useEffect(() => {
    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('course_progress_updated', handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);

    return () => {
      window.removeEventListener('course_progress_updated', handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
    };
  }, []);

  const overallProgress = useMemo(() => {
    if (Array.isArray(myCourses) && myCourses.length > 0) {
      return getOverallAverageProgress(myCourses);
    }
    if (Array.isArray(userDetails?.courses) && userDetails.courses.length > 0) {
      return getOverallAverageProgress(userDetails.courses);
    }
    // Fallback: check course 1 directly
    return getCourseProgress({ course_id: 1 });
  }, [myCourses, userDetails]);

  const ProgressBoxItems = [
    { name: "Streak", value: `${userData.streak || 0}`, image: "/Dashboard/Home/streak.svg" },
    { name: "Badges", value: `${userData.badges?.length || 0}`, image: "/Dashboard/Home/star.svg" },
    { name: "Progress", value: `${overallProgress}%`, image: "/Dashboard/Home/progress.svg" }
  ];


  return (
    <>
            {/* Fix: Removed the 'slide_up' class from here so GSAP doesn't get confused */}
            <div ref={containerRef} className='overflow-hidden w-full md:w-[90%] lg:w-1/2 rounded-[2em] py-8 px-4 flex flex-wrap md:flex-nowrap justify-around items-center gap-4 white small-box-shadow'>
                {ProgressBoxItems.map((item, index) => {
          return (
            <div className={`${index === 0 ? "slide_right" : index === 1 ? "slide_up" : "slide_left"} flex justify-between items-center flex-col gap-2 md:gap-4`} key={index + item.name}>
                            <div className='flex justify-center items-center flex-col text-xs md:text-sm font-semibold font-["Manrope"]'>
                                <img src={item.image} alt="" className="w-8 md:w-auto" />
                                <p className="text-center">{item.name}</p>
                            </div>
                            <p className='text-lg md:text-xl font-bold font-["Plus_Jakarta_Sans"]'>{item.value}</p>
                        </div>);

        })}
            </div>
        </>);

}

export default ProgressBox;