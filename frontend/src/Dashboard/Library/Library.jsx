import React, { useRef } from 'react'
import "./Library.css"

function Library() {
  const data = [
    { image: "/Dashboard/book.svg", BookName: "JS Basics" },
    { image: "/Dashboard/book.svg", BookName: "Java Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
    { image: "/Dashboard/book.svg", BookName: "Python Basics" },
  ]

  // Separate refs for separate scroll sections
  const scrollRefBooks = useRef(null);
  const scrollRefVideos = useRef(null);

  const handleScroll = (ref, direction) => {
    const { current } = ref;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="library-dash-section container mx-auto px-4 mt-5 h-full">
      <div className="flex fade_in items-center gap-4 mb-5">
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" />
        <h1 className="text-2xl font-bold">Library</h1>
      </div>

      {/* Main Grid Container: 70/30 split */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 h-full lg:h-[85%]">
        
        {/* Left Column (70%) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Section 1: Books */}
          <div className="white flex flex-col h-1/2 justify-around medium-box-shadow rounded-[2em] p-6 px-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Books and PDFs</h1>
              <div className="flex gap-2">
                <button onClick={() => handleScroll(scrollRefBooks, 'left')} className="small-box-shadow rounded-full p-2 blue text-white">←</button>
                <button onClick={() => handleScroll(scrollRefBooks, 'right')} className="small-box-shadow rounded-full p-2 blue text-white">→</button>
              </div>
            </div>
            <div ref={scrollRefBooks} className="flex flex-nowrap overflow-x-scroll no-scrollbar gap-6 scroll-smooth">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-4 flex-none">
                  <img src={item.image} alt={item.BookName} className="h-20 w-20 object-contain" />
                  <h2 className="text-md font-bold">{item.BookName}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Videos */}
          <div className="white flex flex-col h-1/2 justify-around medium-box-shadow rounded-[2em] p-6 px-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Reference Videos</h1>
              <div className="flex gap-2">
                <button onClick={() => handleScroll(scrollRefVideos, 'left')} className="small-box-shadow rounded-full p-2 blue text-white">←</button>
                <button onClick={() => handleScroll(scrollRefVideos, 'right')} className="small-box-shadow rounded-full p-2 blue text-white">→</button>
              </div>
            </div>
            <div ref={scrollRefVideos} className="flex flex-nowrap overflow-x-scroll no-scrollbar gap-6 scroll-smooth">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-4 flex-none">
                  <img src={item.image} alt={item.BookName} className="h-20 w-20 object-contain" />
                  <h2 className="text-md font-bold">{item.BookName}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (30%) */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          <div className="white flex flex-col justify-center items-center medium-box-shadow rounded-[2em] p-8 h-1/2">
            <h1 className="text-2xl font-bold mb-4">Need Help?</h1>
            <img src="/Dashboard/CustomerHelp.svg" alt="Help" className='h-32 w-32 mb-4' />
            <p className='text-center text-md font-bold'>Need help for doubt Solving</p>
          </div>

          <div className="white flex flex-col justify-between medium-box-shadow rounded-[2em] p-8 h-1/2">
            <h1 className="text-2xl font-bold">Ask Doubts</h1>
            <div className='flex flex-col gap-2 font-bold'>
              <p>• Doubts not solved</p>
              <p>• Clear your Doubts with us</p>
            </div>
            <button className='font-bold medium-box-shadow blue text-white rounded-full py-3 mt-4'>Chat with AI</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Library