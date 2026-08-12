import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import {
  FacilitiesModel,
} from "@/lib/models/Facilities";

// =========================================================
// RUNTIME
// =========================================================

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
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

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
// Get Facilities Section
// =========================================================

export async function GET(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FIND SECTION
    // =====================================================

    const facilities =
      await FacilitiesModel
        .findOne()
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!facilities) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Facilities section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(
              origin
            ),
        }
      );
    }

    // =====================================================
    // SORT FACILITIES
    // =====================================================

    const sortedFacilities =
      [
        ...facilities.facilities,
      ].sort(
        (a, b) =>
          a.order - b.order
      );

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        data: {
          ...facilities,

          facilities:
            sortedFacilities,
        },
      },
      {
        status: 200,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "GET FACILITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Facilities section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  }
}

// =========================================================
// POST
// Create Facilities Section
// =========================================================

export async function POST(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // CHECK EXISTING
    // =====================================================

    const existingFacilities =
      await FacilitiesModel.findOne();

    if (
      existingFacilities
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Facilities section already exists.",
        },
        {
          status: 409,
          headers:
            getCorsHeaders(
              origin
            ),
        }
      );
    }

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await request.json();

    // =====================================================
    // CREATE
    // =====================================================

    const facilities =
      await FacilitiesModel.create(
        body
      );

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Facilities section created successfully.",
        data:
          facilities,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "CREATE FACILITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Facilities section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  }
}

// =========================================================
// PUT
// Update Facilities Section
// =========================================================

export async function PUT(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

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
    // UPDATE
    // =====================================================

    const facilities =
      await FacilitiesModel.findOneAndUpdate(
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

    if (!facilities) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Facilities section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(
              origin
            ),
        }
      );
    }

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Facilities section updated successfully.",
        data:
          facilities,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "UPDATE FACILITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Facilities section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  }
}

// =========================================================
// DELETE
// Delete Facilities Section
// =========================================================

export async function DELETE(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // DELETE
    // =====================================================

    const facilities =
      await FacilitiesModel.findOneAndDelete(
        {}
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!facilities) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Facilities section not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(
              origin
            ),
        }
      );
    }

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Facilities section deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "DELETE FACILITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Facilities section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(
            origin
          ),
      }
    );
  }
}