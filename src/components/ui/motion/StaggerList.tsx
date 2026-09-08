import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface StaggerListProps {
  children: ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export function StaggerList({ children, className = "" }: StaggerListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <motion.div ref={ref} variants={item} className={className}>
        {children}
      </motion.div>
    );
  }
);
StaggerItem.displayName = "StaggerItem";
