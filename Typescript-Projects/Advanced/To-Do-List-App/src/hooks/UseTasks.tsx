import { useEffect, useState } from "react";
import Task from "../Types/Task";

function UseTasks() {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const tasks = localStorage.getItem("todo");
        setTasks(tasks ? JSON.parse(tasks) : []);
    }, []);

    const addTask = (newTask: Task) => {
        setTasks([...tasks, newTask]);
        localStorage.setItem("todo", JSON.stringify([...tasks, newTask]));
    }

    const updateTask = (updatedTask: Task) => {
        const newTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        setTasks(newTasks);
        localStorage.setItem("todo", JSON.stringify(newTasks));

    };

    const deleteTask = (taskId: string) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
        localStorage.setItem("todo", JSON.stringify(newTasks));
      };

    return { tasks, addTask, updateTask, deleteTask };
}

export default UseTasks;