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
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap'; 

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
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,126,20,1)',
                pointHoverBorderWidth: 3,
                pointHoverRadius: 6,
            },
        ],
    };

    // 1. FIX: Brought the container ref back so the app doesn't crash! 📦
    const container = useRef(null);

    useGSAP(() => {
        // Your awesome swipe-across effect! 💨
        gsap.to('.reveal-block', {
            xPercent: 200, 
            duration: 1,
            delay: 0.5, // Kicks in slightly after the fade starts
            ease: "power3.inOut"
        });

        // 2. FIX: Animate the ref directly instead of the hidden class! 🎯
        gsap.fromTo(container.current, {
            opacity: 0,
            backgroundColor : "transparent"
        }, {
            opacity: 1,
            backgroundColor : "black",
            delay : 0,
            duration: 1, // 5 seconds is a bit too long for a UI fade, 2 is perfect! ⏱️
            ease: "power3.inOut"
        });

        gsap.fromTo('.reveal-content', {
            xPercent : -100
        }, {
            xPercent : 0,
            delay : 0,
            duration: 1, // 5 seconds is a bit too long for a UI fade, 2 is perfect! ⏱️
            ease: "power3.inOut"
        });
        
    }, { scope: container })

    return (
        // 3. FIX: Changed to 'opacity-0' and removed 'show_me_chart' 🧹
        <div ref={container} className='opacity-0 overflow-hidden medium-box-shadow w-full md:w-[85%] rounded-[2em] p-4 md:p-8 mb-4 md:mb-[5%] text-white text-center font-bold shadow-[inset_0_10px_20px_#ffffff25,inset_-10px_-10px_20px_#000,20px_20px_50px_#21212150] relative'>
            
            {/* The white block starts way off to the left now! */}
            <div className='reveal-block absolute top-0 left-[-100%] w-full h-full bg-white z-10' />
            <div className='reveal-content'>


            <h1 className="text-lg md:text-xl mb-4 relative z-20">Activity Graph</h1>
            
            <div className="w-full overflow-x-auto relative z-0">
               <Chart type='line' data={data} options={{
                   plugins: {
                       tooltip: {
                           enabled: true,
                           backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                           titleColor: '#ffffff',
                           bodyColor: '#ffffff',
                           borderColor: 'rgba(255,126,20,1)', 
                           borderWidth: 1,
                           padding: 10,
                           displayColors: false, 
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                        },
                        // 4. FIX: Removed the looping animation block so your tooltips work! 🖱️
                        scales: {
                            y: { 
                                min: 0,
                                max: 100
                       }
                   }
               }}/>
            </div>
        </div>
    </div>
    );
}

export default ActivityGraph;