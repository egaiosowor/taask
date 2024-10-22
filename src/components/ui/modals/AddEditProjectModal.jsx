import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import projectsSlice from "../../../redux/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

function AddEditProjectModal({ setIsProjectModalOpen, type , }) {
  
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");

  const project = useSelector((state) => state.projects).find(
    (project) => project.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setName(project.name);
    setIsFirstLoad(false);
  }


  const onSubmit = (type) => {
    setIsProjectModalOpen(false);
    if (type === "add") {
      dispatch(projectsSlice.actions.addBoard({ name }));
    } else {
      dispatch(projectsSlice.actions.editBoard({ name }));
    }
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsProjectModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} project
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm text-gray-800">
            project Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0 "
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="project-name-input"
          />
        </div>

        <div>
          <button
            onClick={() => {
              onSubmit(type);
            }}
            className=" w-full items-center hover:opacity-70 mt-8 relative  text-white bg-black py-2 rounded-lg"
          >
            {type === "add" ? "Create New project" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditProjectModal;
