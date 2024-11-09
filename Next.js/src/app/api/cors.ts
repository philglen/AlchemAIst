// app/api/cors.ts
import Cors from "cors";
import { NextRequest, NextResponse } from "next/server";

// Initialize CORS middleware with your configuration
const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: "http://localhost:4200",
});

// Helper function to convert NextRequest headers to plain object
function headersToPlainObject(headers: Headers) {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

// Helper function to run middleware
export function runCorsMiddleware(req: NextRequest, res: NextResponse) {
  console.log("CORS running on Next");
  // Convert NextRequest to a compatible format for CorsRequest
  const corsRequest = {
    ...req,
    headers: headersToPlainObject(req.headers),
  };

  return new Promise((resolve, reject) => {
    cors(corsRequest as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
