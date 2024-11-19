import React from "react";

function TaskElipsisMenu({ type, setOpenDeleteModal, taskId }) {
  
  return (
    <div
      className={
       "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <a href={`/edit-task/${taskId}`}
            className="cursor-pointer text-gray-700"
          >
            Edit Task
          </a>

          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskElipsisMenu;
