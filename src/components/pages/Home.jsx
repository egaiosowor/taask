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
    <div>
      {/* Columns Section */}
      {tasks?.length > 0 && (
        <div className="bg-gray-100 flex flex-col flex-[5] p-4 border rounded-md">
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
