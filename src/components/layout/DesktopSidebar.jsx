import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaCirclePlus } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";

import projectsSlice from "../../redux/projectsSlice";
import { AddEditProjectModal } from "../ui/modals";

function DesktopSidebar({ isOpen }) {
  const dispatch = useDispatch();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);

  return (
    <>
      <div
        className={`z-50 py-8 space-y-5 bg-[#1F1F1F] min-h-screen transition-all duration-200 ease-in-out ${isOpen ? 'flex-[.5]  px-6' : 'w-0 overflow-hidden'} `}
      >
        <a href='/' className="flex items-center space-x-1">
            <FaCheckDouble className="text-red-700"/>
            <h3 className="text-xl text-white font-bold font-sans">
              Taask
            </h3>
        </a>
        <div className="py-4 rounded-xl space-y-4">
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
            {projects?.map((project, index) => (
              <div
                className={`py-2 px-4 rounded-lg duration-500 ease-in-out cursor-pointer hover:opacity-8 ${project.isActive &&
                  " bg-[#C38FFF] text-white font-black"
                  } `}
                key={index}
                onClick={() => {
                  dispatch(projectsSlice.actions.setProjectActive({ index }));
                }}
              >
                <p className={`truncate max-w-[150px] text-white text-base font-medium ${project.isActive &&
                  "font-black"
                  }`}>{project.name}</p>
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

export default DesktopSidebar;
