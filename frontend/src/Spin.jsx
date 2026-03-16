import gsap from "gsap"
import { useEffect } from "react"

export function Spin(){
    useEffect( () => {
        gsap.to( ".spin-circle" , {
            left : () => gsap.utils.random( 0 , 100 ) + "%",
            duration : 5,
            ease : "bounce.out",
        } )
    } , [] )
    return(
        <div className="spin w-screen  h-screen flex justify-center items-center">
            <div className="relative spin-container w-9/10 flex flex-col justify-center items-center">
                <div className="absolute spin-circle h-4 w-2 rounded-b-full bg-black left-0 -top-10"></div>
                <div className="spin-text flex justify-evenly items-center w-full">
                    <div className="w-1/4 bg-red-600 text-center">Code</div>
                    <div className="w-1/4 bg-green-600 text-center">Home</div>
                    <div className="w-1/4 bg-blue-600 text-center">Cloud Study</div>
                    <div className="w-1/4 bg-yellow-600 text-center">Assignment</div>
                </div>
            </div>
        </div>
    )
}