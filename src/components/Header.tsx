interface HeaderProps {
  progress: number;
  completedTasks: number;
  totalTasks: number;
}

export default function Header({
  progress,
  completedTasks,
  totalTasks,
}: HeaderProps) {
  const isFinished = progress === 100;

  return (
    <div className="md:col-span-5 space-y-0">
      {/* Cím */}
      <div className="flex justify-end w-full margin-bottom-0">
        <div className="blob-title inline-block px-8 py-3 transform -rotate-2 mb-2 shadow-sm">
          <h1 className="font-handwriting text-white text-5xl tracking-wide">
            To-do lista
          </h1>
        </div>
      </div>

      {/* Haladás / Progress */}
      <div className="pt-2">
        <h2 className="font-handwriting text-2xl text-[#ba6c54] bg-[#f1ede5] inline-block px-3 py-1 rounded-sm transform rotate-1 mb-4 shadow-sm">
          Haladás
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-full bg-[#f1ede5] h-6 rounded-sm overflow-hidden relative border border-[#e8e4dc] transition-all duration-500 ${isFinished ? "ring-2 ring-[#ba6c54]/30" : ""}`}
            >
              <div
                className={`h-full transition-all duration-700 ease-out ${isFinished ? "bg-[#ba6c54]" : "bg-[#dfafaa]"}`}
                style={{ width: `${progress}%` }}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center font-handwriting font-bold transition-all duration-500 ${
                  isFinished
                    ? "text-white text-lg animate-pulse drop-shadow-md"
                    : "text-black/70 text-sm"
                }`}
              >
                {isFinished ? "Kész!" : `${progress}%`}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-sm font-handwriting text-[#7a8174] pl-1">
              {completedTasks} / {totalTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
