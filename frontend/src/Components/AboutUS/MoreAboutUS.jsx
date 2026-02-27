import React, { useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import "../../Utility/global.css";
import "./AboutPage.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Anshul Vishwakarma",
    role: "Full Stack Developer",
    description: "Architects robust front-end and back-end solutions to power the EnzoSkills learning experience.",
    big_description: "Anshul specializes in building scalable and efficient architectures that form the backbone of EnzoSkills. With a strong command over modern web technologies, he seamlessly integrates complex server-side logic with intuitive user interfaces. His dedication to clean code and performance optimization ensures that our platform can handle growing user demands while delivering a flawless, lag-free learning experience.",
    image: "/About-us/members/Anshul.png",
    links: {
      github: "https://github.com/AnshulVishwa",
      linkedin: "https://www.linkedin.com/in/anshul-vishwakarma/",
      instagram: "https://www.instagram.com/anshulvishwakarma/"
    }
  },
  {
    name: "Vidhi Agrawal",
    role: "Full Stack Developer",
    description: "Leads project vision and end-to-end MERN development, ensuring a seamless, user-centric platform.",
    big_description: "Vidhi is the driving force behind the core vision and execution of the EnzoSkills platform. Leveraging her expertise in the MERN stack, she transforms complex requirements into elegant, user-centric features. From designing dynamic React components to structuring robust Node.js APIs, she ensures every aspect of the application is crafted with the end-user in mind, fostering an engaging educational environment.",
    image: "/About-us/members/Vidhi.png",
    links: {
      github: "https://github.com/VidhiAgrawal",
      linkedin: "https://www.linkedin.com/in/vidhi-agrawal/",
      instagram: "https://www.instagram.com/vidhiagrawal/" 
    }
  },
  {
    name: "Anjali Raghuwanshi",
    role: "Lead Researcher",
    description: "Drives content strategy by researching industry trends to keep our roadmaps and catalogs high-quality.",
    big_description: "Anjali plays a pivotal role in shaping the educational trajectory of EnzoSkills. By meticulously tracking the latest industry trends and technological advancements, she curates high-quality, relevant content for our learning tracks. Her deep analytical skills and strategic planning ensure that our curriculum remains cutting-edge, empowering learners with the exact skills needed to succeed in today's competitive tech landscape.",
    image: "/About-us/members/Anjali.png",
    links: {
      github: "https://github.com/AnjaliRaghuwanshi",
      linkedin: "https://www.linkedin.com/in/anjali-raghuwanshi/",
      instagram: "https://www.instagram.com/anjaliraghuwanshi/"
    }
  },
  {
    name: "Mohini Verma",
    role: "Research Assistant",
    description: "Supports the research department and manages essential project documentation and printing workflows.",
    big_description: "Mohini is the organizational anchor of the research and development team at EnzoSkills. She meticulously manages project documentation, data collection, and internal workflows, ensuring the research team operates at peak efficiency. Her attention to detail and proactive support streamline our processes, allowing the core team to focus on innovation while she maintains the foundational integrity of our resources.",
    image: "/About-us/members/Vidhi.png",
    links: {
      github: "https://github.com/MohiniVerma",
      linkedin: "https://www.linkedin.com/in/mohini-verma/",
      instagram: "https://www.instagram.com/mohiniverma/"
    }
  }
];

