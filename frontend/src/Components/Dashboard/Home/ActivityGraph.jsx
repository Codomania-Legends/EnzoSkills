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
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    };

    return (
        <div>
            <Chart type='line' data={data} />
        </div>
    );
}

export default ActivityGraph;