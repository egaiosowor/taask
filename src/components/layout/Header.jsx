import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "../ui/ElipsisMenu";

import {
  AddEditTaskModal,
  AddEditBoardModal,
  DeleteModal
} from '../ui/modals'

import boardsSlice from "../../redux/boardsSlice";


function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-2 py-3 bg-white">
      <header className="flex justify-between items-center ">
        {/* Left Side  */}
        <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold font-sans  ">
          {board.name}
        </h3>

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className="flex items-center space-x-1 py-2 px-4 rounded-md text-white text-sm font-semibold bg-black hover:opacity-70 duration-200"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            <FaPlus />
            <span>New Task</span>
          </button>
          <FaEllipsisV 
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false)
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            className=" cursor-pointer h-6 text-gray-600"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Board"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
