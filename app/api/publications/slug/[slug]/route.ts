import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import { PublicationModel } from "@/lib/models/Publication";

// ==========================
// GET PUBLISHED PUBLICATION BY SLUG
// ==========================

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const { slug } = await params;

    const publication =
      await PublicationModel.findOne({
        slug,
        isPublished: true,
      }).lean();

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found.",
        },
        {
          status: 404,
        }
      );
    }

    const response =
      NextResponse.json(
        {
          success: true,
          data: publication,
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
    console.error(
      "GET PUBLICATION BY SLUG ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch publication details.",
      },
      {
        status: 500,
      }
    );
  }
}