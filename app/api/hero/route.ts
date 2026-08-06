import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";

// ==========================
// GET ALL HERO
// ==========================

export async function GET() {
  try {
    await connectToDB();

    const heroes = await HeroModel.find().sort({
      slideNumber: 1,
    });

    const response = NextResponse.json(heroes);

    response.headers.set(
      "Access-Control-Allow-Origin",
      "*"
    );

    return response;
  } catch (error) {
    console.error("GET HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hero data.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// CREATE HERO
// ==========================

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();

    const hero = await HeroModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Hero created successfully.",
        data: hero,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create hero.",
      },
      {
        status: 500,
      }
    );
  }
}