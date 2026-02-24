import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Filler 
} from 'chart.js';
import { Chart } from 'react-chartjs-2'; 

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    LineController, 
    LineElement, 
    PointElement, 
    Filler
);

function ActivityGraph() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Activity Graph',
                data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 0],
                fill: true, 
                tension : 0.4,
                borderColor: 'rgba(255,126,20,1)',
                backgroundColor: 'rgba(255,126,20,0.2)',
            },
        ],
    };

    return (
        <div className='black medium-box-shadow w-full md:w-[85%] rounded-[2em] p-4 md:p-8 mb-4 md:mb-[5%] text-white text-center font-bold shadow-[inset_0_10px_20px_#ffffff25,inset_-10px_-10px_20px_#000,20px_20px_50px_#21212150]'>
            <h1 className="text-lg md:text-xl mb-4">Activity Graph</h1>
            <div className="w-full overflow-x-auto">
               <Chart type='line' data={data} />
            </div>
        </div>
    );
}

export default ActivityGraph;