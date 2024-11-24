import React from 'react'
import { CiFolderOff } from "react-icons/ci";
import { AddEditProjectModal } from "./modals";
import { useDispatch, useSelector } from "react-redux";

function NoProject() {
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const projects = useSelector((state) => state.projects);
  
  return (
    <div className="bg-[#1F1F1F] h-full grid justify-center items-center px-2 flex-[5] rounded-[7px] text-white" >
        <div className='flex items-center space-y-4' > 
          <div className='flex flex-col items-center space-y-4'>
            <CiFolderOff className='text-[120px]' />
            <p className='text-4xl' >No Projects Available</p>
            <a 
              onClick={() => {
                setIsProjectModalOpen(true);
              }}
              href='/create-task' 
              className='underline hover:no-underline text-base text-[#C38FFF]' >Add Project</a>
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