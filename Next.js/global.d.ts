// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  // Ensures this declaration is only applied in a Node.js environment
  const _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
