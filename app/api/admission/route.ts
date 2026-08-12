import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import { AdmissionModel } from "@/lib/models/Admission";

export const runtime = "nodejs";

// =========================================================
// CORS
// =========================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.NEXT_PUBLIC_CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
].filter(
  (value): value is string =>
    Boolean(value)
);

// =========================================================
// CORS HEADERS
// =========================================================

function getCorsHeaders(
  origin: string | null
) {
  const headers =
    new Headers();

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
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
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  return new NextResponse(
    null,
    {
      status: 204,
      headers:
        getCorsHeaders(origin),
    }
  );
}

// =========================================================
// GET
// Get Admission Section
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
    // FETCH ADMISSION
    // =====================================================

    const admission =
      await AdmissionModel
        .findOne()
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!admission) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admission section not found.",
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
        data: admission,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET ADMISSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Admission section.",
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
// Create Admission Section
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
    // READ BODY
    // =====================================================

    const body =
      await req.json();

    // =====================================================
    // CHECK EXISTING
    // =====================================================

    const existingAdmission =
      await AdmissionModel.findOne();

    if (existingAdmission) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admission section already exists.",
          data: existingAdmission,
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

    const admission =
      await AdmissionModel.create(
        body
      );

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Admission section created successfully.",
        data: admission,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "CREATE ADMISSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Admission section.",
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
// Update Admission Section
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
    // READ BODY
    // =====================================================

    const body =
      await req.json();

    // =====================================================
    // UPDATE
    // =====================================================

    const admission =
      await AdmissionModel.findOneAndUpdate(
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

    if (!admission) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admission section not found.",
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
          "Admission section updated successfully.",
        data: admission,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE ADMISSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Admission section.",
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
// Delete Admission Section
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

    const admission =
      await AdmissionModel.findOneAndDelete(
        {}
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!admission) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admission section not found.",
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
          "Admission section deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "DELETE ADMISSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Admission section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
        }
    );
  }
}