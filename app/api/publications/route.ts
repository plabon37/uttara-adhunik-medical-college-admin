import { NextRequest, NextResponse } from "next/server";
import {connectToDB} from "@/lib/connectToDB";
import Publication from "@/lib/models/Publication";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");

    const query: Record<string, unknown> = {
      isPublished: true,
    };

    if (type && type !== "All") {
      query.type = type;
    }

    const publications = await Publication.find(query)
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Publications fetched successfully",
      data: publications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publications",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const publication = await Publication.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Publication created successfully",
        data: publication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create publication",
      },
      { status: 500 }
    );
  }
}