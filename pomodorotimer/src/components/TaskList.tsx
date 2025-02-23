
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, CheckCircle, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          title: newTaskTitle,
          completed: false,
          pomodoros: 0,
        },
      ]);
      setNewTaskTitle("");
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-medium">Tasks</h2>
        <button className="text-white/60 hover:text-white">•••</button>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => document.getElementById("taskInput")?.focus()}
          className="border-2 border-dashed border-white/20 rounded-lg p-6 cursor-pointer hover:border-white/30 transition-colors"
        >
          <form onSubmit={addTask} className="flex items-center gap-3">
            <Plus className="text-white/60" />
            <input
              id="taskInput"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add Task"
              className="bg-transparent text-white placeholder:text-white/60 flex-1 outline-none"
            />
          </form>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/10 rounded-lg p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-white/60 hover:text-white"
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span
                className={`text-white ${
                  task.completed ? "line-through opacity-60" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className="text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
