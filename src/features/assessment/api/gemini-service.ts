import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AssessmentData, AiInsight } from "../types";

// Initialize Gemini API
// Note: In a real production app, you should proxy this through your backend
// to avoid exposing your API key in the client bundle.
// For this hackathon/demo, we'll use the environment variable directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateGeminiInsight = async (data: AssessmentData): Promise<AiInsight> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert career counselor and technical recruiter. Analyze the following user profile and provide a structured career roadmap.
    
    User Profile:
    ${JSON.stringify(data, null, 2)}

    Based on this profile, generate a JSON response with the following structure:
    {
      "competencyGap": ["string", "string"], // List of 3-5 specific skills missing for the target role
      "recommendedPath": "string", // A specific job title or specialization path
      "estimatedTime": "string", // e.g. "3-6 months"
      "careerOutlook": "string", // A brief sentence about market demand
      "strengths": ["string", "string"], // List of 3 user's current strengths
      "weaknesses": ["string", "string"], // List of 2-3 areas for improvement
      "recommendedCourses": [
        { "title": "string", "provider": "string", "duration": "string" }
      ] // List of 3 recommended courses
    }

    IMPORTANT: Return ONLY the raw JSON. Do not include markdown formatting like \`\`\`json.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting if the model ignores the instruction
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText) as AiInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate insights from AI");
  }
};
