


import React, { useRef } from 'react';



function Features() {
    const containerRef = useRef(null);
    const features = [
        { title: "Weekly Roadmaps", description: "We provide weekly roadmaps, helping students stay consistent and focused on their goals." },
        { title: "Unified Dashboard", description: "Visualize your entire learning journey from beginner to expert in one convenient place." },
        { title: "Progress Tracking", description: "Monitor your daily achievements and track your skill milestones with real-time progress indicators." },
        { title: "Curated Resources", description: "Access hand-picked, high-quality learning materials tailored specifically for your chosen skill path." },
        { title: "Smart Goal Setting", description: "Define your ultimate career goals and let us map out the exact steps." },
        { title: "Skill Assessments", description: "Test your knowledge with quick quizzes to ensure you master every core concept." },
        { title: "Milestone Badges", description: "Earn rewards and badges as you conquer new skills and complete learning modules." },
        { title: "Hands-on Challenges", description: "Participate in hands-on coding challenges to apply your newly learned skills practically." },
        { title: "Community Support", description: "Connect with peers, share your progress, and learn together in a supportive environment." }];
    const title = "What Makes Us Unique"
    return (
        <div ref={containerRef} className='h-9/10 w-full flex flex-col justify-center items-center relative z-2'>
            <div className="features-heading flex justify-center items-center h-1/10">
                {title.split(" ").map((word, index) => (
                    <h1
                        style={{ animationDelay: `${0.2 * index}s` }}
                        className={`heading-feature text-4xl font-[Syne] font-black text-center slide_up `}>
                        {word + " "}
                    </h1>
                ))}
            </div>
            <div className="features-content h-8/10 grid grid-cols-3 w-9/10 overflow-hidden">
                {features.map((feature, index) =>
                    <div
                        style={{ animationDelay: `${0.2 * index}s` }}
                        className={`feature-card slide-down card${index + 1} flex flex-col justify-center items-center w-full h-full`} key={feature.title + index}>
                        <div className='flex flex-col features-card justify-between items-start off-blue small-box-shadow px-4 py-4 rounded-2xl w-9/10'>
                            <h4 className='text-lg font-semibold pb-1'>{feature.title}</h4>
                            <p className="text-sm"> {feature.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>);

}

export default Features;