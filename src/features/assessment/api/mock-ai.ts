import type { AssessmentData, AiInsight } from "../types";

export const analyzeProfile = async (data: AssessmentData): Promise<AiInsight> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        competencyGap: [
          "Advanced System Design",
          "Cloud Architecture Patterns",
          "Kubernetes Orchestration"
        ],
        recommendedPath: `Senior ${data.targetRole || "Developer"} Accelerator`,
        estimatedTime: "3-6 Months",
        careerOutlook: "High demand with 20% projected growth",
        strengths: [
          "Strong foundation in current role",
          "Clear career motivation",
          "Diverse skill set"
        ],
        weaknesses: [
          "Lack of large-scale distributed systems experience",
          "Limited exposure to cloud-native technologies"
        ],
        recommendedCourses: [
          { title: "Advanced Microservices Patterns", provider: "ReStart Academy", duration: "4 weeks" },
          { title: "Cloud Native Essentials", provider: "TechLearn", duration: "3 weeks" },
          { title: "System Design Interview Prep", provider: "MockMaster", duration: "2 weeks" }
        ]
      });
    }, 2000); // Simulate 2s network delay
  });
};
