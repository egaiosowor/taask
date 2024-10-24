import React, { useState } from "react";
import useDisclosure from "./hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";
import useIsMobile from "./hooks/useIsMobile";

import MobileSidebar from './components/layout/MobileSidebar'
import DesktopSidebar from './components/layout/DesktopSidebar'
import Home from "./components/container/Home";
import projectsSlice from "./redux/projectsSlice";

function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((project) => project.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(projectsSlice.actions.setProjectActive({ index: 0 }));

  const {isOpen, onToggle} = useDisclosure()

  const isMobile = useIsMobile()

  return (
    <div className="flex">
      {
        isMobile ? (     
            <MobileSidebar
              setIsProjectModalOpen={setIsProjectModalOpen}
              isProjectModalOpen={isProjectModalOpen}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          ):
          (
          <DesktopSidebar
            setIsProjectModalOpen={setIsProjectModalOpen}
            isProjectModalOpen={isProjectModalOpen}
            isOpen={isOpen}
          />
        )
      }
      <Home
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        onToggle={onToggle}
      />
    </div>
  )
}

export default App;
