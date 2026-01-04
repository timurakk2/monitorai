
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const API_KEY = process.env.API_KEY || '';

export const generateAIResponse = async (
  modelId: string,
  messages: Message[],
  systemInstruction?: string
) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Format messages for Gemini
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents as any,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to AI. Please check your credentials.";
  }
};
