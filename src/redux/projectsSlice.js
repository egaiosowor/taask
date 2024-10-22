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
        columns: [],
      };
      project.columns = payload.newColumns;
      state.push(project);
      updateProjects(state)
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      project.name = payload.name;
      project.columns = payload.newColumns;
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
      const { title, status, description, dueDate, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, dueDate, subtasks, status };
      const project = state.find((project) => project.isActive);
      const column = project.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
      updateProjects(state)
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        dueDate,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const project = state.find((project) => project.isActive);
      const column = project.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.dueDate = dueDate;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = project.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
      updateProjects(state)
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      const col = project.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
      updateProjects(state)
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      const columns = project.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
      updateProjects(state)
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const project = state.find((project) => project.isActive);
      const col = project.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      updateProjects(state)
    },
  },
});

export default projectsSlice;
