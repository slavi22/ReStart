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
    
    LOGIC RULES FOR RECOMMENDATIONS:
    1. IF the user has NO technical background (e.g. Cashier, Driver, Waiter) and NO coding skills:
       - Do NOT recommend advanced roles like "DevOps Engineer", "Cloud Architect", or "Senior Developer".
       - Do NOT recommend advanced topics like Kubernetes, Microservices, or System Design immediately.
       - RECOMMEND entry-level gateways: "IT Support Specialist", "Manual QA Tester", "Junior Data Analyst", or "Junior Web Developer".
       - Start with FOUNDATIONAL topics: "Computer Basics", "Intro to Web (HTML/CSS)", "Excel/Data Basics", or "Intro to Python".
       - Set realistic timelines: "6-12 Months" for a complete career switch.
    
    2. IF the user has some technical background:
       - You can recommend more intermediate roles.
    
    3. Be encouraging but REALISTIC. A cashier cannot become a Cloud Architect in 3 months.

    IMPORTANT: You must provide the response in TWO languages: English (en) and Bulgarian (bg).

    Based on this profile, generate a JSON response with the following structure.
    
    CRITICAL INSTRUCTIONS:
    1. Replace all placeholder values (like "string") with ACTUAL, SPECIFIC content based on the user's profile.
    2. Do NOT return the example strings.
    3. Ensure the "articleContent" is detailed and educational, not just a summary.
    4. Ensure the JSON is valid and strictly follows the structure below.

    {
      "en": {
        "competencyGap": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"], // List of 3-5 specific skills missing for the target role.
        "recommendedPath": "Target Job Title", // A specific job title or specialization path
        "estimatedTime": "3-6 Months", // e.g. "3-6 months"
        "careerOutlook": "Detailed market analysis...", // A detailed paragraph (3-5 sentences) analyzing the current market demand, future growth projections, and potential salary range for this role.
        "strengths": ["Strength 1", "Strength 2", "Strength 3"], // List of 3 user's current strengths.
        "weaknesses": ["Weakness 1", "Weakness 2"], // List of 2-3 areas for improvement
        "learningPath": [
          {
            "topic": "Main Topic Name", // The main topic or skill gap being addressed
            "articleContent": "Full Article Content...", // A comprehensive, in-depth educational article (approx. 600-800 words). It MUST be detailed. It should provide a solid introduction to the topic, explain key concepts, why it is critical for the user's target role, and how they can start learning it. Include practical examples, code snippets (if technical), and a 'Key Takeaways' section. IMPORTANT: Do NOT use HTML tags. Use standard Markdown only. Use triple backticks (\`\`\`) for code blocks and specify the language (e.g. \`\`\`javascript). Do not use single backticks for multi-line code. Use bold text, lists, and headers where relevant. It should be engaging, well-structured, and informative.",
            "recommendedCourses": [
              { 
                "title": "Course Title", 
                "provider": "Provider Name", // e.g. "Udemy", "Coursera", "edX", "YouTube", "FreeCodeCamp", "Pluralsight"
                "duration": "Duration", 
                "url": "https://valid-url.com", // A REAL, VALID URL. Do NOT use Google Search URLs. If you are not 100% sure of a specific course URL, link to the provider's topic page (e.g. 'https://www.udemy.com/topic/react/') or the main documentation page (e.g. 'https://react.dev/'). Prioritize free, high-quality resources like freeCodeCamp, MDN, or official documentation where the URL is stable.
                "isPaid": true // boolean
              }
            ]
          }
        ]
      },
      "bg": {
        // Same structure as above, but all text content MUST be in Bulgarian.
        "competencyGap": ["Умение 1", "Умение 2"],
        "recommendedPath": "Целева позиция",
        "estimatedTime": "Време за изпълнение",
        "careerOutlook": "Детален анализ на пазара...",
        "strengths": ["Сила 1", "Сила 2"],
        "weaknesses": ["Слабост 1", "Слабост 2"],
        "learningPath": [
          {
            "topic": "Тема",
            "articleContent": "Пълно съдържание на статията...", // Bulgarian translation/adaptation of the article.
            "recommendedCourses": [
              { 
                "title": "Име на курса", 
                "provider": "Доставчик", 
                "duration": "Продължителност", 
                "url": "https://valid-url.com",
                "isPaid": true
              }
            ]
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
