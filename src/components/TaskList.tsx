import { Reorder, AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  editingId: string | null;
  editText: string;
  setEditText: (value: string) => void;
  startEditing: (task: any) => void;
  saveEdit: (id: string) => void;
  toggleTask: (id: string) => void;
  requestDelete: (id: string) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

function TaskList({
  tasks,
  setTasks,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  toggleTask,
  requestDelete,
  handleDragStart,
  handleDrop,
}: TaskListProps) {
  const visibleTasks = tasks.filter((t) => !t.isExiting);

  let leftCapacity = 6;
  if (visibleTasks.length > 12) {
    leftCapacity = Math.ceil(visibleTasks.length / 2);
  }

  // A feladatok szétválasztása a két független oszlophoz
  const leftTasks = visibleTasks.slice(0, leftCapacity);
  const rightTasks = visibleTasks.slice(leftCapacity);

  // Szükséges üres vonalak kiszámítása mindkét oszlopra
  const leftEmptyCount = Math.max(0, 6 - leftTasks.length);
  const rightEmptyCount = Math.max(0, 6 - rightTasks.length);

  return (
    <div className="flex-1 lg:overflow-y-auto pr-2 pb-4 lg:custom-scrollbar lg:min-h-0">
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={setTasks}
        className="flex flex-col lg:flex-row lg:gap-4 w-full"
      >
        {/* 1. oszlop (Bal) - Ezt tölti fel először */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <AnimatePresence initial={false}>
            {leftTasks.map((task, index) => (
              <Reorder.Item
                key={task.id}
                value={task}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundColor: task.completed
                    ? "rgba(240, 240, 240, 0.5)"
                    : "rgba(255, 255, 255, 1)",
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileDrag={{
                  scale: 1.02,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  layout: { duration: 0.4 },
                }}
                className="w-full"
              >
                <TaskItem
                  task={task}
                  index={index}
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
              </Reorder.Item>
            ))}
          </AnimatePresence>

          {/* Üres vonalak a bal oszlophoz */}
          {Array.from({ length: leftEmptyCount }).map((_, i) => (
            <motion.div
              layout
              key={`empty-left-${i}`}
              className="h-[46px] w-full paper-line flex items-center px-1 opacity-30"
            >
              <div className="w-4 h-4 rounded-full border-2 border-[#d8d3c9] ml-0.5"></div>
            </motion.div>
          ))}
        </div>

        {/* 2. oszlop (Jobb) */}
        <div className="flex-1 flex flex-col gap-1 min-w-0 mt-1 lg:mt-0">
          <AnimatePresence initial={false}>
            {rightTasks.map((task, index) => (
              <Reorder.Item
                key={task.id}
                value={task}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundColor: task.completed
                    ? "rgba(240, 240, 240, 0.5)"
                    : "rgba(255, 255, 255, 1)",
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileDrag={{
                  scale: 1.02,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  layout: { duration: 0.4 },
                }}
                className="w-full"
              >
                <TaskItem
                  task={task}
                  index={leftTasks.length + index}
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
              </Reorder.Item>
            ))}
          </AnimatePresence>

          {/* Üres vonalak, gépen 2 oszlop  */}
          {Array.from({ length: rightEmptyCount }).map((_, i) => (
            <motion.div
              layout
              key={`empty-right-${i}`}
              className="hidden lg:flex h-[46px] w-full paper-line items-center px-1 opacity-30"
            >
              <div className="w-4 h-4 rounded-full border-2 border-[#d8d3c9] ml-0.5"></div>
            </motion.div>
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}

export default TaskList;
