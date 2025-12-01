import { GoogleGenAI, Type, Chat } from "@google/genai";
import { Article, QuizQuestion, SearchResult } from "../types";
import { INITIAL_ARTICLES } from '../constants';

// Initialize Gemini Client
// Note: We use process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-2.5-flash';

/**
 * Creates a chat session with context-aware system instructions.
 */
export const createChatSession = (role: string, language: string): Chat => {
  // Construct a lightweight knowledge base from the articles
  const knowledgeBase = INITIAL_ARTICLES.map(a => 
    `- Title: "${a.title}" (ID: ${a.id})\n  Summary: ${a.summary}\n  Audience: ${a.audience}`
  ).join('\n\n');

  const systemInstruction = `
    You are the AI Support Assistant for Vidacyberinsights, a global cybersecurity awareness app.
    
    Current User Context:
    - Role: ${role} (Adjust tone and complexity accordingly)
    - Language Preference: ${language} (Reply in this language)
    
    Your Knowledge Base (Available Articles):
    ${knowledgeBase}
    
    Guidelines:
    1. Answer questions primarily using the provided Knowledge Base.
    2. If a user asks about a topic covered in an article, provide a brief answer and explicitly recommend reading that article.
    3. Be helpful, concise, and friendly.
    4. Do not provide medical, legal, or financial advice.
    5. If the answer is not in the knowledge base, provide general best-practice cybersecurity advice but mention it is general knowledge.
    6. Format your responses with Markdown (bolding for key terms, bullet points for lists).
    7. CRITICAL: If you recommend specific articles from the knowledge base, append their IDs at the VERY END of your response in this exact format:
       RECOMMENDED: [id1, id2]
       Do not include this tag if you are not recommending specific articles.
  `;

  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: systemInstruction,
    }
  });
};

/**
 * Generates a multiple-choice quiz based on the article content.
 */
export const generateQuiz = async (articleContent: string): Promise<QuizQuestion | null> => {
  try {
    const prompt = `
      Create a single multiple-choice question based on the following text.
      The question should test comprehension of a key concept.
      Return the result strictly as a JSON object.
      
      Text: "${articleContent.substring(0, 2000)}"
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as QuizQuestion;
    }
    return null;
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return null;
  }
};

/**
 * Performs a semantic search/ranking of articles based on user query.
 */
export const searchArticles = async (query: string, articles: Article[]): Promise<string[]> => {
  try {
    const articleList = articles.map(a => ({ id: a.id, title: a.title, summary: a.summary, tags: a.tags }));
    
    const prompt = `
      You are a helpful librarian for a cybersecurity blog.
      User Query: "${query}"
      
      Available Articles:
      ${JSON.stringify(articleList)}
      
      Identify the articles that are most relevant to the user's query.
      Return a JSON object containing an array of article IDs ordered by relevance.
      If no articles are relevant, return an empty array.
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                relevantArticleIds: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.relevantArticleIds || [];
    }
    return [];
  } catch (error) {
    console.error("Search failed:", error);
    // Fallback: simple title match
    return articles
      .filter(a => a.title.toLowerCase().includes(query.toLowerCase()))
      .map(a => a.id);
  }
};

/**
 * Adapts content complexity (e.g., Explain like I'm 5 vs Professional)
 */
export const adaptContent = async (content: string, level: 'beginner' | 'advanced'): Promise<string> => {
    try {
        const prompt = level === 'beginner' 
            ? `Rewrite the following text to be simple, easy to understand, and suitable for a middle-school student or non-technical parent. Keep the formatting in Markdown.`
            : `Rewrite the following text to be professional, technical, and suitable for a CISO or IT manager. Use industry standard terminology. Keep the formatting in Markdown.`;

        const response = await ai.models.generateContent({
            model: modelName,
            contents: `${prompt}\n\nText:\n${content}`
        });

        return response.text || content;
    } catch (error) {
        console.error("Content adaptation failed", error);
        return content;
    }
}