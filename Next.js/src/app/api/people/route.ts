// app/api/people/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  console.info("NextAPI - Get People");
  try {
    const client = await clientPromise;
    const db = client.db("sandbox");

    const people = await db.collection("people").find({}).toArray();

    // Convert `_id` to string for each person
    const peopleWithStringIds = people.map((person) => ({
      ...person,
      _id: person._id.toString(),
    }));

    const response = NextResponse.json(peopleWithStringIds);

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

export async function POST(request: Request) {
  const newPerson = await request.json();
  const response = NextResponse.json({
    message: "Person added",
    person: newPerson,
  });

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:4200");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

// Optionally handle OPTIONS requests for preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });

  // Add CORS headers to OPTIONS response
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:4200");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
