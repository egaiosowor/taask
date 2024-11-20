import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Task from "../ui/Task";
import NoProject from "../ui/NoProject";
import NoTask from "../ui/NoTask";
import { NotifyTaskdue } from "../ui/NotifyTaskdue";

function Home() {
  const projects = useSelector((state) => state.projects);
  const project = projects?.find((project) => project?.isActive === true);
  const tasks = project?.tasks;

  // Function to check for due tasks
  const checkDueDates = (tasks) => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
  
      tasks?.forEach((task) => {
        const dueTime = new Date(task.dueDate).getTime();
        const timeDiff = dueTime - now;
  
        if (timeDiff <= 0 && task.status !== "completed") {
          NotifyTaskdue(task);
        }
      });
    }, 60 * 1000); // Check every minute
  
    return intervalId;
  };
  

  // UseEffect to manage the interval
  useEffect(() => {
    if (tasks?.length > 0) {
      const intervalId = checkDueDates(tasks);

      return () => {
        clearInterval(intervalId); // Clean up on component unmount
      };
    }
  }, [tasks]); // Re-run if `tasks` changes

  return (
    <div>
      {/* Columns Section */}
      {tasks?.length > 0 && (
        <div className="bg-gray-100 flex flex-col flex-[5] p-4 border rounded-md">
          <div className="w-full">
            {tasks.map((task, index) => (
              <Task key={index} taskIndex={index} />
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
