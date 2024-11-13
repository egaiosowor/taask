import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddEditProjectModal } from '../ui/modals';
import Task from '../ui/Task'
import Header from "../layout/Header";
import { isDue } from "../../utils";
import NoProject from '../ui/NoProject'
import NoTask from '../ui/NoTask'
import Pill from '../ui/pill'

function Home({ onToggle }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);
  const project = projects?.find((project) => project?.isActive === true);
  const tasks = project?.tasks
  // const dueTasks = allTasks.filter((task) => task.status !== "completed" && isDue(task.dueDate) )


  return (
    <div className="flex flex-col flex-[4] px-4 min-h-screen">
      <Header
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        onToggle={onToggle}
      />

      {/* Columns Section */}
      {
        tasks?.length > 0 && (
          <div className="bg-gray-100 flex flex-col flex-[5] p-4 border rounded-md">
            {/* <div className="flex space-x-2" >
              <Pill name='To-do' />
              <Pill name='In-progress' />
              <Pill name='Completed' />
            </div>
            <div className="border border-dashed mt-4 mb-2"></div> */}
            <div className="w-full" >
              {   
                  tasks.map((task, index)=>(
                    <Task key={index} taskIndex={index} />
                  ))
              }
            </div>
          </div>
        )
      }
      

      {
          projects?.length < 1 && <NoProject/>
      }
      {
          (project && project?.tasks?.length < 1) && <NoTask/>
      }
      
      {isProjectModalOpen && (
        <AddEditProjectModal
          type="edit"
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
