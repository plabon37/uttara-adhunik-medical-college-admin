import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { StatisticsModel } from "@/lib/models/Statistics";

export const runtime = "nodejs";

// =========================================================
// ALLOWED ORIGINS
// =========================================================

const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL,
  process.env.CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
].filter(
  (origin): origin is string =>
    Boolean(origin)
);

// =========================================================
// CORS HEADERS
// =========================================================

function getCorsHeaders(
  origin: string | null
) {
  const headers = new Headers();

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
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

  headers.set(
    "Vary",
    "Origin"
  );

  return headers;
}

// =========================================================
// OPTIONS
// Handle CORS preflight request
// =========================================================

export async function OPTIONS(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers:
      getCorsHeaders(origin),
  });
}

// =========================================================
// GET
// Get Statistics section
// =========================================================

export async function GET(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FIND STATISTICS
    // =====================================================

    const statistics =
      await StatisticsModel.findOne()
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: statistics,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Statistics section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}

// =========================================================
// POST
// Create Statistics section
// =========================================================

export async function POST(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await req.json();

    // =====================================================
    // CHECK EXISTING STATISTICS
    // =====================================================

    const existingStatistics =
      await StatisticsModel.findOne();

    if (existingStatistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section already exists.",
        },
        {
          status: 409,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CREATE
    // =====================================================

    const statistics =
      await StatisticsModel.create(
        body
      );

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section created successfully.",
        data: statistics,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "CREATE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Statistics section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}

// =========================================================
// PUT
// Update Statistics section
// =========================================================

export async function PUT(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await req.json();

    // =====================================================
    // UPDATE
    // =====================================================

    const statistics =
      await StatisticsModel.findOneAndUpdate(
        {},
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section updated successfully.",
        data: statistics,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Statistics section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}

// =========================================================
// DELETE
// Delete Statistics section
// =========================================================

export async function DELETE(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // DELETE
    // =====================================================

    const statistics =
      await StatisticsModel.findOneAndDelete(
        {}
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "DELETE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Statistics section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}