import { createContext } from "react";
import Task from "../Types/Task";

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);


export default TaskContext;