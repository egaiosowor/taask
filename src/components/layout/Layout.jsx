import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, setIsProjectModalOpen, isProjectModalOpen, isOpen, onToggle }) {
  return (
    <div className="flex">

      <Sidebar
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        isOpen={isOpen}
        onToggle={onToggle}
      />

      <div className="flex flex-col flex-[4] px-4 min-h-screen" >
        <Header
          setIsProjectModalOpen={setIsProjectModalOpen}
          isProjectModalOpen={isProjectModalOpen}
          onToggle={onToggle}
        />
        <main>{children}</main>
      </div>

    </div>
  );
}

export default Layout;
