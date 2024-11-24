import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import projectsSlice from "../../redux/projectsSlice";
import { MdLibraryAdd } from "react-icons/md";

function CreateTaskPage() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([
        { title: "", dueDate: null, isCompleted: false, id: uuidv4() },
    ]);

    // Handle title change for subtasks
    const onChangeSubtaskTitle = (id, newValue) => {
        setSubtasks((prevState) =>
            prevState.map((subtask) =>
                subtask.id === id ? { ...subtask, title: newValue } : subtask
            )
        );
    };

    // Handle due date change for subtasks
    const onChangeSubtaskDueDate = (id, newDate) => {
        setSubtasks((prevState) =>
            prevState.map((subtask) =>
                subtask.id === id ? { ...subtask, dueDate: newDate } : subtask
            )
        );
    };

    const navigate = useNavigate();

    // Handle task submission
    const onSubmit = () => {
        if (!title.trim()) {
            alert("Task name is required!");
            return;
        }
        if (!description.trim()) {
            alert("Description is required!");
            return;
        }
        if (subtasks.some((subtask) => !subtask.title.trim())) {
            alert("All subtasks must have titles!");
            return;
        }
        if (subtasks.some((subtask) => !subtask.dueDate)) {
            alert("All subtasks must have due dates!");
            return;
        }

        // Calculate the main task's due date based on the latest subtask due date
        const dueDate = Math.max(
            ...subtasks.map((subtask) => new Date(subtask.dueDate).getTime())
        );

        dispatch(
            projectsSlice.actions.addTask({
                id: uuidv4(),
                title,
                description,
                dueDate: new Date(dueDate),
                subtasks, // Store subtasks along with their due dates
                status: "to-do",
            })
        );

        // Clear fields after submission
        setTitle("");
        setDescription("");
        setSubtasks([{ title: "", dueDate: null, isCompleted: false, id: uuidv4() }]);
        navigate("/");
    };

    return (
        <div className="bg-[#1F1F1F] flex flex-col py-4 px-6 rounded-[7px] ">
            <div className="max-w-[500px]">
                <h1 className="font-bold text-lg text-white">Create Task</h1>

                {/* Task Title */}
                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-200">Task Name</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="text-gray-200 bg-transparent px-4 py-2 rounded-md border border-gray-600"
                    />
                </div>

                {/* Task Description */}
                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-200">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-gray-200 bg-transparent px-4 py-2 rounded-md border border-gray-600"
                    />
                </div>

                {/* Subtasks */}
                <div className="mt-8 flex flex-col space-y-3">
                    <div className="flex items-center space-x-1">
                        <MdLibraryAdd
                            onClick={() =>
                                setSubtasks((state) => [
                                    ...state,
                                    { title: "", dueDate: null, isCompleted: false, id: uuidv4() },
                                ])
                            }
                            className="text-xl text-gray-200 cursor-pointer"
                        />
                        <label className="text-sm text-gray-200">Subtasks</label>
                    </div>
                    
                    {subtasks.map((subtask) => (
                        <div key={subtask.id} className="w-full flex gap-1">
                            <input
                                value={subtask.title}
                                onChange={(e) => onChangeSubtaskTitle(subtask.id, e.target.value)}
                                placeholder="Subtask title"
                                className="bg-transparent w-[45%] text-gray-200 px-4 py-2 rounded-md border border-gray-600"
                            />
                            <DatePicker
                                selected={subtask.dueDate}
                                onChange={(date) => onChangeSubtaskDueDate(subtask.id, date)}
                                showTimeSelect
                                dateFormat="d MMM yyyy, h:mm aa"
                                className="p-2 text-gray-200 cursor-pointer border bg-transparent border-gray-600 rounded-md"
                                placeholderText="Subtask due date"
                            />
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    onClick={onSubmit}
                    className="mt-8 font-medium w-full text-white bg-[#C38FFF] hover:opacity-70 py-2 rounded-lg"
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreateTaskPage;
