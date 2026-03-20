import { Trash2, Edit2, GripVertical, Check } from "lucide-react";

interface TaskItemProps {
  task: any;
  index: number;
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

export default function TaskItem({
  task,
  index,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  toggleTask,
  requestDelete,
  handleDragStart,
  handleDrop,
}: TaskItemProps) {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, index)}
      // Itt kapja meg a finom zöld hátteret (bg-[#7a8873]/15) és a lekerekítést, ha kész
      className={`group flex items-center gap-3 py-2 px-2 transition-all duration-300 rounded-md ${
        task.isNew ? "task-enter" : ""
      } ${
        task.completed
          ? "bg-[#7a8873]/15 paper-line-completed"
          : "bg-transparent paper-line"
      }`}
    >
      {/* Checkbox (Animált és kitöltött zöld, ha kész) */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`flex-shrink-0 focus:outline-none w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          task.completed
            ? "border-[#7a8873] bg-[#7a8873] scale-110"
            : "border-[#909d89] bg-white hover:border-[#7a8873]"
        }`}
      >
        <Check
          size={12}
          strokeWidth={4}
          className={`text-white transition-all duration-300 ${
            task.completed ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </button>

      {/* Szöveg vagy Szerkesztő input */}
      <div className="flex-1 min-w-0 flex items-center">
        {editingId === task.id ? (
          <div className="flex-1 flex gap-2 w-full">
            <input
              type="text"
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => saveEdit(task.id)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
              className="w-full bg-[#f1ede5]/70 outline-none px-2 py-1 font-medium text-base rounded text-[#4a4f46]"
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                saveEdit(task.id);
              }}
              className="text-[#909d89] hover:text-[#7a8873]"
            >
              <Check size={20} />
            </button>
          </div>
        ) : (
          <span
            className={`text-base font-medium cursor-text tracking-wide pt-1 w-full break-words leading-relaxed transition-all duration-300 ${
              task.completed
                ? "text-[#8e9686] line-through decoration-[#8e9686]/50"
                : "text-[#4a4f46]"
            }`}
            onDoubleClick={() => startEditing(task)}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Akciók - Szerkesztés, Fogás, Törlés */}
      {editingId !== task.id && (
        <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => startEditing(task)}
            className="text-[#a9b0a4] hover:text-[#ba6c54] p-1"
            title="Szerkesztés"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="cursor-grab text-[#a9b0a4] hover:text-[#4a4f46] p-1 hidden sm:block"
            title="Áthelyezés"
          >
            <GripVertical size={16} />
          </button>
          <button
            onClick={() => requestDelete(task.id)}
            className="text-[#dfafaa] hover:text-[#ba6c54] p-1"
            title="Törlés"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
