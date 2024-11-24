import { toast } from "react-toastify";

export default function NotifyTaskdue (task){
  toast.info(
    <>
      <div>
        Task Due: <strong>{task.title}</strong>
      </div>
      <a href={`/tasks/${1}`} className="text-blue-500 underline">
        View Task
      </a>
    </>,
    {
      position: "top-right",
      autoClose: 5000,
    }
  );
};

