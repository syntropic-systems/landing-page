'use client';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((step) => (
        <Card 
          key={step.title} 
          className="bg-gradient-to-br from-accent/50 to-card text-center border-none shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => scrollToStep(step.title)}
        >
          <CardHeader className="p-0">
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

