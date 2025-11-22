import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssessmentStep } from "../types";

type StepIndicatorProps = {
  currentStep: AssessmentStep;
};

const steps: { id: AssessmentStep; label: string }[] = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'goals', label: 'Goals' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        />
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "absolute top-10 w-32 text-center text-xs font-medium transition-colors duration-300",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
