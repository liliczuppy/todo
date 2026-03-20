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
    const newTask: Task = {
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
    <div className="min-h-screen lg:h-screen w-full px-2 sm:px-4 flex justify-center items-start lg:items-center lg:overflow-hidden">
      <div className="bg-[#fcfdfa] w-full max-w-3xl lg:max-w-6xl lg:w-[1200px] min-h-[95vh] lg:h-[95vh] my-4 lg:my-0 rounded-sm shadow-xl p-4 sm:p-6 lg:py-6 lg:px-10 relative flex flex-col lg:overflow-hidden transition-all duration-300">
        <div className="flex flex-col h-full relative z-10 lg:overflow-hidden">
          <div className="flex-shrink-0">
            <Header
              progress={progress}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
            />
            <div className="-mt-2 lg:-mt-6 mb-1 lg:mb-2">
              <Quote />
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:min-h-0 lg:overflow-hidden relative">
            {/* Cím és Input. Mobilon a képernyő tetejére tapad, háttere takarja az alatta görgő listát */}
            <div className="sticky top-0 z-50 bg-[#fcfdfa] pt-4 pb-3 -mt-4 -mx-4 px-4 sm:-mt-6 sm:pt-6 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mt-0 shadow-sm lg:shadow-none transition-all">
              <h2 className="font-handwriting text-2xl lg:text-3xl drop-shadow-sm text-[#4a4f46] mb-1 lg:mb-2 flex-shrink-0">
                Feladatok
              </h2>

              <div className="flex-shrink-0 mb-1 lg:mb-2">
                <TaskInput
                  newTaskText={newTaskText}
                  setNewTaskText={setNewTaskText}
                  addTask={addTask}
                />
              </div>
            </div>

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
        <div className="flex-shrink-0 mt-3 lg:mt-3 relative z-40 bg-[#fcfdfa]">
          <Footer />
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
