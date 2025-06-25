
import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { GEMINI_MODEL_NAME, SYSTEM_INSTRUCTION } from '../constants';

class GeminiService {
  private ai: GoogleGenAI | null = null;

  private initializeAI(apiKey: string): GoogleGenAI {
    if (!this.ai) {
      if (!apiKey) {
        throw new Error("API_KEY is not provided. GeminiService cannot be initialized.");
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  public async startChatSession(apiKey: string): Promise<Chat> {
    const aiInstance = this.initializeAI(apiKey);
    const chat: Chat = aiInstance.chats.create({
      model: GEMINI_MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
       // history: [], // You can prime with initial history if needed
    });
    return chat;
  }

  public async sendMessageStream(
    chatSession: Chat,
    message: string
  ): Promise<AsyncIterable<string>> {
    if (!chatSession) {
      throw new Error("Chat session not initialized.");
    }

    const result = await chatSession.sendMessageStream({ message });
    
    // Transform the stream of GenerateContentResponse to a stream of strings (text parts)
    async function* textStream(): AsyncIterable<string> {
      for await (const chunk of result) {
        // Ensure chunk and chunk.text are defined
        if (chunk && typeof chunk.text === 'string') {
          yield chunk.text;
        } else if (chunk && chunk.text === undefined) {
           // If text is undefined but other parts might exist, log or handle
           // For now, we only care about text, so skip if undefined
           console.warn("Received chunk without text:", chunk);
        }
      }
    }
    return textStream();
  }

  // Fallback non-streaming version (can be used if streaming is not preferred for some reason)
  public async sendMessage(
    chatSession: Chat,
    message: string
  ): Promise<string> {
    if (!chatSession) {
      throw new Error("Chat session not initialized.");
    }
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text;
  }
}

export const geminiService = new GeminiService();
