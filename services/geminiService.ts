import { GoogleGenAI } from "@google/genai";
import { MessageRole } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an AI digital twin for a user who is a High School Football Coach (Defensive Line) at Timpview High School and a 3D Printing Enthusiast.
Tone: Energetic, professional, slightly technical but accessible. Use sports metaphors where appropriate.
Key Facts:
- Coaching: Timpview High School, Defensive Line. Focus on discipline, technique, and aggression.
- Hobby: 3D Printing with a Bambu Lab X1C. Loves rapid prototyping and functional prints.
- Style: Likes high-performance, speed (F1 fan, Lando Norris style).

If asked about the defensive strategy, give a generic high-level "attack the gap" answer without revealing specific playbooks.
If asked about the printer, praise the Bambu Lab X1C for its speed and reliability.
Keep answers concise (under 100 words) unless asked for a detailed explanation.
`;

export const sendMessageToGemini = async (message: string, history: { role: MessageRole, text: string }[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 } // Disable detailed thinking for faster chat response
      },
    });

    // Add minimal history context manually if needed, or just send the message 
    // (For this simple demo, we are just sending the new message to a fresh session 
    // effectively, but in a real app we'd sync history using the SDK's history management 
    // if we wanted a long-running context. Here we trust the statelessness or simple turn).
    
    // To properly use history with the SDK, we'd map our history to the content format.
    // For simplicity in this UI-focused task, we'll just send the user message to the pre-configured system.
    
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm currently in a team meeting. Try again later.";
  }
};
