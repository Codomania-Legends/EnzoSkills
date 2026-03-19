import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React, { useRef } from 'react'

gsap.registerPlugin(SplitText)

function Features() {
    const containerRef = useRef(null)
    const features = [
        { title: "Weekly Roadmaps", description: "We provide weekly roadmaps, helping students stay consistent and focused on their goals." },
        { title: "Unified Dashboard", description: "Visualize your entire learning journey from beginner to expert in one convenient place." },
        { title: "Progress Tracking", description: "Monitor your daily achievements and track your skill milestones with real-time progress indicators." },
        { title: "Curated Resources", description: "Access hand-picked, high-quality learning materials tailored specifically for your chosen skill path." },
        { title: "Smart Goal Setting", description: "Define your ultimate career goals and let us map out the exact steps." },
        { title: "Skill Assessments", description: "Test your knowledge with quick quizzes to ensure you master every core concept." },
        { title: "Milestone Badges", description: "Earn rewards and badges as you conquer new skills and complete learning modules." },
        { title: "Hands-on Challenges", description: "Participate in hands-on coding challenges to apply your newly learned skills practically." },
        { title: "Community Support", description: "Connect with peers, share your progress, and learn together in a supportive environment." }
    ];
    useGSAP( () => {
        const split = new SplitText(".heading-feature" , {type : "chars"})
        gsap.from( split.chars , {
            y : 10,
            opacity : 0,
            ease : "power2.inOut",
            stagger : 0.05
        } )
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } , delay : 1 });
        tl.from([".card1",".card2",".card3"] , {y : -20, opacity:0, duration : 1 , ease : "sine.inOut", stagger : 0.2})
        tl.from([".card4",".card5",".card6"] , {y : -20, opacity:0, duration : 1 , ease : "sine.inOut", stagger : 0.2})
        tl.from([".card7",".card8",".card9"] , {y : -20, opacity:0, duration : 1 , ease : "sine.inOut", stagger : 0.2})
    } , {scope : containerRef} )
    return (
        <div ref={containerRef} className='h-9/10 w-full flex flex-col justify-center items-center relative z-2'>
            <div className="features-heading flex justify-center items-center h-1/10">
                <h1 className='heading-feature text-4xl font-[Syne] font-black text-center'>What Makes Us Unique</h1>
            </div>
            <div className="features-content h-8/10 grid grid-cols-3 w-9/10 overflow-hidden">
                {features.map( (feature , index) => (
                    <div className={`feature-card card${index+1} flex flex-col justify-center items-center w-full h-full`} key={feature.title + index}>
                        <div className='flex flex-col features-card justify-between items-start off-blue small-box-shadow px-4 py-4 rounded-2xl w-9/10'>
                            <h4 className='text-lg font-semibold pb-1'>{feature.title}</h4>
                            <p className="text-sm" > {feature.description}</p>
                        </div>
                    </div>
                ) )}
            </div>
        </div>
    )
}

export default Features