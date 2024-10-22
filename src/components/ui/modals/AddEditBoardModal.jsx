import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import boardsSlice from "../../../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";

function AddEditBoardModal({ setIsBoardModalOpen, type , }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "In-Progress", tasks: [], id: uuidv4() },
    { name: "Completed", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0 ; i < newColumns.length ; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm text-gray-800">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0 "
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        <div>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            className=" w-full items-center hover:opacity-70 mt-8 relative  text-white bg-black py-2 rounded-lg"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
