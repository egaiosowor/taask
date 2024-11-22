import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import projectsSlice from "../../../redux/projectsSlice";

// import { RxCross2 } from "react-icons/rx";
import { MdLibraryAdd } from "react-icons/md";


function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskId
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const project = useSelector((state) => state.projects).find(
    (project) => project.isActive
  );

  const task = type === 'edit' ? project.tasks.find((task) => task.id === taskId) : [];
  const [status, setStatus] = useState(task.status);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate)
    setIsFirstLoad(false);
  }

  // const onDelete = (id) => {
  //   setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  // };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        projectsSlice.actions.addTask({
          title,
          description,
          dueDate,
          subtasks,
        })
      );
    } else {
      dispatch(
        projectsSlice.actions.editTask({
          title,
          description,
          dueDate,
          subtasks,
          status,
          taskId,
        })
      );
    }
  };

  
  return (
    <div
      className={"grid justify-center items-center absolute left-0 right-0 top-0 bottom-0 dropdown"}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className="overflow-y-scroll max-h-[70vh] my-auto bg-white text-black font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-4 py-6 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Create"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm text-gray-800">
            Task Name
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm text-gray-800">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[100px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
          />
        </div>

        {/* Subtasks */}

        <div className="mt-8 flex flex-col space-y-3">
          <div className="flex items-center space-x-1" >
            <MdLibraryAdd 
              onClick={() => {
                setSubtasks((state) => [
                  ...state,
                  { title: "", isCompleted: false, id: uuidv4() },
                ]);
              }}
              className="text-xl cursor-pointer"/>
            <label className="text-sm text-gray-800">Subtasks</label>
          </div>
          <div className='space-y-2' >
            {subtasks.map((subtask, index) => (
              <div key={index} className=" flex items-center w-full ">
                <input
                  onChange={(e) => {
                    onChangeSubtasks(subtask.id, e.target.value);
                  }}
                  required
                  type="text"
                  value={subtask.title}
                  className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                />
                {/* <RxCross2 
                  onClick={() => {
                    onDelete(subtask.id);
                  }} 
                  className="m-4 text-xl cursor-pointer" /> */}
              </div>
            ))}
          </div>
        </div>

        {/* current Status  */}
        {type === "edit" &&
          <div className="mt-8 flex flex-col space-y-3">
            <label className="  text-sm text-gray-500">
              Current Status
            </label>
            <select
              required
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            >
              <option value='to-do' >To-do</option>
              <option value='in-progress' >In-progress</option>
              <option value='completed' >Completed</option>
            </select>          
          </div>
        }

        {/* due date  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm  text-gray-500">
           Due Date
          </label>
          <DatePicker
            required
            selected={type === 'edit' ? new Date(dueDate) : dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            dateFormat="d MMM YYYY, h:mmaa"
            className="p-2 cursor-pointer border border-black rounded-md"
            placeholderText="Select date"
          />

          {/* Create task button */}
          <button
            onClick={() => {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }}
            type='submit'
            className="font-medium w-full items-center text-white bg-black hover:opacity-70 py-2 rounded-lg"
          >
           {type === "edit" ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
