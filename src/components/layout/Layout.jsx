import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, setIsProjectModalOpen, isProjectModalOpen, isOpen, onToggle }) {
  return (
    <div className="flex bg-[#000000]">

      <Sidebar
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        isOpen={isOpen}
        onToggle={onToggle}
      />

      <div className="flex flex-col justify-between flex-[4] space-y-8 p-4 min-h-screen" >
        <Header
          setIsProjectModalOpen={setIsProjectModalOpen}
          isProjectModalOpen={isProjectModalOpen}
          onToggle={onToggle}
        />
        <main className="basis-[90%]" >{children}</main>
      </div>

    </div>
  );
}

export default Layout;
