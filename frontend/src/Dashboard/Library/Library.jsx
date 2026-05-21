import React, { useRef } from 'react'
import "./Library.css"
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import TitleAnimation from "../TitleAnimation"

// 📦 Moving static data outside the component to optimize performance
const bookData = [
  {
    book_name: "Eloquent JavaScript, 4th Edition",
    book_img: "/public/Dashboard/EloquentJavaScript.jpg",
    book_pdf: "https://eloquentjavascript.net/Eloquent_JavaScript.pdf"
  },
  {
    book_name: "You Don't Know JS Yet",
    book_img: "/public/Dashboard/YouDon'tKnowJS.webp",
    book_pdf: "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md"
  },
  {
    book_name: "Node.js Design Patterns",
    book_img: "/public/Dashboard/NodeJSDesignPattern.jpg",
    book_pdf: "https://www.nodejsdesignpatterns.com/sample-chapter"
  },
  {
    book_name: "The Road to React",
    book_img: "/public/Dashboard/TheRoadToReact.jpg",
    book_pdf: "https://www.roadtoreact.com/sample-chapter"
  },
  {
    book_name: "Learning React: Modern Patterns",
    book_img: "/public/Dashboard/LearningReactModernPatterns.jpg",
    book_pdf: "https://example-cdn.com/books/learning-react.pdf"
  }
]

const videoData = [
  {
    video_name: "JavaScript Crash Course 2026",
    video_img: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    video_link: "https://www.youtube.com/watch?v=PkZNo7MFNFg"
  },
  {
    video_name: "React.js Full Course",
    video_img: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    video_link: "https://www.youtube.com/watch?v=bMknfKXIFA8"
  },
  {
    video_name: "Node.js and Express Tutorial",
    video_img: "https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg",
    video_link: "https://www.youtube.com/watch?v=Oe421EPjeBE"
  },
  {
    video_name: "MERN Stack Front to Back",
    video_img: "https://img.youtube.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
    video_link: "https://www.youtube.com/watch?v=7CqJlxBYj-M"
  },
  {
    video_name: "Mastering Async/Await",
    video_img: "https://img.youtube.com/vi/V_Kr9OSfDeU/maxresdefault.jpg",
    video_link: "https://www.youtube.com/watch?v=V_Kr9OSfDeU"
  }
]

function Library() {
  const navigate = useNavigate();
  const scrollRefBooks = useRef(null);
  const scrollRefVideos = useRef(null);
  const containerRef = useRef(null);

  const handleScroll = (ref, direction) => {
    const { current } = ref;
    if (current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    TitleAnimation(tl, "library-page-title");
    tl.fromTo(".fade-in", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.inOut" })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="container mx-auto px-4 h-full">

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-2">
        <img
          src="/Dashboard/Courses/Back.svg"
          alt="Back"
          className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold library-page-title">Library</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full w-full pb-30">

        {/* Section 1: Books (Takes 2 columns on Desktop) 📚 */}
        <div className="white fade-in opacity-0 flex flex-col justify-around medium-box-shadow rounded-[2em] p-6 lg:col-span-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Books and PDFs</h1>
            <div className="flex gap-2">
              <button onClick={() => handleScroll(scrollRefBooks, 'left')} className="small-box-shadow rounded-full p-2 blue text-white hover:opacity-80 transition-all">←</button>
              <button onClick={() => handleScroll(scrollRefBooks, 'right')} className="small-box-shadow rounded-full p-2 blue text-white hover:opacity-80 transition-all">→</button>
            </div>
          </div>

          <div ref={scrollRefBooks} className="flex flex-nowrap overflow-x-scroll no-scrollbar gap-8 pb-4 scroll-smooth">
            {bookData.map((item, index) => (
              <div key={index} onClick={() => window.open(item.book_pdf, "_blank")} className="flex flex-col items-center gap-3 flex-none w-36 cursor-pointer group">
                <div className="h-32 w-full overflow-hidden rounded-lg transition-transform group-hover:scale-105">
                  <img src={item.book_img} alt={item.book_name} className="h-full w-full p-5 object-cover small-box-shadow" />
                </div>
                <h2 className="text-sm font-bold text-center line-clamp-2">{item.book_name}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 1: Help (Takes 1 column on Desktop) 🙋 */}
        <div className="white fade-in opacity-0 flex flex-col justify-center items-center medium-box-shadow rounded-[2em] p-8 lg:col-span-1">
          <h1 className="text-2xl font-bold mb-4">Need Help?</h1>
          <img src="/Dashboard/CustomerHelp.svg" alt="Help" className='h-32 w-32 mb-4 animate-bounce-slow' />
          <p className='text-center text-md font-bold'>Need help for doubt Solving</p>
        </div>

        {/* Section 2: Videos (Takes 2 columns on Desktop) 🎬 */}
        <div className="white flex flex-col fade-in opacity-0 justify-around medium-box-shadow rounded-[2em] p-6 lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Reference Videos</h1>
            <div className="flex gap-2">
              <button onClick={() => handleScroll(scrollRefVideos, 'left')} className="small-box-shadow rounded-full p-2 blue text-white hover:opacity-80 transition-all">←</button>
              <button onClick={() => handleScroll(scrollRefVideos, 'right')} className="small-box-shadow rounded-full p-2 blue text-white hover:opacity-80 transition-all">→</button>
            </div>
          </div>

          <div ref={scrollRefVideos} className="flex flex-nowrap overflow-x-scroll no-scrollbar gap-8 pb-4 scroll-smooth">
            {videoData.map((item, index) => (
              <div key={index} onClick={() => window.open(item.video_link, "_blank")} className="flex flex-col items-center gap-3 flex-none w-64 cursor-pointer group">
                <div className="relative h-36 w-full overflow-hidden rounded-xl small-box-shadow transition-transform group-hover:scale-105">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all z-10">
                    <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pl-1 text-black">▶</div>
                  </div>
                  <img src={item.video_img} alt={item.video_name} className="h-full w-full object-cover" />
                </div>
                <h2 className="text-sm font-bold text-center line-clamp-2">{item.video_name}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Ask Doubts (Takes 1 column on Desktop) 🤖 */}
        <div className="white fade-in opacity-0 flex flex-col justify-center medium-box-shadow rounded-[2em] p-8 lg:col-span-1">
          <h1 className="text-2xl font-bold text-center">Ask Doubts</h1>
          <div className='flex flex-col gap-2 font-bold mt-6'>
            <p>• Doubts not solved?</p>
            <p>• Clear your Doubts with us</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/AI')}
            className='font-bold cursor-pointer transition-all hover:scale-105 medium-box-shadow blue text-white rounded-full py-3 mt-8 w-full'
          >
            Chat with AI
          </button>
        </div>

      </div>
    </div>
  )
}

export default Library