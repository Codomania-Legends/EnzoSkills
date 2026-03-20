import React, { useRef } from 'react'
import "./Library.css"

function Library() {
  const data = [
    {
      image : "/Dashboard/book.svg",
      BookName : "JS Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Java Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
    {
      image : "/Dashboard/book.svg",
      BookName : "Python Basics", 
    },
  ]

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Adjust '300' to change how far it scrolls per click
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <>
    <div className="library-dash-section container h-full mx-auto px-4 mt-5">
      <div className="flex fade_in justify-evenly items-center w-1/10 mb-5">
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
        <h1 className="text-2xl h-[10%] font-bold">Library</h1>
      </div>

      <div className="flex h-full lg:h-[85%] flex-col lg:flex-row w-full gap-10 md:justify-between">

        <div className=" flex w-[90%] lg:w-[65%] h-full">
          <div className="grid grid-col-1 w-full md:grid-row-2 gap-10">

            <div className="white flex flex-col justify-around medium-box-shadow rounded-[2em] p-2  w-full px-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Books and PDFs</h1>
                
                {/* Navigation Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => scroll('left')}
                    className="small-box-shadow rounded-full p-2 blue text-white transition"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="small-box-shadow rounded-4xl p-2 blue text-white transition"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Added 'ref' and 'scroll-smooth' */}
              <div 
                ref={scrollRef}
                className="flex flex-nowrap overflow-x-scroll  no-scrollbar justify-start items-center gap-6 scroll-smooth"
              >
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-6 pb-2 flex-none">
                    <img src={item.image} alt={item.BookName} className="h-20 w-20 object-contain" />
                    <h2 className="text-md font-bold">{item.BookName}</h2>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-10 relative">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Reference Videos</h1>
                
                {/* Navigation Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => scroll('left')}
                    className="small-box-shadow rounded-full p-2 blue text-white transition"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="small-box-shadow rounded-4xl p-2 blue text-white transition"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Added 'ref' and 'scroll-smooth' */}
              <div 
                ref={scrollRef}
                className="flex flex-nowrap overflow-x-scroll  no-scrollbar justify-start items-center gap-6 scroll-smooth"
              >
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-6 flex-none">
                    <img src={item.image} alt={item.BookName} className="h-20 w-20 object-contain" />
                    <h2 className="text-md font-bold">{item.BookName}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[90%] lg:w-[30%] h-full">
          <div className="grid grid-col-1 w-full md:grid-row-2 gap-10">
            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
              
            </div>
            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
              
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Library