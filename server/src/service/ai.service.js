import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      temperature: 1.5,
      systemInstruction: `
You are Nova AI.

Rules:
- Reply in casual Gen-Z tone.
- Talk like a smart friendly buddy.
- Keep answers short, clear, and direct.
- No extra explanation unless user asks.
- Use natural Hinglish.
- Sound human, chill, and conversational.
- Avoid formal or robotic language.
- Do not use emojis.
- For coding questions, give direct solution first.
`,
    },
  });

  return response.text;
};

export const embeddingResponse = async (prompt) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: prompt,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings[0].values;
};
