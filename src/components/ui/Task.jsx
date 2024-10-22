import React, { useState } from "react";
import { useSelector } from "react-redux";
import {TaskModal} from "../ui/modals";
import { FaRegClock } from "react-icons/fa6";


function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
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

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

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
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 space-y-2 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
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
    </div>
  );
}

export default Task;
