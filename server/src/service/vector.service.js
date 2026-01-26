import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.Pinecone_API_KEY });
const vectorIndex = pc.Index("ai-geminie");

export const createMemory = async ({ vector, messageID, metadata }) => {
  await vectorIndex.upsert([
    {
      id: messageID, 
      values: vector,      
      metadata: metadata || {},
    },
  ]);
};

export const queryMemory = async ({ queryVector, limit = 5, metadata }) => {
  const data = await vectorIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ?metadata: undefined,
    includeMetadata: true,
  });

  return data.matches || [];
};
