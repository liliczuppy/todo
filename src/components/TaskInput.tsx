import { Plus } from 'lucide-react';

interface TaskInputProps {
  newTaskText: string;
  setNewTaskText: (value: string) => void;
  addTask: (e: React.FormEvent) => void;
}

export default function TaskInput({ newTaskText, setNewTaskText, addTask }: TaskInputProps) {
  return (
    <form onSubmit={addTask} className="flex gap-2 mb-4">
      <div className="flex-1 paper-line flex items-center px-1">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Írj ide egy új feladatot..."
          className="w-full bg-transparent outline-none py-2 text-base font-medium placeholder:text-[#a9b0a4] placeholder:italic placeholder:font-normal"
        />
      </div>
      <button 
        type="submit"
        disabled={!newTaskText.trim()}
        className="blob-btn bg-[#909d89] text-white px-4 py-2 hover:bg-[#7a8873] disabled:opacity-50 transition-colors flex items-center justify-center shadow-sm"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}