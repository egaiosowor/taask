import React, { useState } from "react";
import { useSelector } from "react-redux";

import {TaskModal} from "../ui/modals";
import { FaRegClock } from "react-icons/fa6";

import { isDue } from "../../utils";


function Task({ taskId }) {
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const task = project.tasks.find((task) => task.id === taskId);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const calculateCountdown = (dueDate) => {
    
    if (isDue(dueDate)) {
      return "Task is overdue";
    }
       
    const diffInMilliseconds = new Date(dueDate) - new Date()
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const countdown = calculateCountdown(task.dueDate);
  const progress = (completed/subtasks.length) * 100

  return (
    <>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className="flex flex-col max-w-sm w-full first:my-5 space-y-3 rounded-md shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] bg-white p-3 cursor-pointer "
      >
        <h3 className=" font-bold tracking-wide ">{task.title}</h3>
        <p className="tracking-wide">{task.description}</p>
        <div className="flex space-x-1">
          <FaRegClock />
          <p className="text-xs text-gray-500">{countdown}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div style={{ width: `${progress || 0}%` }} className="bg-blue-500 h-2.5 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 self-end">{progress}%</p>

      </div>
      {isTaskModalOpen && (
        <TaskModal
          taskId={task.id}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </>
  );
}

export default Task;
