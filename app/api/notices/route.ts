import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";

// ==========================
// GET ALL NOTICE
// ==========================

export async function GET() {
  try {
    await connectToDB();

    const notices = await NoticeModel.find().sort({
      order: 1,
      createdAt: -1,
    });

    const response = NextResponse.json({
      success: true,
      data: notices,
    });

    response.headers.set(
      "Access-Control-Allow-Origin",
      "*"
    );

    return response;
  } catch (error) {
    console.error("GET NOTICE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notice data.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// CREATE NOTICE
// ==========================

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();

    const notice = await NoticeModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Notice created successfully.",
        data: notice,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE NOTICE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create notice.",
      },
      {
        status: 500,
      }
    );
  }
}