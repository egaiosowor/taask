import React, { useState } from "react";
import {AddEditProjectModal} from "../ui/modals";
import { FaPlus } from "react-icons/fa";

function EmptyBoard({ type }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  return (
    <div className="space-y-4 bg-white h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-800 font-bold">
        {type === "edit"
          ? "This project is empty. Create a new column to get started."
          : "There are no projects available. Create a new project to get started"}
      </h3>
      <button
        onClick={() => {
          setIsProjectModalOpen(true);
        }}
        className="w-full flex justify-center space-x-2 items-center max-w-xs font-bold hover:opacity-70 relative  text-white bg-black py-2 rounded-lg"
      >
        <FaPlus />
        <span>
          {type === "edit" ? "Add New Column" : "Add New project"}  
        </span>
      </button>
      {isProjectModalOpen && (
        <AddEditProjectModal
          type={type}
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
