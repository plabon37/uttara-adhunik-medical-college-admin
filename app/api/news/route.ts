import { NextResponse } from "next/server";

import {connectToDB} from "@/lib/connectToDB";

import News from "@/lib/models/News";

// =========================================================
// CORS
// =========================================================

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin":
      process.env.CLIENT_URL || "*",

    "Access-Control-Allow-Methods":
      "GET, POST, PUT, DELETE, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type",

    "Access-Control-Allow-Credentials":
      "true",
  };
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS() {
  return new Response(null, {
    status: 204,

    headers:
      getCorsHeaders(),
  });
}

// =========================================================
// GET ALL NEWS
// =========================================================

export async function GET() {
  try {
    await connectToDB();

    const news =
      await News.find({})
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      {
        success: true,

        data: news,
      },
      {
        status: 200,

        headers:
          getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "GET NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to fetch news.",
      },
      {
        status: 500,

        headers:
          getCorsHeaders(),
      }
    );
  }
}

// =========================================================
// POST NEWS
// =========================================================

export async function POST(
  request: Request
) {
  try {
    await connectToDB();

    const body =
      await request.json();

    const news =
      await News.create(
        body
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "News created successfully.",

        data: news,
      },
      {
        status: 201,

        headers:
          getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "CREATE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to create news.",
      },
      {
        status: 500,

        headers:
          getCorsHeaders(),
      }
    );
  }
}