import React from 'react'

function ProgressBox() {
    const ProgressBoxItems = [
        {name : "Streak" , value : "3" , image : "/Dashboard/Home/streak.svg"},
        {name : "Badges" , value : "2" , image : "/Dashboard/Home/star.svg"},
        {name : "Progress" , value : "25%" , image : "/Dashboard/Home/progress.svg"},
    ]
    return (
        <>
            <div className='home-progress-box-container white small-box-shadow'>
                {ProgressBoxItems.map((item , index) => {
                    return (
                        <div className="progress-box-items" key={index + item.name}>
                            <div className='progress-box-title'>
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                            </div>
                            <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProgressBox