import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useDisclosure from "./hooks/useDisclosure";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/layout/Layout"; // Include the Layout
import Home from "./components/pages/Home";
import CreateTaskPage from "./components/pages/CreateTaskPage";
import EditTaskPage from "./components/pages/EditTaskPage";
import projectsSlice from "./redux/projectsSlice";

function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  const activeProject = projects.find((project) => project.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(projectsSlice.actions.setProjectActive({ index: 0 }));

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Router>
      <Layout
        setIsProjectModalOpen={setIsProjectModalOpen}
        isProjectModalOpen={isProjectModalOpen}
        isOpen={isOpen}
        onToggle={onToggle}
      >
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/edit-task/:taskId" element={<EditTaskPage />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </Router>
  );
}

export default App;
