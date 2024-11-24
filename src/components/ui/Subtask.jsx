import React from "react";
import { useDispatch, useSelector } from "react-redux";
import projectsSlice from "../../redux/projectsSlice";

function Subtask({ subtaskId, taskId }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const task = project.tasks.find((task) => task.id === taskId);
  const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      projectsSlice.actions.setSubtaskCompleted({ subtaskId, taskId })
    );
  };

  return (
    <div className=" w-full flex hover:bg-[#635fc740] rounded-md relative items-center justify-start p-3 gap-4 border border-gray-50">
      <input
        className="text-gray-200 w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`text-gray-200 ${checked && " line-through opacity-30 "}`}>
      {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
