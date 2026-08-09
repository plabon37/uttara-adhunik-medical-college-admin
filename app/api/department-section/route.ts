import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";

import { DepartmentSectionModel } from "@/lib/models/DepartmentSection";

export const runtime = "nodejs";

// =========================================================
// CORS
// =========================================================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

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
// Get Department Section
// =========================================================

export async function GET(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const section =
      await DepartmentSectionModel
        .findOne()
        .lean();

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department section not found.",
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
        data: section,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET DEPARTMENT SECTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Department section.",
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
// Create Department Section
// =========================================================

export async function POST(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    // =====================================================
    // READ BODY
    // =====================================================

    const body =
      await req.json();

    console.log(
      "CREATE DEPARTMENT SECTION BODY:",
      body
    );

    // =====================================================
    // CHECK EXISTING SECTION
    // =====================================================

    const existingSection =
      await DepartmentSectionModel.findOne();

    if (existingSection) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department section already exists.",
          data: existingSection,
        },
        {
          status: 409,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CLEAN DATA
    // =====================================================

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const searchPlaceholder =
      typeof body.searchPlaceholder === "string"
        ? body.searchPlaceholder.trim()
        : "";

    const imageOne =
      typeof body.imageOne === "string"
        ? body.imageOne.trim()
        : "";

    const imageTwo =
      typeof body.imageTwo === "string"
        ? body.imageTwo.trim()
        : "";

    const studentCount =
      typeof body.studentCount === "string"
        ? body.studentCount.trim()
        : "";

    const studentCountText =
      typeof body.studentCountText === "string"
        ? body.studentCountText.trim()
        : "";

    const popularSearches =
      Array.isArray(body.popularSearches)
        ? body.popularSearches
            .filter(
              (item: unknown) =>
                typeof item === "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(
              (item: string) =>
                item.length > 0
            )
        : [];

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : true;

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    const missingFields: string[] = [];

    if (!title) {
      missingFields.push("title");
    }

    if (!description) {
      missingFields.push("description");
    }

    if (!searchPlaceholder) {
      missingFields.push(
        "searchPlaceholder"
      );
    }

    if (!imageOne) {
      missingFields.push("imageOne");
    }

    if (!imageTwo) {
      missingFields.push("imageTwo");
    }

    if (!studentCount) {
      missingFields.push(
        "studentCount"
      );
    }

    if (!studentCountText) {
      missingFields.push(
        "studentCountText"
      );
    }

    // =====================================================
    // VALIDATION ERROR
    // =====================================================

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required fields.",
          missingFields,
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CREATE DOCUMENT
    // =====================================================

    const section =
      await DepartmentSectionModel.create({
        title,

        description,

        searchPlaceholder,

        popularSearches,

        imageOne,

        imageTwo,

        studentCount,

        studentCountText,

        isActive,
      });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Department section created successfully.",
        data: section,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "CREATE DEPARTMENT SECTION ERROR:",
      error
    );

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name ===
        "ValidationError" &&
      "errors" in error
    ) {
      const mongooseError =
        error as {
          errors?: Record<
            string,
            {
              message?: string;
            }
          >;
        };

      const validationErrors =
        Object.entries(
          mongooseError.errors || {}
        ).map(
          ([field, value]) => ({
            field,
            message:
              value?.message ||
              "Invalid value.",
          })
        );

      return NextResponse.json(
        {
          success: false,
          message:
            "Department section validation failed.",
          errors:
            validationErrors,
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // DUPLICATE / OTHER ERROR
    // =====================================================

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create Department section.",
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
// Update Department Section
// =========================================================

export async function PUT(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const body =
      await req.json();

    const section =
      await DepartmentSectionModel.findOneAndUpdate(
        {},
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department section not found.",
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
          "Department section updated successfully.",
        data: section,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE DEPARTMENT SECTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update Department section.",
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
// Delete Department Section
// =========================================================

export async function DELETE(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const section =
      await DepartmentSectionModel.findOneAndDelete(
        {}
      );

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Department section not found.",
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
          "Department section deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "DELETE DEPARTMENT SECTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete Department section.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}