import { motion as Motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

export default function PageTransition({ children }) {
  return (
    <Motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      // exit="exit"
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="h-full"
    >
      {children}
    </Motion.div>
  );
}
