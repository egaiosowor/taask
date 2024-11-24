import React from "react";

function ProjectElipsisMenu({ setOpenEditModal, setOpenDeleteModal }) {

  return (
    <div
      className="absolute top-16 right-5"
    >
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md bg-[#1F1F1F] space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer text-white"
          >
            Edit Project
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
          >
            Delete Project
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectElipsisMenu;
