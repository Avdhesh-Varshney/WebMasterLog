import { useContext, useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Task from "../Types/Task";
import TaskContext from "../contexts/TaskContext";

function AddTask() {

    const [taskName, setTaskName] = useState('');
    const [taskDateTime, setTaskDateTime] = useState('');
    const [modal, setModal] = useState(false);
    const { addTask,  } = useContext(TaskContext);

    const add = () => {
        if (taskName && taskDateTime) {
            const newTask: Task = {
                id: uuidv4(),
                name: taskName,
                dateTime: taskDateTime,
                isPinned: false,
                isDone: false,
            };
            console.log(newTask)
            addTask(newTask)
            setTaskName('');
            setTaskDateTime('');
            setModal(false)
        } else {
            alert("Task name and date required!")
        }
    }

    return (
        <>

            {
                modal && (
                    <div className="p-2 fixed w-full h-screen grid place-items-center top-0 left-0 bg-rgba z-10">
                        <div className="bg-indigo-900 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                            <h2 className="text-indigo-200 font-manrope text-4xl font-semibold leading-10 mb-11">New Task</h2>
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
                                    onClick={() => setModal(false)}
                                >Cancel</button>
                                <button
                                    onClick={add}
                                    className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-700 bg-indigo-600 shadow-sm">Add</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <button
                className="fixed bottom-8 right-8 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 transition duration-300 w-14 h-14 grid place-items-center"
                onClick={() => setModal(true)}
            >
                <FaPlus size={25} />
            </button>
        </>

    )
}

export default AddTask;