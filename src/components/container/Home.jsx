import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddEditProjectModal } from '../ui/modals';
import Task from '../ui/Task'
import Header from "../layout/Header";
import { isDue } from "../../utils";
import NoProject from '../ui/NoProject'
import NoTask from '../ui/NoTask'

function Home({ onToggle }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);
  const project = projects?.find((project) => project?.isActive === true);
  console.log(project)
  const allTasks = project?.tasks
  // const dueTasks = allTasks.filter((task) => task.status !== "completed" && isDue(task.dueDate) )


  return (
    <div className="flex flex-col flex-[4] px-2 min-h-screen">
      <Header
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        onToggle={onToggle}
      />

      {/* Columns Section */}
      {
        allTasks.length > 0 && (
          <div className="flex flex-[5] px-2">
            <div>
              {   
                  allTasks.map((task, index)=>(
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
