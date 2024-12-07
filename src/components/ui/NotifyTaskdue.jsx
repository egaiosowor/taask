import { toast } from "react-toastify";

export default function NotifyTaskDue(task) {
  // Play an alarm sound when toast shows
  const playAlarm = () => {
    const audio = new Audio("/audio.wav");
    // console.log("audio", audio);
    audio.volume = 1; // Set volume (0.0 to 1.0)
    audio.preload = "auto"; // Preload the audio
    audio.play().catch((err) => {
      console.error("Failed to play sound:", err);
    });
  };

  // Show the toast notification and play sound
  toast.info(
    <>
      <div>
        Task Due: <strong>{task.title}</strong>
      </div>
      <a href={`/tasks/${task.id}`} className="text-blue-500 underline">
        View Task
      </a>
    </>,
    {
      position: "top-right", 
      autoClose: 5000,
      onOpen: playAlarm // Play sound when toast opens
    }
  );
}
