import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdDashboardCustomize } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";

import projectsSlice from "../../redux/projectsSlice";
import { AddEditProjectModal } from "../ui/modals";

function Sidebar() {
  const dispatch = useDispatch();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);

  return (
    <>
      <div
        className='flex-[.5] py-3 px-6 bg-gray-50 min-h-screen'
      >
        <a href='/' className="flex items-center space-x-1">
            <FaCheckDouble className="text-red-700"/>
            <h3 className="text-xl hidden md:inline-block font-bold font-sans">
              Taask
            </h3>
        </a>
        <div className="py-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between" >
            <span className="text-sm text-gray-500 font-medium">
              PROJECTS
            </span>
            <FaCirclePlus 
              onClick={() => {
                setIsProjectModalOpen(true);
              }}
              className="cursor-pointer text-gray-500"
            />
          </div>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div
                className={`p-2 rounded-lg duration-500 ease-in-out cursor-pointer hover:opacity-80 ${project.isActive &&
                  " bg-white"
                  } `}
                key={index}
                onClick={() => {
                  dispatch(projectsSlice.actions.setProjectActive({ index }));
                }}
              >
                <p className="truncate max-w-[150px] text-gray-500 text-base font-medium ">{project.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isProjectModalOpen && (
        <AddEditProjectModal
          type="add"
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
    </>
  );
}

export default Sidebar;
