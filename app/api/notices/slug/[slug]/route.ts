import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";

// ==========================
// GET PUBLISHED NOTICE BY SLUG
// ==========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();

    const { slug } = await params;

    const notice = await NoticeModel.findOne({
      slug,
      isPublished: true,
    });

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found.",
        },
        {
          status: 404,
        }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        data: notice,
      },
      {
        status: 200,
      }
    );

    response.headers.set(
      "Access-Control-Allow-Origin",
      "*"
    );

    return response;
  } catch (error) {
    console.error("GET NOTICE BY SLUG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notice details.",
      },
      {
        status: 500,
      }
    );
  }
}