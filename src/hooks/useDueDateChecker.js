import { useState, useEffect } from "react";
import NotifyTaskdue from "../components/ui/NotifyTaskdue";

const useDueDateChecker = (tasks) => {
  const [notifiedTasks, setNotifiedTasks] = useState(new Set());
  const [notificationQueue, setNotificationQueue] = useState([]);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      tasks.forEach((task) => {
        const dueTime = new Date(task.dueDate).getTime();
        const timeDiff = dueTime - now;

        // Notify for overdue tasks only if not already notified
        if (timeDiff <= 0 && !notifiedTasks.has(task.id)) {
          setNotificationQueue((prevQueue) => [...prevQueue, task]);
          setNotifiedTasks((prevSet) => new Set(prevSet).add(task.id));
        }
      });
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [tasks, notifiedTasks]);

  // Handle sequential notifications
  useEffect(() => {
    if (notificationQueue.length === 0) return;

    const taskToNotify = notificationQueue[0];
    NotifyTaskdue(taskToNotify);

    // Remove notified task from queue after a delay
    const timeoutId = setTimeout(() => {
      setNotificationQueue((prevQueue) => prevQueue.slice(1));
    }, 3000); // Adjust delay as needed

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, [notificationQueue]);

  return {
    notifiedTasks,
    notificationQueue,
  };
};

export default useDueDateChecker;
