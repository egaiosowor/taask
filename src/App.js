import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './components/layout/Sidebar'
import Home from "./components/container/Home";
import projectsSlice from "./redux/projectsSlice";

function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((project) => project.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(projectsSlice.actions.setProjectActive({ index: 0 }));


  return (
    <div className="flex">
      <Sidebar
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
      />
      <Home
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
      />
    </div>
  )
}

export default App;
