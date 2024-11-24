import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import ProjectElipsisMenu from "../ui/ProjectElipsisMenu";
import SidebarToggle from '../ui/sidebarToggle'

import {
  AddEditProjectModal,
  DeleteModal
} from '../ui/modals'

import projectsSlice from "../../redux/projectsSlice";


function Header({ setIsProjectModalOpen, isProjectModalOpen, onToggle }) {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive);

  const setOpenEditModal = () => {
    setIsProjectModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(projectsSlice.actions.deleteBoard());
      dispatch(projectsSlice.actions.setProjectActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="px-6 py-3 bg-[#1F1F1F] rounded-[7px]">
      <header className="flex justify-between items-center ">
        <div className="flex items-center space-x-2" >
          <SidebarToggle onToggle={onToggle} />
          <h3 className=" truncate max-w-[200px] md:text-2xl text-xl text-white font-bold font-sans  ">
            {project?.name}
          </h3>
        </div>


        {
          project && (
            <div className=" flex space-x-4 items-center md:space-x-6 ">
              <a href='/create-task'
                className="flex items-center space-x-1 py-2 px-4 rounded-md text-white text-sm font-semibold bg-[#C38FFF] duration-200"
               >
                <FaPlus />
                <span>New Task</span>
              </a>
              <FaEllipsisV 
                onClick={() => {
                  setProjectType("edit");
                  setIsElipsisMenuOpen((prevState) => !prevState);
                }}
                className=" cursor-pointer h-5 text-white"
              />
              {isElipsisMenuOpen && (
                <ProjectElipsisMenu
                  type="project"
                  setOpenEditModal={setOpenEditModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              )}
            </div>
          )
        }

      </header>

      {isProjectModalOpen && (
        <AddEditProjectModal
          setProjectType={setProjectType}
          type={projectType}
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="project"
          title={project.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
