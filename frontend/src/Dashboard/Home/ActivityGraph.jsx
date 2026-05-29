import React, { useRef } from 'react';
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

function ActivityGraph() {
  const chartDataConfig = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Activity Graph',
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 0],
        fill: true,
        tension: 0.4,
        borderColor: 'rgba(255,126,20,1)',
        backgroundColor: 'rgba(255,126,20,0.2)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,126,20,1)',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 6
      }
    ]
  };

  const graphContainerRef = useRef(null);

  return (
    <div ref={graphContainerRef} className='overflow-hidden black small-box-shadow w-full md:w-[95%] rounded-[2em] p-2 md:p-4 mb-4 md:mb-[5%] text-white text-center font-bold shadow-[inset_0_10px_20px_#ffffff25,inset_-10px_-10px_20px_#000,20px_20px_50px_#21212150] relative'>

      {/* 🧹 Removed the absolute reveal-block that was hiding things */}
      <div className='reveal-content'>
        <h1 className="text-lg md:text-xl mb-4 relative z-20">Activity Graph</h1>

        <div className="w-full overflow-x-auto relative z-0">
          <Chart type='line' data={chartDataConfig} options={{
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(255,126,20,1)',
                borderWidth: 1,
                padding: 10,
                displayColors: false
              }
            },
            interaction: {
              mode: 'index',
              intersect: false
            },
            scales: {
              y: {
                min: 0,
                max: 100
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
}

export default ActivityGraph;