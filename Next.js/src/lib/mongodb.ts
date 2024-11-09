// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri, options);
  (global as any)._mongoClientPromise = client.connect();
}

clientPromise = (global as any)._mongoClientPromise;
export default clientPromise;
