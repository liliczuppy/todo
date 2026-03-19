import { motion } from "framer-motion";

export default function Quote() {
  const text =
    '"A jövő azzal kezdődik, amit ma teszel, nem azzal, amit holnap fogsz."';
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const child = {
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
      y: 15,
    },
  };

  return (
    <div className="quote-container">
      <div className="quote-brush-bg">
        <motion.h2
          className="font-handwriting text-2xl font-italic italic text-[#ba6c54] text-center flex flex-wrap justify-center gap-x-2"
          variants={container}
          initial="hidden"
          animate="visible"
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