function MoreAboutUS() {
  const scrollBtnRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(scrollBtnRef.current, 
        { y: 0, borderRadius: "10%" },
        {
          y: 10,
          borderRadius: "50%", 
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power2.out",
        }
      );

      const splitText = new SplitText(".know-more-top-sub-heading", { type: "words" });
      gsap.from(splitText.words, {
        duration: 1,
        y: -10,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.01,
      });

      const cards = gsap.utils.toArray('.team-card');
      
      cards.forEach((card, index) => {
        const x = index == 0 ? 100 : index == 1 ? -100 : index == 2 ? 100 : -100
        const y = index == 0 ? 100 : index == 1 ? 100 : index == 2 ? -100 : -100
        gsap.fromTo(card, 
          {x : x, y : y},
          { 
          x: 0, 
          y: 0,
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            scroller: ".KnowMore-div",
            trigger: card,
            start: "20% 100%", 
            toggleActions: "play none none reverse" 
          } 
        });
      });

      const splitLine = gsap.utils.toArray('.more-about-us-team-description');
      splitLine.forEach((line, index) => {
        const splitText = new SplitText(line, { type: "lines" });
        gsap.from(splitText.lines, {
          duration: 1,
          y: -10,
          opacity: 0,
          ease: "power2.out",
          stagger: 0.1,
        });
      });

    });

    return () => ctx.revert(); // Cleanup on unmount! 🧼
  }, []);

  return (
    <div className="more-about-container flex justify-center items-center">
      <div className="navbar flex justify-center items-center">
        <Navbar />
      </div>
      <div className="KnowMore-div flex justify-center items-center">
        <div className="KnowMore-Content flex justify-center items-center flex-col">
          <div className="know-more-top-descip h-[80vh] flex justify-center items-center flex-col relative">
            <div className="know-more-top-heading flex justify-center items-center mb-5">
              <p className="EnzoSkills-heading-aboutus">
                EnzoSkills
              </p>
            </div>
            <div className="know-more-top-sub-heading flex justify-center items-center">
              <p>EnzoSkills is a comprehensive learning path dashboard designed to simplify the journey of professional and personal development. Built with the powerful MERN stack, our platform serves as a centralized hub for learners to manage resources, track their progress, and master new technologies. We believe in a "less theory, more projects" philosophy, empowering users of all ages and backgrounds through AI-driven roadmaps, real-time mentorship, and hands-on problem-solving.</p>
            </div>
            
            {/* 🚀 FIX 4: Removed heavy onClick function. Attached ref. CSS handles smooth scroll! */}
            <a ref={scrollBtnRef} href="#Our_Team" className="scrollDown white absolute bottom-10 z-5 rounded-full p-3 flex justify-center items-center small-box-shadow will-change-transform">
              <img src="/scroll-down.svg" alt="Scroll Down" className="h-3 w-3" loading="lazy" />
            </a>
          </div>
          
          <div id='Our_Team' className="more-about-us-teamsContainer h-[90vh] flex justify-evenly items-center flex-col">
            <div className="know-more-top-heading text-5xl flex justify-center items-center">
              <p><b className='text-4xl'>Our Team</b></p>
            </div>
            <div className="About-Team-Description grid grid-cols-1 md:grid-cols-2 gap-10 h-3/4">
              {members.map((member, index) => (
                <div key={index + member.name} className="team-card member-container w-full flex justify-center items-center">
                  <div 
                    className={`
                      relative w-full md:w-2/3
                      h-2/3
                      flex justify-end items-center 
                      bg-[#7F77FF] 
                      blue
                      mr-0 ml-0 rounded-2xl medium-box-shadow
                      will-change-transform 
                      ${index === 0 ? "md:-mr-30" : 
                        index === 1 ? "md:-ml-30" : 
                        index === 2 ? "md:mr-5" : 
                        "md:ml-5"}
                    `}
                  >
                    <div className="member-image flex justify-center items-center p-1 absolute -left-10 bg-[#534DB4] rounded-2xl">
                      {/* 🚀 FIX 5: Added loading="lazy" to ALL images! */}
                      <img src={member.image} alt={member.name} loading="lazy" className="member-image aspect-square h-30 rounded-full md:rounded-2xl lg:rounded-xl"/>
                    </div>
                    <div className="member-details flex items-center flex-col w-3/4 h-[80%] text-white justify-evenly pr-5 pl-5 text-sm">
                      <div className="member-name flex justify-center items-center">
                        <p className='text-lg font-bold'>{member.name}</p>
                      </div>
                      <div className="member-role flex justify-center items-center">
                        <p className='text-md'>{member.role}</p>
                      </div>
                      <div className="member-description flex justify-center items-center">
                        <p className='text-xs text-center'>{member.description}</p>
                      </div>
                      <div className="member-links flex justify-evenly items-center w-3/4">
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                          <img src="/About-us/members/github.svg" alt="Github" loading="lazy" className="member-links h-4 w-4"/>
                        </a>
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                          <img src="/About-us/members/linkedin.svg" alt="Linkedin" loading="lazy" className="member-links h-4 w-4"/>
                        </a>
                        <a href={member.links.instagram} target="_blank" rel="noopener noreferrer">
                          <img src="/About-us/members/instagram.svg" alt="Instagram" loading="lazy" className="member-links h-4 w-4"/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="more-about-us-Team-Description h-[80vh] w-full flex justify-center items-center">
            <div className="w-full more-about-us-Team-Description-Content flex justify-evenly h-full items-center flex-col">
              {members.map( (member , index) => (
                <div key={member.role + index} className="w-full more-about-us-team-description flex justify-center items-start flex-col">
                  <div className="w-full text-lg font-bold more-about-us-team-description-name-role flex justify-between items-center">
                    <div className='flex justify-start items-center w-full'>
                      <p className='dot w-2 aspect-square rounded-full bg-black mr-5'></p>
                      {member.name} | {member.role}
                    </div>
                    <div className="w-full md:w-3/10 lg:w-2/10 more-about-us-team-description-links flex justify-evenly items-center my-5">
                      <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                        <img src="/About-us/members/github.svg" alt="Github" loading="lazy" className="member-links h-4 w-4"/>
                      </a>
                      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                        <img src="/About-us/members/linkedin.svg" alt="Linkedin" loading="lazy" className="member-links h-4 w-4"/>
                      </a>
                      <a href={member.links.instagram} target="_blank" rel="noopener noreferrer">
                        <img src="/About-us/members/instagram.svg" alt="Instagram" loading="lazy" className="member-links h-4 w-4"/>
                      </a>
                    </div>
                  </div>
                  <div className="more-about-us-team-description-description">
                    <p>{member.big_description}</p>
                  </div>
                </div>
              ) )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreAboutUS;