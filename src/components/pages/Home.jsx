import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Task from "../ui/Task";
import NoProject from "../ui/NoProject";
import NoTask from "../ui/NoTask";
import useDueDateChecker from '../../hooks/useDueDateChecker';

function Home() {
  const projects = useSelector((state) => state.projects);
  const project = projects?.find((project) => project?.isActive === true);
  const tasks = project?.tasks;
  
  useDueDateChecker(tasks);


  return (
    <div className="h-full" >
      {/* Columns Section */}
      {tasks?.length > 0 && (
        <div className="h-full flex flex-col flex-[5] py-4">
          <div className="w-full">
            {tasks.map((task, index) => (
              <Task key={index} taskId={task.id} />
            ))}
          </div>
        </div>
      )}

      {projects?.length < 1 && <NoProject />}
      {project && project?.tasks?.length < 1 && <NoTask />}
    </div>
  );
}

export default Home;
