import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from '../../Utility/UserDetails';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip
);

const defaultMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const defaultZeroActivity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function ActivityGraph() {
  const graphContainerRef = useRef(null);
  const { userDetails } = useUser();
  const userId = userDetails?.user_id || Cookies.get("user_id");

  const [labels, setLabels] = useState(defaultMonths);
  const [activityData, setActivityData] = useState(defaultZeroActivity);
  const [breakdown, setBreakdown] = useState({
    courseEnrollments: 0,
    lessonsLearned: 0,
    assessmentsGiven: 0,
    aiLearned: 0,
    libraryClicks: 0,
    roomsCreated: 0,
    projectsCreated: 0
  });
  const [totalActivities, setTotalActivities] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchActivity = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/user/activity/${userId}`);
      if (res.data && Array.isArray(res.data.data)) {
        setLabels(res.data.labels || defaultMonths);
        setActivityData(res.data.data);
        if (res.data.breakdown) {
          setBreakdown(res.data.breakdown);
        }
        setTotalActivities(res.data.totalActivities || res.data.data.reduce((a, b) => a + b, 0));
      }
    } catch (err) {
      console.warn("Could not fetch activity graph from server:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [userId]);

  // Live listen for all 7 platform action triggers
  useEffect(() => {
    const handleUpdate = () => {
      fetchActivity();
    };

    window.addEventListener('user_activity_updated', handleUpdate);
    window.addEventListener('course_progress_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('user_activity_updated', handleUpdate);
      window.removeEventListener('course_progress_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [userId]);

  const maxVal = Math.max(...activityData, 0);
  const suggestedMaxY = Math.max(5, maxVal + 1);

  const chartDataConfig = {
    labels: labels,
    datasets: [
      {
        label: 'Platform Actions Completed',
        data: activityData,
        fill: true,
        tension: 0.35,
        borderColor: 'rgba(255,126,20,1)',
        backgroundColor: 'rgba(255,126,20,0.18)',
        pointBackgroundColor: 'rgba(255,126,20,1)',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: 'rgba(255,126,20,1)',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 6,
        pointRadius: 4
      }
    ]
  };

  return (
    <div ref={graphContainerRef} className='overflow-hidden black small-box-shadow w-full md:w-[95%] rounded-[2em] p-2 md:p-4 mb-4 md:mb-[5%] text-white text-center font-bold shadow-[inset_0_10px_20px_#ffffff25,inset_-10px_-10px_20px_#000,20px_20px_50px_#21212150] relative'>
      <div className='reveal-content'>
        <div className="flex justify-between items-center px-4 mb-2 relative z-20">
          <div className="text-left">
            <h1 className="text-lg md:text-xl font-bold">Activity Graph</h1>
            <p className="text-[11px] text-gray-400 font-normal">
              Live actions across Courses, Lessons, Tests, AI, Library, Rooms & Projects
            </p>
          </div>
          <span className="text-xs text-orange-400 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-full font-medium flex items-center gap-1.5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
            {loading ? "Syncing..." : `${totalActivities} Total Actions`}
          </span>
        </div>

        {/* 7 Core Action Counters Pill Strip (Emoji-Free) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 px-2 my-2 text-[10px] font-medium text-gray-300">
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Courses Enrolled">
            <span className="text-orange-400 font-bold mr-1">{breakdown.courseEnrollments}</span> Enrolled
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Curriculum Lessons Learned">
            <span className="text-orange-400 font-bold mr-1">{breakdown.lessonsLearned}</span> Lessons
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Assessments Given">
            <span className="text-orange-400 font-bold mr-1">{breakdown.assessmentsGiven}</span> Tests
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="AI Questions & Doubts">
            <span className="text-orange-400 font-bold mr-1">{breakdown.aiLearned}</span> AI Chats
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Library Items Clicked">
            <span className="text-orange-400 font-bold mr-1">{breakdown.libraryClicks}</span> Library
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Study Rooms Created">
            <span className="text-orange-400 font-bold mr-1">{breakdown.roomsCreated}</span> Rooms
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/5" title="Projects Added">
            <span className="text-orange-400 font-bold mr-1">{breakdown.projectsCreated}</span> Projects
          </span>
        </div>

        <div className="w-full overflow-x-auto relative z-0">
          <Chart type='line' data={chartDataConfig} options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(255,126,20,1)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    return `Actions Completed: ${context.parsed.y}`;
                  }
                }
              }
            },
            interaction: {
              mode: 'index',
              intersect: false
            },
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: suggestedMaxY,
                ticks: {
                  stepSize: 1,
                  color: 'rgba(255, 255, 255, 0.6)'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.08)'
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.6)'
                }
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
}

export default ActivityGraph;
