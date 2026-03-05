export function WHITE_BOX(text, key) {
    return (
        <span key={key} className='white-box-white cursor-pointer text-[#5A4FFF] hover:text-white hover:bg-black transition-all duration-300 rounded-4xl text-[0.6rem] font-medium white font-[Manrope] py-1 px-2 bg-white'>{text}</span>
    )
}

export function Bluish_Box(role, institute, date, description, key, index, onClickFunction) {
    return (
        <div key={key} className={`bg-[#ffffff25] w-full h-full p-2 rounded-xl flex flex-col gap-1 justify-evenly items-start absolute top-0 left-0 transition-all duration-300 ${key === index ? "come-in-front z-10 opacity-100" : "go-back z-0 opacity-0 pointer-events-none"}`} onClick={onClickFunction}>
            {institute && <div className='flex md:flex-row flex-col justify-between w-full items-center text-white'>
                <p className='text-sm font-semibold font-[Manrope]'>{role}</p>
                <p className='text-[0.6rem] font-[Manrope]'>{date}</p>
            </div>}
            {institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>- {institute}</p>}
            {institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>{description}</p>}
            {!institute && <p className='text-xs font-semibold font-[Manrope] text-[#534DB4]'>{role}</p>}
        </div>
    )
}

export function Project_Box(name, description, repo, demo, key, index, onClickFunction) {
    return (
        <div key={key} className={`bg-[#ffffff25] h-full p-2 rounded-xl flex w-full  justify-evenly items-start absolute top-0 left-0 transition-all duration-300 ${key === index ? "come-in-front z-10 opacity-100" : "go-back z-0 opacity-0 pointer-events-none"}`} onClick={onClickFunction}>
            <div className='flex flex-col h-full justify-evenly items-start w-[80%] cursor-pointer'>
                <p className='text-sm font-semibold text-white font-[Manrope]'>{name}</p>
                <p className='text-xs font-semibold font-[Manrope] text-[#534DB4] pr-2'>{description}</p>
            </div>
            <div className='flex gap-2 h-full flex-col justify-evenly items-end w-[20%]'>
                <a href={repo} target="_blank" rel="noreferrer" className='text-[0.5rem] font-semibold font-[Manrope] bg-[#534DB4] text-white px-2 py-1 rounded-full w-20 flex items-center justify-center'>Repository</a>
                <a href={demo} target="_blank" rel="noreferrer" className='text-[0.5rem] font-semibold font-[Manrope] bg-white text-[#534DB4] px-2 py-1 rounded-full flex items-center justify-center w-20'>
                    <img src="/Dashboard/info.svg" alt="" />
                    <span className='ml-1 text-[0.5rem] font-semibold font-[Manrope]'>Live Demo</span>
                </a>
            </div>
        </div>
    )
}