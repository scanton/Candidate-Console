"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export function MotionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
