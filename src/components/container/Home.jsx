import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddEditBoardModal } from '../ui/modals';
import Column from "../ui/Column";
import Header from "../layout/Header";

function Home() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div className="flex-[4] px-2">
      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />

      {/* Columns Section */}

      <div className="flex">
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
      </div>
      
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
