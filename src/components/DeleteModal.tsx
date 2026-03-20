import { useEffect, useRef } from "react";

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
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a4f46]/40 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="bg-[#fcfdfa] p-8 max-w-sm w-full relative transform rotate-1 shadow-2xl blob-focus border-2 border-[#e8e9e4]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#dfafaa]/60 rotate-2"></div>
        <h3
          id="delete-modal-title"
          className="font-handwriting text-3xl font-bold text-center text-[#ba6c54] mb-4"
        >
          Biztosan törlöd?
        </h3>
        <p
          id="delete-modal-description"
          className="text-center text-[#4a4f46] mb-4"
        >
          A törlés nem visszavonható.
        </p>
        <div className="flex gap-4 justify-center font-medium">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className="blob-btn px-6 py-2 bg-[#f1ede5] text-[#4a4f46] hover:bg-[#e8e4dc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4f46]/40"
          >
            Mégse
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="blob-btn px-6 py-2 bg-[#dfafaa] text-white hover:bg-[#d4a398] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba6c54]/50"
          >
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}
