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

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={setTasks}
        className="space-y-1"
      >
        <AnimatePresence initial={false}>
          {visibleTasks.map((task, index) => (
            <Reorder.Item
              key={task.id}
              value={task}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: task.isCompleted
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
      </Reorder.Group>

      {/* Extra üres vonalak */}
      <div className="mt-1 space-y-1">
        {Array.from({ length: Math.max(0, 7 - visibleTasks.length) }).map(
          (_, i) => (
            <motion.div
              layout
              key={`empty-${i}`}
              className="h-[46px] paper-line flex items-center px-1 opacity-30"
            >
              <div className="w-4 h-4 rounded-full border-2 border-[#d8d3c9] ml-0.5"></div>
            </motion.div>
          ),
        )}
      </div>
    </div>
  );
}

export default TaskList;
