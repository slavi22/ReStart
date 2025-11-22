import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AssessmentData, AssessmentStep, AiInsight, AssessmentContextType } from '../types';
import { analyzeProfile } from '../api/ai-service';
import { useTranslation } from 'react-i18next';

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
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('basic-info');
  const [data, setData] = useState<AssessmentData>(initialData);
  const [allInsights, setAllInsights] = useState<{ en: AiInsight, bg: AiInsight } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();

  const insights = allInsights ? (i18n.language === 'bg' ? allInsights.bg : allInsights.en) : null;

  const updateData = (newData: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const submitAssessment = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeProfile(data);
      setAllInsights(result);
      setCurrentStep('results');
    } catch (error) {
      console.error("Failed to analyze profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAssessment = () => {
    setData(initialData);
    setAllInsights(null);
    setCurrentStep('basic-info');
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        data,
        insights,
        isLoading,
        setCurrentStep,
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
