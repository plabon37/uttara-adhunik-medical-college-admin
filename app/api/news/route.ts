import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import News from "@/lib/models/News";

export const runtime = "nodejs";

// =========================================================
// ALLOWED ORIGINS
// =========================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.NEXT_PUBLIC_CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
]
  .filter(
    (value): value is string =>
      Boolean(value)
  )
  .map((value) =>
    value.replace(/\/+$/, "")
  );

// =========================================================
// GET ALLOWED ORIGIN
// =========================================================

function getAllowedOrigin(
  request: NextRequest
) {
  const origin =
    request.headers.get("origin");

  if (!origin) {
    return "";
  }

  const normalizedOrigin =
    origin.replace(/\/+$/, "");

  if (
    allowedOrigins.includes(
      normalizedOrigin
    )
  ) {
    return normalizedOrigin;
  }

  // -------------------------------------------------------
  // Development fallback
  // -------------------------------------------------------

  if (
    normalizedOrigin.startsWith(
      "http://localhost:"
    ) ||
    normalizedOrigin.startsWith(
      "http://127.0.0.1:"
    )
  ) {
    return normalizedOrigin;
  }

  return "";
}

// =========================================================
// CORS HEADERS
// =========================================================

function getCorsHeaders(
  request: NextRequest
) {
  const origin =
    getAllowedOrigin(request);

  const headers =
    new Headers();

  if (origin) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
    );

    headers.set(
      "Vary",
      "Origin"
    );
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  headers.set(
    "Access-Control-Allow-Credentials",
    "true"
  );

  return headers;
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS(
  request: NextRequest
) {
  return new NextResponse(
    null,
    {
      status: 204,
      headers:
        getCorsHeaders(request),
    }
  );
}

// =========================================================
// GET ALL NEWS
// GET /api/news
// =========================================================

export async function GET(
  request: NextRequest
) {
  const headers =
    getCorsHeaders(request);

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FETCH NEWS
    // =====================================================

    const news =
      await News.find({})
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: news,
      },
      {
        status: 200,
        headers,
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
        data: [],
      },
      {
        status: 500,
        headers,
      }
    );
  }
}

// =========================================================
// POST NEWS
// POST /api/news
// =========================================================

export async function POST(
  request: NextRequest
) {
  const headers =
    getCorsHeaders(request);

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await request.json();

    // =====================================================
    // CREATE NEWS
    // =====================================================

    const news =
      await News.create(body);

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "News created successfully.",
        data: news,
      },
      {
        status: 201,
        headers,
      }
    );
  } catch (error) {
    console.error(
      "CREATE NEWS ERROR:",
      error
    );

    // =====================================================
    // DUPLICATE KEY
    // =====================================================

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number })
        .code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A News item with this slug already exists.",
        },
        {
          status: 409,
          headers,
        }
      );
    }

    // =====================================================
    // NORMAL ERROR
    // =====================================================

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
        headers,
      }
    );
  }
}