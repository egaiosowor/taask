import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";


function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={`py-2 px-6 rounded-lg ${
                board.isActive &&
                " bg-black text-white"
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <p className=" text-base font-bold  ">{board.name}</p>
            </div>
          ))}

          <div 
          onClick={() => {
            setIsBoardModalOpen(true);
            setOpenDropdown(false)
          }}
          className="px-6 py-2 flex items-center space-x-2">
            <MdDashboardCustomize className="text-white text-2xl" />
            <p className=" text-base font-bold text-white  ">New Board</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
