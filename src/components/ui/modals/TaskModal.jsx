import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ElipsisMenu from '../ElipsisMenu';

import { FaEllipsisV } from "react-icons/fa";

import Subtask from "../Subtask";
import projectsSlice from "../../../redux/projectsSlice";

import {
  AddEditTaskModal,
  DeleteModal
} from './index'


function TaskModal({ taskIndex, setIsTaskModalOpen }) {

  const dispatch = useDispatch()
  
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const task = project.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;
  const [status, setStatus] = useState(task.status);

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const taskIsCompleted = completed === subtasks.length

  useEffect(()=>{
    if(taskIsCompleted){
      setStatus('completed')
    }else{
      setStatus('in-progress')
    }
    dispatch(
      projectsSlice.actions.setTaskStatus({
        taskIndex,
        status,
      })
    );
  }, [completed])

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      projectsSlice.actions.setTaskStatus({
        taskIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(projectsSlice.actions.deleteTask({ taskIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="flex items-center justify-center fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 dropdown "
    >
      {/* MODAL SECTION */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white text-black font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>

          <FaEllipsisV
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            className=" cursor-pointer h-6 text-gray-600"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtasks section */}

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                key={index}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm text-gray-500">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option value='to-do' className="status-options">
              To-do
            </option>
            <option value='in-progress' className="status-options">
              In-progress
            </option>
            <option value='completed' className="status-options">
              Completed
            </option>
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
