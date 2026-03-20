import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: any[];
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
    <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {visibleTasks.map((task, index) => (
        <TaskItem
          key={task.id}
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
      ))}

      {/* Extra üres vonalak */}
      {Array.from({ length: Math.max(0, 7 - visibleTasks.length) }).map(
        (_, i) => (
          <div
            key={`empty-${i}`}
            className="h-[46px] paper-line flex items-center px-1 opacity-30"
          >
            <div className="w-4 h-4 rounded-full border-2 border-[#d8d3c9] ml-0.5"></div>
          </div>
        ),
      )}
    </div>
  );
}

export default TaskList;
