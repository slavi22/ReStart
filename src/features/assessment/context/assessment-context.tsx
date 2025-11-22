import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AssessmentData, AssessmentStep, AiInsight, AssessmentContextType } from '../types';
import { analyzeProfile } from '../api/ai-service';

const initialData: AssessmentData = {
  fullName: '',
  currentRole: '',
  targetRole: '',
  skills: [],
  experience: [],
  interests: [],
  learningStyle: 'visual',
  availability: '',
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setStep] = useState<AssessmentStep>('basic-info');
  const [data, setData] = useState<AssessmentData>(initialData);
  const [insights, setInsights] = useState<AiInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (newData: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const submitAssessment = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeProfile(data);
      setInsights(result);
      setStep('results');
    } catch (error) {
      console.error("Failed to analyze profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAssessment = () => {
    setData(initialData);
    setInsights(null);
    setStep('basic-info');
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        data,
        insights,
        isLoading,
        setStep,
        updateData,
        submitAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
