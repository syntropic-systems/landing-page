"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CyclingTypewriterProps {
  staticText: string;
  cyclingPhrases: string[];
  className?: string;
  highlightClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function CyclingTypewriter({
  staticText,
  cyclingPhrases,
  className,
  highlightClassName = "text-primary",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: CyclingTypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const currentPhrase = cyclingPhrases[currentPhraseIndex];
    
    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPhrase.length) {
        const typingTimer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typingTimer);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        const deletingTimer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deletingTimer);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
      }
    }
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, cyclingPhrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {staticText}{" "}
      <span className={cn(highlightClassName)}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
}