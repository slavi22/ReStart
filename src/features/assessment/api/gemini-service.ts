import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AssessmentData, AiInsight } from "../types";

// Initialize Gemini API
// Note: In a real production app, you should proxy this through your backend
// to avoid exposing your API key in the client bundle.
// For this hackathon/demo, we'll use the environment variable directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateGeminiInsight = async (data: AssessmentData): Promise<{ en: AiInsight, bg: AiInsight }> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert career counselor and technical recruiter. Analyze the following user profile and provide a structured career roadmap.
    
    User Profile:
    ${JSON.stringify(data, null, 2)}

    CONTEXT:
    The user might be a complete beginner or a career switcher (e.g., a construction worker, retail associate) looking to break into tech.
    If they have no technical skills, focus on transferable soft skills (leadership, time management, etc.) and recommend foundational courses.
    Be encouraging and realistic.
    
    IMPORTANT: You must provide the response in TWO languages: English (en) and Bulgarian (bg).

    Based on this profile, generate a JSON response with the following structure:
    {
      "en": {
        "competencyGap": ["string", "string"], // List of 3-5 specific skills missing for the target role.
        "recommendedPath": "string", // A specific job title or specialization path
        "estimatedTime": "string", // e.g. "3-6 months"
        "careerOutlook": "string", // A detailed paragraph (3-5 sentences) analyzing the current market demand, future growth projections, and potential salary range for this role. It should be informative and provide context, not just a short phrase.
        "strengths": ["string", "string"], // List of 3 user's current strengths.
        "weaknesses": ["string", "string"], // List of 2-3 areas for improvement
        "learningPath": [
          {
            "topic": "string", // The main topic or skill gap being addressed
            "articleContent": "string", // A VERY LONG, comprehensive, in-depth educational article (minimum 1000 words). It MUST be detailed. It should provide a solid introduction to the topic, explain key concepts, why it is critical for the user's target role, and how they can start learning it. Include practical examples, code snippets (if technical), and a 'Key Takeaways' section. Use Markdown formatting, including bold text, lists, and code blocks where relevant. It should be engaging, well-structured, and informative, like a high-quality Medium article. Do not be brief.
            "recommendedCourse": { "title": "string", "provider": "Udemy", "duration": "string", "url": "string" } // A specific recommended Udemy course for this topic. IMPORTANT: Provide a REAL, VALID URL for a specific course. Do not use search URLs. If you are not 100% sure of the URL, find the most popular course for this topic on Udemy and use its likely URL structure or a very generic topic URL that is guaranteed to exist.
          }
        ]
      },
      "bg": {
        // Same structure as above, but all text content MUST be in Bulgarian.
        "competencyGap": ["string", "string"],
        "recommendedPath": "string",
        "estimatedTime": "string",
        "careerOutlook": "string",
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "learningPath": [
          {
            "topic": "string",
            "articleContent": "string", // Bulgarian translation/adaptation of the article.
            "recommendedCourse": { "title": "string", "provider": "Udemy", "duration": "string", "url": "string" } // Use the same valid URL as the English version.
          }
        ]
      }
    }

    IMPORTANT: Return ONLY the raw JSON. Do not include markdown formatting like \`\`\`json.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting if the model ignores the instruction
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText) as { en: AiInsight, bg: AiInsight };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate insights from AI");
  }
};
