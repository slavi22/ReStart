import { AssessmentProvider } from "@/features/assessment/context/assessment-context";
import { AssessmentForm } from "@/features/assessment/components/assessment-form";

export default function AssessmentRoute() {
  return (
    <AssessmentProvider>
      <div className="min-h-screen bg-background">
        <AssessmentForm />
      </div>
    </AssessmentProvider>
  );
}
