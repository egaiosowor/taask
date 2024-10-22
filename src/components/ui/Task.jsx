import React, { useState } from "react";
import { useSelector } from "react-redux";
import {TaskModal} from "../ui/modals";
import { FaRegClock } from "react-icons/fa6";


function Task({ colIndex, taskIndex }) {
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const columns = project.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const calculateCountdown = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInMilliseconds = due - now;

    if (diffInMilliseconds <= 0) {
      return "Task is overdue";
    }

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const countdown = calculateCountdown(task.dueDate);

  return (
    <>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className="border-l-8 border-purple-600 w-full first:my-5 space-y-2 rounded-md shadow-md bg-white p-3 hover:text-[#635fc7] cursor-pointer "
      >
        <h3 className=" font-bold tracking-wide ">{task.title}</h3>
        <p className="tracking-wide ">{task.description}</p>
        <div className="flex space-x-1">
          <FaRegClock />
          <p className="text-xs text-gray-500">{countdown}</p>
        </div>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </>
  );
}

export default Task;
