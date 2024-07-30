import { useContext, useState } from "react";
import { FaCheckCircle, FaCircle, FaHistory, FaPencilAlt, FaThumbtack, FaTrashAlt } from "react-icons/fa";
import TaskContext from "../contexts/TaskContext";
import { formatDistanceToNow, isToday, isTomorrow } from 'date-fns';
import Task from "../Types/Task";
import EditTask from "./EditTask";
import TaskEmpty from "./TaskEmpty";

function TaskList() {

    const { tasks, updateTask, deleteTask } = useContext(TaskContext);
    const [filter, setFilter] = useState<String>("all")
    const [task, setTask] = useState<Task | null>(null);

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (a.isDone && !b.isDone) return 1;
        if (!a.isDone && b.isDone) return -1;
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });

    return (
        <section className=" ">
            <div className="mt-6 w-full flex items-center justify-center gap-3">
                <button
                    onClick={() => setFilter("all")}
                    className={`py-1 px-6 border-2 border-indigo-400 rounded-full ${filter == "all" ? "bg-indigo-500 text-indigo-100" : ""}`}>All</button>
                <button
                    onClick={() => setFilter("in-progress")}
                    className={`py-1 px-6 border-2 border-indigo-400 rounded-full ${filter == "in-progress" ? "bg-indigo-500 text-indigo-100" : ""}`}>In Progress</button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`py-1 px-6 border-2 border-indigo-400 rounded-full ${filter == "completed" ? "bg-indigo-500 text-indigo-100" : ""}`}>Completed</button>
            </div>

            {sortedTasks.length === 0 && <TaskEmpty/>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">

                {
                    sortedTasks
                        .filter((task: Task) => {
                            return (
                                filter === "in-progress" ? !task.isDone :
                                    filter === "completed" ? task.isDone :
                                        true
                            )
                        })
                        .map((task: Task) => {
                            return <div className={`group p-4 rounded-lg ${task.isPinned ? 'bg-indigo-900' : 'bg-transparent border-2 border-indigo-900'} ${task.isDone ? 'line-through text-gray-500 ' : ''}`}>
                                <h3 className="font-semibold text-lg">{task.name} </h3>
                                <div className="text-xs mt-2">{task.dateTime !== "" && formatDateTime(task.dateTime)} </div>
                                <div className="flex gap-1 mt-3 opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        onClick={() => updateTask({ ...task, isDone: !task.isDone })}
                                        className={`hover:bg-indigo-800 rounded-full grid place-items-center h-8 w-8 cursor-pointer transition-colors duration-300`}>
                                        {
                                            task.isDone ? (
                                                <FaCheckCircle
                                                    className="text-green-600" size={15} />
                                            ) :
                                                <FaCircle
                                                    className="text-transparent rounded-full border-2 border-green-600" size={15} />
                                        }

                                    </div>
                                    <div
                                        onClick={() => setTask(task)}
                                        className="hover:bg-indigo-800 rounded-full grid place-items-center h-8 w-8 cursor-pointer transition-colors duration-300">
                                        <FaPencilAlt
                                            className="text-blue-600 " size={15} />
                                    </div>
                                    <div
                                        onClick={() => updateTask({ ...task, isPinned: !task.isPinned })}
                                        className="hover:bg-indigo-800 rounded-full grid place-items-center h-8 w-8 cursor-pointer transition-colors duration-300 relative">
                                        <FaThumbtack
                                            className="text-yellow-600" size={15} />
                                    </div>
                                    <div
                                        onClick={() => deleteTask(task.id)} 
                                        className="hover:bg-indigo-800 rounded-full grid place-items-center h-8 w-8 cursor-pointer transition-colors duration-300">
                                        <FaTrashAlt
                                            className="text-red-600" size={15} />
                                    </div>
                                </div>
                            </div>
                        })
                }


            </div >

            {task && <EditTask task={task} setTask={setTask} />}

        </section >
    )

}

export default TaskList;

function formatDateTime(dateTimeString: String) {
    const dateTime = new Date(dateTimeString);
    const now = new Date();

    let formattedDate;
    if (isToday(dateTime)) {
        formattedDate = "Today";
    } else if (isTomorrow(dateTime)) {
        formattedDate =  "Tomorrow";
    } else if (dateTime < now) {
        formattedDate =  `${formatDistanceToNow(dateTime)} ago`;
    } else {
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        formattedDate =  `${dateTime.toLocaleDateString()}, ${formattedTime}`;
    }

    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    if (formattedDate.includes("Today")) {
        return <span className="text-orange-300 flex items-center gap-2"><FaHistory />{`${formattedDate}, ${formattedTime}`}</span>;
    }else if (formattedDate.includes("ago")) {
        return <span className="text-red-500 flex items-center gap-2"><FaHistory />{`${formattedDate}, ${formattedTime}`}</span>;
    }

    return <span>{`${formattedDate}, ${formattedTime}`}</span>;
}

