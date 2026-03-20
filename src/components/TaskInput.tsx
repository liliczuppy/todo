import { Plus } from "lucide-react";

interface TaskInputProps {
  newTaskText: string;
  setNewTaskText: (value: string) => void;
  addTask: (e: React.FormEvent) => void;
}

export default function TaskInput({
  newTaskText,
  setNewTaskText,
  addTask,
}: TaskInputProps) {
  return (
    <form onSubmit={addTask} className="flex gap-2 mb-4">
      <div className="flex-1 paper-line flex items-center px-1">
        <label htmlFor="new-task-input" className="sr-only">
          Új feladat
        </label>
        <input
          id="new-task-input"
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Írj ide egy új feladatot..."
          className="w-full bg-transparent py-2 text-base font-medium placeholder:text-[#a9b0a4] placeholder:italic placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#909d89]/60 rounded-sm"
        />
      </div>
      <button
        type="submit"
        aria-label="Feladat hozzáadása"
        disabled={!newTaskText.trim()}
        className="blob-btn bg-[#909d89] text-white px-4 py-2 hover:bg-[#7a8873] disabled:opacity-50 transition-colors flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a8873]/60"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}
