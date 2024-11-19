import { createSlice } from "@reduxjs/toolkit";
import { getProjects, updateProjects } from "../utils";

const projectsSlice = createSlice({
  name: "projects",
  initialState: getProjects(),
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const project = {
        name: payload.name,
        isActive,
        tasks: [],
      };
      state.push(project);
      updateProjects(state)
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      project.name = payload.name;
      updateProjects(state)
    },
    deleteBoard: (state) => {
      const project = state.find((project) => project.isActive);
      state.splice(state.indexOf(project), 1);
      updateProjects(state)
    },
    setProjectActive: (state, action) => {
      state.map((project, index) => {
        index === action.payload.index
          ? (project.isActive = true)
          : (project.isActive = false);
        return project;
      });
      updateProjects(state)
    },
    addTask: (state, action) => {
      const { title, description, dueDate, subtasks, status } = action.payload;
      const task = { title, description, dueDate, subtasks, status };
      const project = state.find((project) => project.isActive);
      if (project) {
          project.tasks.push(task);
      }
      updateProjects(state);
  },
  
  editTask: (state, action) => {
    const {
      title,
      status,
      description,
      dueDate,
      subtasks,
      taskIndex,
    } = action.payload;
    const project = state.find((project) => project.isActive);
    const task = project.tasks.find((task, index) => index == taskIndex);
    task.title = title;
    task.status = status;
    task.description = description;
    task.dueDate = dueDate;
    task.subtasks = subtasks;
    project.tasks = project.tasks.filter((task, index) => index !== taskIndex);
    project.tasks.push(task);
    updateProjects(state)
  },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      const task = project.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
      updateProjects(state)
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      const task = project.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      project.tasks = project.tasks.filter((task, i) => i !== payload.taskIndex);
      project.tasks.push(task);
      updateProjects(state)
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      project.tasks = project.tasks.filter((task, i) => i !== payload.taskIndex);
      updateProjects(state)
    },
    
  },
});

export default projectsSlice;
