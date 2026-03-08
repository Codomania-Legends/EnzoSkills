import { gsap } from "gsap";

export function textAnimate(){
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".about-left-main-heading", {
        y: -100,
        duration: 1,
        ease: "power4.out",
      })

      tl.fromTo(".Head-one", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-one", { y: 50 } )
            gsap.to( ".Head-one", { y: 0, duration: 0.5 } )
        }
      }, "-=0.5")
      
      tl.fromTo(".Head-two", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-two", { y: 50 } )
            gsap.to( ".Head-two", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-three", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-three", { y: 50 } )
            gsap.to( ".Head-three", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-four", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-four", { y: 50 } )
            gsap.to( ".Head-four", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-five", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-five", { y: 50 } )
            gsap.to( ".Head-five", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-six", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-six", { y: 50 } )
            gsap.to( ".Head-six", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-seven", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-seven", { y: 50 } )
            gsap.to( ".Head-seven", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-eight", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-eight", { y: 50 } )
            gsap.to( ".Head-eight", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-nine", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-nine", { y: 50 } )
            gsap.to( ".Head-nine", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      tl.fromTo(".Head-ten", { y: 50 }, 
        {
        opacity: 1,
        y: -50,
        onComplete: () => {
            gsap.set( ".Head-ten", { y: 50 } )
            gsap.to( ".Head-ten", { y: 0, duration: 0.5 } )
        }
      }, "-=0.4")

      
      

    }); 

    return () => ctx.revert();
}