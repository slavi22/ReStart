import type { AssessmentData, AiInsight } from "../types";

export const analyzeProfile = async (data: AssessmentData): Promise<{ en: AiInsight, bg: AiInsight }> => {
  return new Promise((resolve) => {
    const enInsight: AiInsight = {
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
      learningPath: [
        {
          topic: "Advanced System Design",
          articleContent: "System design is a critical skill for senior roles. It involves defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. Mastering this will allow you to build scalable and reliable applications.",
          recommendedCourse: { title: "Advanced Microservices Patterns", provider: "Udemy", duration: "4 weeks", url: "https://www.udemy.com/course/microservices-architecture/" }
        },
        {
          topic: "Cloud Architecture",
          articleContent: "Cloud architecture refers to the various components in terms of databases, software capabilities, applications, etc., engineered to leverage the power of cloud resources to solve business problems. Cloud components include a frontend platform, back end platform, a cloud-based delivery, and a network.",
          recommendedCourse: { title: "Cloud Native Essentials", provider: "Udemy", duration: "3 weeks", url: "https://www.udemy.com/topic/cloud-computing/" }
        },
        {
          topic: "Kubernetes Orchestration",
          articleContent: "Kubernetes is an open-source container orchestration system for automating software deployment, scaling, and management. It is now the standard for deploying containerized applications in production.",
          recommendedCourse: { title: "Kubernetes for the Absolute Beginners", provider: "Udemy", duration: "2 weeks", url: "https://www.udemy.com/course/learn-kubernetes/" }
        }
      ]
    };

    const bgInsight: AiInsight = {
      ...enInsight,
      recommendedPath: `Старши ${data.targetRole || "Разработчик"} Акселератор`,
      estimatedTime: "3-6 Месеца",
      careerOutlook: "Високо търсене с 20% прогнозиран растеж",
      competencyGap: [
        "Разширен системен дизайн",
        "Модели на облачна архитектура",
        "Оркестрация с Kubernetes"
      ],
      strengths: [
        "Силна основа в текущата роля",
        "Ясна мотивация за кариера",
        "Разнообразен набор от умения"
      ],
      weaknesses: [
        "Липса на опит с мащабни разпределени системи",
        "Ограничен опит с cloud-native технологии"
      ],
      learningPath: enInsight.learningPath.map(item => ({
        ...item,
        topic: item.topic + " (BG)",
        articleContent: item.articleContent + " (Translated to Bulgarian)"
      }))
    };

    setTimeout(() => {
      resolve({ en: enInsight, bg: bgInsight });
    }, 2000); // Simulate 2s network delay
  });
};
