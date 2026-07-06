'use client';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerChildren, StaggerItem } from "@/components/animations";

interface WorkflowStep {
  title: string;
}

interface WorkflowStepCardsProps {
  steps: WorkflowStep[];
}

export function WorkflowStepCards({ steps }: WorkflowStepCardsProps) {
  const scrollToStep = (stepTitle: string) => {
    const element = document.querySelector(`[data-step-id="${stepTitle}"]`);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offset = 100; // Offset from top
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <StaggerChildren className="grid gap-4 md:grid-cols-3" stagger={0.1}>
      {steps.map((step) => (
        <StaggerItem key={step.title}>
          <Card
            className="bg-gradient-to-br from-accent/40 to-card text-center border-none shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => scrollToStep(step.title)}
          >
            <CardHeader className="p-0">
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </CardHeader>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

