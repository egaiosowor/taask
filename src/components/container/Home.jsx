import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddEditProjectModal } from '../ui/modals';
import Column from "../ui/Column";
import Header from "../layout/Header";

function Home() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project.isActive === true);
  const columns = project.columns;

  return (
    <div className="flex-[4] px-2">
      <Header
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
      />

      {/* Columns Section */}

      <div className="flex">
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
      </div>
      
      {isProjectModalOpen && (
        <AddEditProjectModal
          type="edit"
          setIsProjectModalOpen={setIsProjectModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
