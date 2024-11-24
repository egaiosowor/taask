import React from 'react'
import { BiTaskX } from "react-icons/bi";



function NoTask() {
  return (
    <div className="bg-[#1F1F1F] h-full grid justify-center items-center px-2 flex-[5] rounded-[7px] text-white" >
        <div className='flex items-center space-y-4' > 
          <div className='flex flex-col items-center space-y-4'>
            <BiTaskX className='text-[80px] md:text-[120px]' />
            <p className='text-2xl md:text-4xl' >No Tasks Available</p>
            <a href='/create-task' className='underline hover:no-underline text-base text-[#C38FFF]' >Add Task</a>
          </div> 
        </div>
    </div>
  )
}

export default NoTask