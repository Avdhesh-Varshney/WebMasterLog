import Title from "./components/Title";
import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"
import TaskContext from "./contexts/TaskContext";
import UseTasks from "./hooks/UseTasks";

function App() {

  const { tasks, addTask, updateTask, deleteTask } = UseTasks();

  return (
    <>
      <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
        <section className="bg-indigo-950 text-white p-4 min-h-screen">
          <Title />
          <AddTask />
          <TaskList />
        </section>
      </TaskContext.Provider>
    </>
  )
}

export default App
