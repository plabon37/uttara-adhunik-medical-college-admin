import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const heroes = await HeroModel.find().sort({
      slideNumber: 1,
    });

    const response = NextResponse.json(heroes, {
      status: 200,
    });

    response.headers.set(
      "Access-Control-Allow-Origin",
      "*"
    );

    return response;
  } catch (error) {
    console.error("GET Hero Error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch hero data",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDB();

    await HeroModel.create(data);

    return NextResponse.json(
      {
        message: "Hero Created Successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Hero Error:", error);

    return NextResponse.json(
      {
        message: "Failed to create hero",
      },
      {
        status: 500,
      }
    );
  }
}