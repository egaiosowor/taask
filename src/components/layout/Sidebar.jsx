import React from "react";
import useIsMobile from "../../hooks/useIsMobile";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

function Sidebar({ setIsProjectModalOpen, isProjectModalOpen, isOpen, onToggle }) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          setIsProjectModalOpen={setIsProjectModalOpen}
          isProjectModalOpen={isProjectModalOpen}
          isOpen={isOpen}
          onToggle={onToggle}
        />
      ) : (
        <DesktopSidebar
          setIsProjectModalOpen={setIsProjectModalOpen}
          isProjectModalOpen={isProjectModalOpen}
          isOpen={isOpen}
        />
      )}
    </>
  );
}

export default Sidebar;
