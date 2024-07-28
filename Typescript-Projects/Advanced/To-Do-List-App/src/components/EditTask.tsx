import { useContext, useState } from "react";
import TaskContext from "../contexts/TaskContext";

function EditTask({ task, setTask }) {

    const [taskName, setTaskName] = useState(task.name || '');
    const [taskDateTime, setTaskDateTime] = useState(task.dateTime || '');
    const { updateTask } = useContext(TaskContext);

    const edit = () => {
        if (taskName && taskDateTime) {
            task.name = taskName;
            task.dateTime = taskDateTime;
            console.log(task)
            updateTask(task)
            setTaskName('');
            setTaskDateTime('');
            setTask(null)
        } else {
            alert("Task name and date required!")
        }
    }

    return (
        <>
            <div className="p-2 fixed w-full h-screen grid place-items-center top-0 left-0 bg-rgba z-10">
                <div className="bg-indigo-900 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                    <h2 className="text-indigo-200 font-manrope text-4xl font-semibold leading-10 mb-11">Edit Task</h2>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full h-12 text-white placeholder-gray-400  shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Task" />
                    <input
                        type="datetime-local"
                        value={taskDateTime}
                        onChange={(e) => setTaskDateTime(e.target.value)}
                        className="w-full h-12 text-white placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" />
                    <div className="flex gap-5">
                        <button
                            className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-gray-500 bg-gray-400 shadow-sm"
                            onClick={() => setTask(null)}
                        >Cancel</button>
                        <button
                            onClick={edit}
                            className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-700 bg-indigo-600 shadow-sm">Add</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EditTask;