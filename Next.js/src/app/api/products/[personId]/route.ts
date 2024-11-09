// app/api/people/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  context: { params: { personId: string } }
) {
  console.log("NextAPI - Get All Products for Person");

  const { personId } = await context.params;

  if (!personId) {
    return NextResponse.json(
      { error: "personId is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("sandbox");

    const products = await db
      .collection("products")
      .find({ personId })
      .toArray();
    const response = NextResponse.json(products);

    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:4200"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
