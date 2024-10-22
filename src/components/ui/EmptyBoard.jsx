import React, { useState } from "react";
import {AddEditBoardModal} from "../ui/modals";
import { FaPlus } from "react-icons/fa";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className="space-y-4 bg-white h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-800 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full flex justify-center space-x-2 items-center max-w-xs font-bold hover:opacity-70 relative  text-white bg-black py-2 rounded-lg"
      >
        <FaPlus />
        <span>
          {type === "edit" ? "Add New Column" : "Add New Board"}  
        </span>
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
