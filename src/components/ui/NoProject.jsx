import React, {useState} from 'react'
import { CiFolderOff } from "react-icons/ci";
import { AddEditProjectModal } from "./modals";

function NoProject() {
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  return (
    <div className="bg-[#1F1F1F] h-full grid justify-center items-center px-2 flex-[5] rounded-[7px] text-white" >
        <div className='flex items-center space-y-4' > 
          <div className='flex flex-col items-center space-y-4'>
            <CiFolderOff className='text-[80px] md:text-[120px]' />
            <p className='text-2xl md:text-4xl' >No Projects Available</p>
            <p
              onClick={() => {
                setIsProjectModalOpen(true);
              }}
              className='underline hover:no-underline text-base text-[#C38FFF] cursor-pointer' >Add Project</p>
          </div> 
        </div>
        {isProjectModalOpen && (
        <AddEditProjectModal
          type="add"
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
    </div>
  )
}

export default NoProject