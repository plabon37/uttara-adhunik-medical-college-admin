import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";
import { DepartmentModel } from "@/lib/models/Department";

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

  return new NextResponse(null, {
    status: 204,
    headers:
      getCorsHeaders(origin),
  });
}

// =========================================================
// GET
// Get single Department
// =========================================================

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // CHECK OBJECT ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Department ID.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // FIND DEPARTMENT
    // =====================================================

    const department =
      await DepartmentModel.findById(
        id
      ).lean();

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: department,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET DEPARTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Department.",
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
// Update Department
// =========================================================

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // CHECK OBJECT ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Department ID.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    const body =
      await req.json();

    // =====================================================
    // CHECK DUPLICATE SLUG
    // =====================================================

    if (body.slug) {
      const existingDepartment =
        await DepartmentModel.findOne({
          slug: body.slug,
          _id: {
            $ne: id,
          },
        });

      if (existingDepartment) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A Department with this slug already exists.",
          },
          {
            status: 409,
            headers:
              getCorsHeaders(origin),
          }
        );
      }
    }

    // =====================================================
    // UPDATE DEPARTMENT
    // =====================================================

    const department =
      await DepartmentModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Department updated successfully.",
        data: department,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE DEPARTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Department.",
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
// Delete Department
// =========================================================

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // CHECK OBJECT ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Department ID.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // DELETE DEPARTMENT
    // =====================================================

    const department =
      await DepartmentModel.findByIdAndDelete(
        id
      );

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department not found.",
        },
        {
          status: 404,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Department deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "DELETE DEPARTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Department.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}