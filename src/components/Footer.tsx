import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 pt-6 border-t border-[#ba6c54] flex items-center justify-center gap-2 opacity-70">
      <div className="flex items-center gap-2 text-[#4a4f46]">
        <span>Készítette: </span>
      </div>
      <a
        href="https://github.com/liliczuppy"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm hover:text-[#ba6c54] transition-colors"
      >
        <Github size={16} />
        <span>Czuppon-Horváth Lili</span>
      </a>
    </footer>
  );
}
