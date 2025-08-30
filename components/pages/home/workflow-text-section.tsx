import React from "react";
import { H4 } from "@/components/ui/typography";

interface WorkflowTextSectionProps {
  heading: string;
  subtitle: string;
  index: number;
  isActive: boolean;
  hasAnyHover: boolean;
  onHover: () => void;
}

export function WorkflowTextSection({
  heading,
  subtitle,
  index,
  isActive,
  hasAnyHover,
  onHover,
}: WorkflowTextSectionProps) {
  // When hasAnyHover is false (no section hovered): all text is foreground, all borders are faint
  // When hasAnyHover is true and isActive is true: this section is foreground with primary border
  // When hasAnyHover is true and isActive is false: this section is muted-foreground with faint border

  return (
    <div
      className={`transition-all duration-300 cursor-pointer ${
        hasAnyHover && !isActive ? "text-white/20" : "text-foreground"
      }`}
      onMouseEnter={onHover}
    >
      <H4
        className={`${
          hasAnyHover && !isActive ? "text-white/30" : "text-foreground"
        }`}
      >
        {heading}
      </H4>
      <p
        className={`text-lg leading-relaxed transition-colors text-left duration-300 pt-3 ${
          hasAnyHover && !isActive ? "text-white/20" : "text-foreground"
        }`}
      >
        {subtitle}
      </p>
      <div
        className={`w-full h-px mt-6 transition-colors duration-300 ${
          isActive ? "bg-[var(--primary)]" : "bg-white/20"
        }`}
      />
    </div>
  );
}
