import { NextRequest, NextResponse } from "next/server";
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
// Get all Departments
// =========================================================

export async function GET(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const departments =
      await DepartmentModel.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      {
        success: true,
        data: departments,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET DEPARTMENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Departments.",
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
// Create Department
// =========================================================

export async function POST(
  req: NextRequest
) {
  const origin =
    req.headers.get("origin");

  try {
    await connectToDB();

    const body =
      await req.json();

    // =====================================================
    // CHECK REQUIRED DATA
    // =====================================================

    if (
      !body.name ||
      !body.slug ||
      !body.image
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, slug and image are required.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CHECK DUPLICATE SLUG
    // =====================================================

    const existingDepartment =
      await DepartmentModel.findOne({
        slug: body.slug,
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

    // =====================================================
    // CREATE DEPARTMENT
    // =====================================================

    const department =
      await DepartmentModel.create(
        body
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Department created successfully.",
        data: department,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "CREATE DEPARTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Department.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}