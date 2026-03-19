interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a4f46]/40 backdrop-blur-sm">
      <div className="bg-[#fcfdfa] p-8 max-w-sm w-full relative transform rotate-1 shadow-2xl blob-focus border-2 border-[#e8e9e4]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#dfafaa]/60 rotate-2"></div>
        <h3 className="font-handwriting text-3xl font-bold text-center text-[#ba6c54] mb-4">
          Biztosan törlöd?
        </h3>
        <div className="flex gap-4 justify-center font-medium">
          <button
            onClick={onClose}
            className="blob-btn px-6 py-2 bg-[#f1ede5] text-[#4a4f46] hover:bg-[#e8e4dc] transition-colors"
          >
            Mégse
          </button>
          <button
            onClick={onConfirm}
            className="blob-btn px-6 py-2 bg-[#dfafaa] text-white hover:bg-[#d4a398] transition-colors shadow-sm"
          >
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}
