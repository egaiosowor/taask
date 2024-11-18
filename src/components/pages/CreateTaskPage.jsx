import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import projectsSlice from "../../redux/projectsSlice";

// import { RxCross2 } from "react-icons/rx";
import { MdLibraryAdd } from "react-icons/md";


function CreateTaskPage() {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState();
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

    // const onDelete = (id) => {
    //   setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    // };

    
    function ClearFields (){
        setTitle('')
        setDescription('')
        setDueDate('')
    }

    const navigate = useNavigate();

    const onSubmit = () => {

        if (!title.trim()) {
            alert("Task name is required!");
            return;
        }
        if (!description.trim()) {
            alert("Description is required!");
            return;
        }
        if (!dueDate) {
            alert("Due date is required!");
            return;
        }
        if (subtasks.some((subtask) => !subtask.title.trim())) {
            alert("All subtasks must have titles!");
            return;
        }
        dispatch(
            projectsSlice.actions.addTask({
                title,
                description,
                dueDate,
                subtasks,
                status: 'to-do'
            })
        );
        ClearFields()
        navigate('/')
    }


    return (
        <div className="bg-gray-100 flex flex-col p-4 border rounded-md ">
            <div className="max-w-[500px]" >
                <h1 className="font-bold text-lg ">
                    Create Task
                </h1>

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
                            className="text-xl cursor-pointer" />
                        <label className="text-sm text-gray-800">Subtasks</label>
                    </div>
                    <div className='space-y-2' >
                        {subtasks.map((subtask, index) => (
                            <div key={index} className=" flex items-center w-full ">
                                <input
                                    onChange={(e) => {
                                        onChangeSubtasks(subtask.id, e.target.value);
                                    }}
                                    required={true}
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


                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm  text-gray-500">
                        Due Date
                    </label>
                    <DatePicker
                        required
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        showTimeSelect
                        dateFormat="d MMM YYYY, h:mmaa"
                        className="p-2 cursor-pointer border border-black rounded-md"
                        placeholderText="Select date"
                    />

                    <button
                        onClick={() => {
                            onSubmit();
                        }}
                        type='submit'
                        className="font-medium w-full items-center text-white bg-black hover:opacity-70 py-2 rounded-lg"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskPage;
