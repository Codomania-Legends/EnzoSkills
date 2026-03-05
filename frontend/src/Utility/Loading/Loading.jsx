import React from 'react'
import "./Loading.css"

function Loading() {
    return (
        <>
            <div className='overflow-hidden p-2 pr-10 flex justify-center items-end'>
                <div>
                    {/* Updated the class name typo to match the CSS */}
                    <div className='h-10 w-2 bg-black transformMe'/>  
                    <div className='h-10 w-2 bg-black e-block-1'/>  
                </div>
                <div className='flex flex-col justify-between h-10'>
                    <div className='h-2 w-7 bg-black rounded-r-full e-block-2'/>  
                    <div className='h-2 w-7 bg-black rounded-r-full e-block-3'/>  
                </div>
                <p className='font-bold text-2xl'>
                    <span className='span-loading'>n</span>
                    <span className='span-loading'>z</span>
                    <span className='span-loading'>o</span>
                    <span className='span-loading'>S</span>
                    <span className='span-loading'>k</span>
                    <span className='span-loading'>i</span>
                    <span className='span-loading'>l</span>
                    <span className='span-loading'>l</span>
                    <span className='span-loading'>s</span>
                </p>
            </div>
        </>
    )
}

export default Loading