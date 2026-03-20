import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function Quote() {
  const text =
    '"A jövő azzal kezdődik, amit ma teszel, nem azzal, amit holnap fogsz."';
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <div className="w-full py-1 lg:py-2 overflow-hidden flex justify-center items-center">
      <div className="quote-brush-bg">
        <motion.h2
          className="font-handwriting text-xl sm:text-2xl md:text-3xl italic text-[#ba6c54] text-center flex flex-wrap justify-center gap-x-1.5 md:gap-x-2 leading-snug"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {words.map((word, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </div>
  );
}
