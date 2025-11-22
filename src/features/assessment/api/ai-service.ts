import type { AssessmentData, AiInsight } from "../types";
import { analyzeProfile as mockAnalyze } from "./mock-ai";
import { generateGeminiInsight } from "./gemini-service";

export const analyzeProfile = async (data: AssessmentData): Promise<AiInsight> => {
  const useRealAi = import.meta.env.VITE_USE_REAL_AI === 'true';
  
  if (useRealAi) {
    try {
      console.log("Calling Gemini AI...");
      return await generateGeminiInsight(data);
    } catch (error) {
      console.warn("Gemini AI failed, falling back to mock data.", error);
      // Fallback to mock if AI fails (e.g. quota exceeded or no key)
      return mockAnalyze(data);
    }
  }
  
  console.log("Using Mock AI...");
  return mockAnalyze(data);
};
