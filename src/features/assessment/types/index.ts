export type Skill = {
  name: string;
  level: number; // 1-5
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

export type LearningStyle = 'visual' | 'auditory' | 'reading' | 'kinesthetic';

export type AssessmentData = {
  fullName: string;
  currentRole: string;
  targetRole: string;
  skills: Skill[];
  experience: Experience[];
  interests: string[];
  learningStyle: LearningStyle;
  availability: string; // e.g., "10 hours/week"
};

export type AiInsight = {
  competencyGap: string[];
  recommendedPath: string;
  estimatedTime: string;
  careerOutlook: string;
  strengths: string[];
  weaknesses: string[];
  recommendedCourses: { title: string; provider: string; duration: string }[];
};

export type AssessmentStep = 'basic-info' | 'skills' | 'experience' | 'goals' | 'results';

export type AssessmentContextType = {
  currentStep: AssessmentStep;
  data: AssessmentData;
  insights: AiInsight | null;
  isLoading: boolean;
  setCurrentStep: (step: AssessmentStep) => void;
  updateData: (data: Partial<AssessmentData>) => void;
  submitAssessment: () => Promise<void>;
  resetAssessment: () => void;
};
