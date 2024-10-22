import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Task from "./Task";

function Column({ colIndex }) {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const col = project.columns.find((col, i) => i === colIndex);


  return (
    <div
      className="scrollbar-hide mx-5 min-w-[280px] "
    >
      <p className=" font-semibold flex mb-8 items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${col.name.toLowerCase() === 'todo' && 'bg-red-500'} ${col.name.toLowerCase() === 'in-progress' && 'bg-yellow-500'} ${col.name.toLowerCase() === 'completed' && 'bg-green-500'}`} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
