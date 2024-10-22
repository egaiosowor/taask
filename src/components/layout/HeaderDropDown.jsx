import React from "react";
import { useDispatch, useSelector } from "react-redux";
import projectsSlice from "../../redux/projectsSlice";
import {MdDashboardCustomize} from 'react-icons/md'


function HeaderDropDown({ setOpenDropdown, setIsProjectModalOpen }) {
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects);

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
          ALL projects ({projects?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {projects.map((project, index) => (
            <div
              className={`py-2 px-6 rounded-lg ${
                project.isActive &&
                " bg-black text-white"
              } `}
              key={index}
              onClick={() => {
                dispatch(projectsSlice.actions.setProjectActive({ index }));
              }}
            >
              <p className=" text-base font-bold  ">{project.name}</p>
            </div>
          ))}

          <div 
          onClick={() => {
            setIsProjectModalOpen(true);
            setOpenDropdown(false)
          }}
          className="px-6 py-2 flex items-center space-x-2">
            <MdDashboardCustomize className="text-white text-2xl" />
            <p className=" text-base font-bold text-white  ">New project</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
