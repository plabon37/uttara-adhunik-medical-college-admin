import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Notice from "@/lib/models/Notice";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");

    const query: Record<string, unknown> = {
      isPublished: true,
    };

    if (category && category !== "All") {
      query.category = category;
    }

    const notices = await Notice.find(query)
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Notices fetched successfully",
        data: notices,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notices",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const notice = await Notice.create({
      ...body,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Notice created successfully",
        data: notice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create notice",
      },
      { status: 500 }
    );
  }
}