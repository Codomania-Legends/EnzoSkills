import React from 'react'

function Library() {
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
            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
              
            </div>
            <div className="white flex flex-col justify-around medium-box-shadow h-full rounded-[2em] p-4 w-full px-6">
              
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