import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import projectsSlice from "../../redux/projectsSlice";
import { MdLibraryAdd } from "react-icons/md";

function EditTaskPage() {
    const { taskId } = useParams(); // Get taskId from the URL params
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const project = useSelector((state) => state.projects).find(
        (project) => project.isActive
    );

    const task = project.tasks.find((task) => task.id === taskId )

    // Initialize form state with the task data if task exists
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [subtasks, setSubtasks] = useState(task?.subtasks || [
        { title: "", dueDate: null, isCompleted: false, id: uuidv4() },
    ]);

    useEffect(() => {
        if (!task) {
            // Handle the case where the task is not found
            alert("Task not found");
            navigate("/"); // Redirect to home or another page
        }
    }, [task, navigate]);

    const onChangeSubtaskTitle = (id, newValue) => {
        setSubtasks((prevState) =>
            prevState.map((subtask) =>
                subtask.id === id ? { ...subtask, title: newValue } : subtask
            )
        );
    };

    const onChangeSubtaskDueDate = (id, newDate) => {
        setSubtasks((prevState) =>
            prevState.map((subtask) =>
                subtask.id === id ? { ...subtask, dueDate: newDate } : subtask
            )
        );
    };

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

        const dueDate = Math.max(
            ...subtasks.map((subtask) => new Date(subtask.dueDate).getTime())
        );

        dispatch(
            projectsSlice.actions.editTask({
                id : taskId, // Send task ID along with updated task data
                title,
                description,
                dueDate: new Date(dueDate),
                subtasks,
                status: "to-do", // Adjust status if necessary
            })
        );

        // Redirect to the home page or the task list after editing
        navigate("/");
    };

    return (
        <div className="bg-[#1F1F1F] flex flex-col py-4 px-6 rounded-md">
            <div className="max-w-[500px]">
                <h1 className="font-bold text-lg text-white">Edit Task</h1>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-200">Task Name</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="bg-transparent text-gray-200 px-4 py-2 rounded-md border border-gray-600"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-200">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-transparent text-gray-200 px-4 py-2 rounded-md border border-gray-600"
                    />
                </div>

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
                        <div key={subtask.id} className="space-x-2">
                            <input
                                value={subtask.title}
                                onChange={(e) => onChangeSubtaskTitle(subtask.id, e.target.value)}
                                placeholder="Subtask title"
                                className="bg-transparent text-gray-200 px-4 py-2 rounded-md border border-gray-600"
                            />
                            <DatePicker
                                selected={new Date(subtask.dueDate)}
                                onChange={(date) => onChangeSubtaskDueDate(subtask.id, date)}
                                showTimeSelect
                                dateFormat="d MMM yyyy, h:mm aa"
                                className="p-2 cursor-pointer border border-gray-600 bg-transparent text-gray-200 rounded-md"
                                placeholderText="Subtask due date"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={onSubmit}
                    className="mt-8 font-medium w-full text-white bg-[#C38FFF] hover:opacity-70 py-2 rounded-lg"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default EditTaskPage;
