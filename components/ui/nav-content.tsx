"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavContentProps {
  children: React.ReactNode;
  className?: string;
}

export function NavContent({ children, className }: NavContentProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, 8]); // Downward movement

  return (
    <motion.div
      style={{ y }}
      className={cn(
        "absolute inset-0 hidden lg:flex xl:hidden 2xl:flex items-center justify-center",
        className,
      )}
    >
      {children}
    </motion.div>
  );
} 