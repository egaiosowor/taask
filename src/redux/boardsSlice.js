import { createSlice } from "@reduxjs/toolkit";
// import data from "../data.json";

// const data = {
//   "boards": [
//     {
//       "name": "Platform Launch",
//       "isActive" : false,
//       "columns": [
//         {
//           "name": "Todo",
//           "tasks": [
//             {
//               "title": "Build UI for onboarding flow",
//               "description": "",
//               "status": "Todo",
//               "subtasks": [
//                 {
//                   "title": "Sign up page",
//                   "isCompleted": true
//                 },
//                 {
//                   "title": "Sign in page",
//                   "isCompleted": false
//                 },
//                 {
//                   "title": "Welcome page",
//                   "isCompleted": false
//                 }
//               ],
//               "dueDate": "2024-08-03T11:00:00Z"
//             },
//             {
//               "title": "Build UI for search",
//               "description": "",
//               "status": "Todo",
//               "subtasks": [
//                 {
//                   "title": "Search page",
//                   "isCompleted": false
//                 }
//               ],
//               "dueDate": "2024-08-03T11:00:00Z"
//             }
//           ]
//         },
//         {
//           "name": "In-Progress",
//           "tasks": [
//             {
//               "title": "Design settings and search pages",
//               "description": "",
//               "status": "In-Progress",
//               "subtasks": [
//                 {
//                   "title": "Settings - Account page",
//                   "isCompleted": true
//                 },
//                 {
//                   "title": "Settings - Billing page",
//                   "isCompleted": true
//                 },
//                 {
//                   "title": "Search page",
//                   "isCompleted": false
//                 }
//               ],
//               "dueDate": "2024-08-03T11:00:00Z"
//             },
//             {
//               "title": "Add account management endpoints",
//               "description": "",
//               "status": "In-Progress",
//               "subtasks": [
//                 {
//                   "title": "Upgrade plan",
//                   "isCompleted": true
//                 },
//                 {
//                   "title": "Cancel plan",
//                   "isCompleted": true
//                 },
//                 {
//                   "title": "Update payment method",
//                   "isCompleted": false
//                 }
//               ],
//               "dueDate": "2024-08-03T11:00:00Z"
//             }
//           ]
//         },
//         {
//           "name": "Completed",
//           "tasks": [
//             {
//               "title": "Conduct 5 wireframe tests",
//               "description": "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
//               "status": "Completed",
//               "subtasks": [
//                 {
//                   "title": "Complete 5 wireframe prototype tests",
//                   "isCompleted": true
//                 }
//               ],
//               "dueDate": "2024-08-03T11:00:00Z"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }


// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("boards");
    if (serializedState === null) {
      return []; // Return an empty boards array if nothing is in localStorage
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return []; // Return an empty boards array in case of an error
  }
};

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("boards", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const boardsSlice = createSlice({
  name: "boards",
  // initialState: data.boards,
  initialState: loadStateFromLocalStorage(),
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
      saveStateToLocalStorage(state)
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
      saveStateToLocalStorage(state)
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
      saveStateToLocalStorage(state)
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
      saveStateToLocalStorage(state)
    },
    addTask: (state, action) => {
      const { title, status, description, dueDate, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, dueDate, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
      saveStateToLocalStorage(state)
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
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.dueDate = dueDate;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
      saveStateToLocalStorage(state)
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
      saveStateToLocalStorage(state)
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
      saveStateToLocalStorage(state)
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
      saveStateToLocalStorage(state)
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      saveStateToLocalStorage(state)
    },
  },
});

export default boardsSlice;
