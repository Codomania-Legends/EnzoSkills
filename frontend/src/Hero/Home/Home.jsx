import React, { useRef } from 'react';
import "./Home.css";
import "../../Utility/global.css";
import Navbar from '../Navbar/Navbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText); 

function Home() {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    const splitLeft = new SplitText(".leftContentTop", { type: "words" });
    const splitHeading = new SplitText(".Right-content-heading", { type: "words" });
    const splitSub = new SplitText(".Right-content-sub-heading", { type: "words" });
    gsap.set(".path-text", { x: -50, opacity: 0 }); 
    gsap.set(".forge-text", { x: 50, opacity: 0 }); 

    tl.addLabel("mainContentReveal")
      
      .from(splitHeading.words, { 
        opacity: 0,
        y: 10, 
        duration: 0.8,
        ease: "power2.out", 
        stagger: 0.02, 
        onComplete: () => splitHeading.revert() 
      }, "mainContentReveal")
      
      .from(splitSub.words, { 
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.02,
        onComplete: () => splitSub.revert() 
      }, "mainContentReveal+=0.1") 
      
      .from(splitLeft.words, {
        duration: 0.8,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.01, 
        onComplete: () => splitLeft.revert() 
      }, "mainContentReveal+=0.2") 
      
      .fromTo(".center-bg-img", 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power1.inOut" },
        "mainContentReveal"
      )

      .fromTo(".arrowPart", 
        { opacity: 0, y: 10 },
        { opacity: 1, duration: 0.6, ease: "power2.out", y: 0 },
        "mainContentReveal+=0.4"
      )

      .to(".path-text", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "mainContentReveal+=0.3")
      
      .to(".forge-text", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "<0.2") 
      
      .from(".path-text, .forge-text", {
        scale: 0.95, 
        duration: 1.2,
        ease: "power2.out", 
      }, "<0.1");

  }, { scope: containerRef });

  return (
    <div className='MainHomePage' ref={containerRef}>
      <div className="centerImg h-[40%] w-[80%] top-[15%] mt-[15%] md:mt-[20%] lg:mt-0 md:h-[60%] md:w-[70%] lg:h-[90%] lg:w-full lg:bottom-0 flex justify-center items-center ml-[25%] md:ml-[30%] lg:ml-0">
        <img src="/HomeImg/HomeCenterImg.svg" alt="Center Decoration" className='center-bg-img h-full' />
      </div>

      <div className="main-home-content-div flex justify-center items-center">

        <div className="Home-leftContent hidden  lg:flex justify-center items-center">
          {/* left top side  */}
          <div className="leftContentTop md:w-[45%] mr-[30%] lg:w-[45%] text-md flex justify-center items-center">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>
          
          {/* left bottom side  */}
          <div className="leftContentBottom h-[20%] w-[50%] md:h-[35%] md:w-[60%] flex justify-end items-center">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart bottom-[23%] right-[20%]' />
            <button className='start-learning-btn text-white rounded-full pt-[1em] pr-[8em] pb-[1em] pl-[3em] small-box-shadow black md:text-md text-sm '>Start Learning</button>
          </div>
        </div>

        <div className="Home-rightContent  md:h-full lg:h-[90%] md:w-full lg:w-[50%] h-[70%] w-full flex md:justify-start justify-center items-center">

          <div className="heading-section-home mt-[-25%] lg:mt-0 md:mt-0 md:h-[10%] md:w-[50%] lg:h-[40%] lg:w-[50%] h-[30%] w-[60%] md:ml-[20%] ml-[-10%] flex justify-start md:justify-center items-center">
            <div className="Right-content-heading md:text-2xl text-l flex justify-start items-end">
              <b>Master Your Next Skill</b>
            </div>
            <div className="Right-content-sub-heading md:text-xl text-sm flex justify-end items-start">
              <p>with Absolute Confidence.</p>
            </div>
          </div>

          <div className="leftContentTop md:w-[90%] md:text-center md:h-[10%] text-md md:flex hidden lg:hidden justify-center items-start">
            <p>Don't waste time figuring out where to start. <b>EnzoSkills</b> curates the perfect learning path for your goals, providing a powerful, unified dashboard to visualize your journey from beginner to expert.</p>
          </div>

          <div className="rightBottomContent mt-8 h-[30%] w-[90%] md:h-[40%] md:w-[60%] lg:h-[60%] lg:w-[60%] flex flex-col md:mr-[30%] lg:mr-0 md:mt-[30%] lg:mt-0 justify-end items-start">
            <div className="Home-right-topContent md:text-[10em] lg:text-[12em] text-[6em] h-[70%] w-[55%] md:h-[40%] lg:h-[50%] md:w-[70%] flex justify-start items-start love-light-regular">
              <p className="path-text">Path</p>
            </div>
            <div className="Home-right-bottomContent md:text-[5em] lg:text-[7em] text-[4em] h-[70%] w-[55%] md:h-[40%] lg:h-[50%] md:w-[70%] flex md:justify-end justify-start items-start love-light-regular">
              <p className="forge-text">Forge</p>
            </div>
          </div>

          <div className="leftContentBottom h-[40%] w-[70%] md:h-[10%] md:w-[90%] lg:hidden flex justify-center md:justify-start items-center">
            <img src="/HomeImg/HomeArrow.svg" alt="Arrow Decoration" className='arrowPart bottom-[25%] md:hidden right-[15%]' />
            <button className='start-learning-btn text-white rounded-full pt-[1em] pr-[8em] pb-[1em] pl-[3em] small-box-shadow black md:text-xl text-sm '>Start Learning</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home;