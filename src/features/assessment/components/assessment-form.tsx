import { useAssessment } from "../context/assessment-context";
import { StepIndicator } from "./step-indicator";
import { BasicInfoStep } from "./steps/basic-info-step";
import { SkillsStep } from "./steps/skills-step";
import { ExperienceStep } from "./steps/experience-step";
import { GoalsStep } from "./steps/goals-step";
import { AssessmentResults } from "./assessment-results";

export function AssessmentForm() {
  const { currentStep } = useAssessment();

  if (currentStep === 'results') {
    return <AssessmentResults />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Initial Skill Assessment</h1>
        <p className="text-muted-foreground">
          Let's analyze your profile to create a personalized career roadmap.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 'basic-info' && <BasicInfoStep />}
        {currentStep === 'skills' && <SkillsStep />}
        {currentStep === 'experience' && <ExperienceStep />}
        {currentStep === 'goals' && <GoalsStep />}
      </div>
    </div>
  );
}
