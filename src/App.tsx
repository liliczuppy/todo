import { useState, useEffect } from "react";

import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import DeleteModal from "./components/DeleteModal";
import Quote from "./components/Quote";
import Footer from "./components/Footer";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isNew?: boolean;
  isExiting?: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null as string | null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("bujo-tasks");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTasks(parsed.tasks || []);
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "bujo-tasks",
        JSON.stringify({
          tasks: tasks.filter((t) => !t.isExiting),
        }),
      );
    }
  }, [tasks, isLoaded]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
      isNew: true,
    };
    setTasks((prev) => {
      const activeTasks = prev.filter((t) => !t.completed);
      const completedTasks = prev.filter((t) => t.completed);

      return [...activeTasks, newTask, ...completedTasks];
    });
    setNewTaskText("");
    setTimeout(
      () =>
        setTasks((prev) =>
          prev.map((t) => (t.id === newTask.id ? { ...t, isNew: false } : t)),
        ),
      300,
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    setTimeout(() => {
      setTasks((prev) => {
        const taskIndex = prev.findIndex((t) => t.id === id);
        if (taskIndex === -1) return prev;
        const newTasks = [...prev];
        const task = newTasks.splice(taskIndex, 1)[0];
        task.completed ? newTasks.push(task) : newTasks.unshift(task);
        return newTasks;
      });
    }, 400);
  };

  const requestDelete = (id: string) =>
    setDeleteModal({ isOpen: true, taskId: id });

  const confirmDelete = () => {
    const id = deleteModal.taskId;
    setDeleteModal({ isOpen: false, taskId: null });
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)),
    );
    setTimeout(() => setTasks((prev) => prev.filter((t) => t.id !== id)), 300);
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t)),
    );
    setEditingId(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newTasks = [...tasks];
    const draggedTask = newTasks.splice(draggedIndex, 1)[0];
    newTasks.splice(index, 0, draggedTask);
    setTasks(newTasks);
    setDraggedIndex(null);
  };

  const totalTasks = tasks.filter((t) => !t.isExiting).length;
  const completedTasks = tasks.filter(
    (t) => t.completed && !t.isExiting,
  ).length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-start ">
      <div className="bg-[#fcfdfa] w-full max-w-3xl rounded-sm shadow-xl p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col space-y-0 relative z-10">
          <Header
            progress={progress}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
          />
          <Quote />

          <div className="space-y-6">
            <h2 className="font-handwriting text-3xl drop-shadow-sm text-[#4a4f46]">
              Feladatok
            </h2>

            <TaskInput
              newTaskText={newTaskText}
              setNewTaskText={setNewTaskText}
              addTask={addTask}
            />

            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              startEditing={startEditing}
              saveEdit={saveEdit}
              toggleTask={toggleTask}
              requestDelete={requestDelete}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          </div>
        </div>
        <Footer />
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
