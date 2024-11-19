import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ElipsisMenu({ type, setOpenDeleteModal, taskId }) {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle edit button click
  const handleEditClick = () => {
    console.log(taskId)
    if (type === "Task" && taskId) {
      // Navigate to the edit task page with the taskId as part of the URL
      navigate(`/edit-task/${taskId}`);
    }
  };

  return (
    <div
      className={
        type === "project"
          ? "absolute top-16 right-5"
          : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <p
            onClick={handleEditClick} // Trigger edit route
            className="cursor-pointer text-gray-700"
          >
            Edit {type}
          </p>

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

export default ElipsisMenu;
