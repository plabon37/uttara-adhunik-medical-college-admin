import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { PublicationModel } from "@/lib/models/Publication";

// ==========================
// GET ALL PUBLICATION
// ==========================

export async function GET() {
  try {
    await connectToDB();

    const publications = await PublicationModel.find().sort({
      order: 1,
      createdAt: -1,
    });

    const response = NextResponse.json({
      success: true,
      data: publications,
    });

    response.headers.set(
      "Access-Control-Allow-Origin",
      "*"
    );

    return response;
  } catch (error) {
    console.error("GET PUBLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publication data.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// CREATE PUBLICATION
// ==========================

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();

    const publication = await PublicationModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Publication created successfully.",
        data: publication,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE PUBLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create publication.",
      },
      {
        status: 500,
      }
    );
  }
}