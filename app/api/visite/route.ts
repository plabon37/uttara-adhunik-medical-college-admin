import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import Visite from "@/lib/models/Visite";

// ============================================================
// CORS
// ============================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.NEXT_PUBLIC_CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean) as string[];

function getCorsOrigin(
  request: NextRequest,
) {
  const origin =
    request.headers.get("origin");

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
    return origin;
  }

  return allowedOrigins[0] || "*";
}

function corsHeaders(
  request: NextRequest,
) {
  return {
    "Access-Control-Allow-Origin":
      getCorsOrigin(request),

    "Access-Control-Allow-Methods":
      "GET, POST, PATCH, DELETE, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",

    "Access-Control-Allow-Credentials":
      "true",

    Vary: "Origin",
  };
}

// ============================================================
// OPTIONS — CORS PREFLIGHT
// ============================================================

export async function OPTIONS(
  request: NextRequest,
) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

// ============================================================
// DATABASE CONNECTION
// ============================================================

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not configured in environment variables.",
    );
  }

  await mongoose.connect(
    process.env.MONGODB_URI,
  );
}

// ============================================================
// GET
// ============================================================

export async function GET(
  request: NextRequest,
) {
  const headers =
    corsHeaders(request);

  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    // ========================================================
    // GET SINGLE VISITE
    // ========================================================

    if (id) {
      if (
        !mongoose.Types.ObjectId.isValid(
          id,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid Visite ID.",
          },
          {
            status: 400,
            headers,
          },
        );
      }

      const visite =
        await Visite.findById(id);

      if (!visite) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Visite not found.",
          },
          {
            status: 404,
            headers,
          },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: visite,
        },
        {
          status: 200,
          headers,
        },
      );
    }

    // ========================================================
    // GET ALL VISITE
    // ========================================================

    const visites =
      await Visite.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      {
        success: true,
        data: visites,
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error(
      "GET VISITE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Visite data.",
      },
      {
        status: 500,
        headers,
      },
    );
  }
}

// ============================================================
// POST
// ============================================================

export async function POST(
  request: NextRequest,
) {
  const headers =
    corsHeaders(request);

  try {
    await connectDB();

    const body =
      await request.json();

    // ========================================================
    // REQUIRED FIELDS
    // ========================================================

    const {
      title,
      description,
      secondaryDescription,
      phoneNumber,
      phoneText,
      buttonText,
      buttonLink,
      imageOne,
      imageTwo,
      badgeNumber,
      badgeText,
      isPublished,
    } = body;

    if (
      !title ||
      !description ||
      !secondaryDescription ||
      !phoneNumber ||
      !phoneText ||
      !buttonText ||
      !buttonLink ||
      !imageOne ||
      !imageTwo ||
      !badgeNumber ||
      !badgeText
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All required fields must be provided.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    // ========================================================
    // CREATE VISITE
    // ========================================================

    const visite =
      await Visite.create({
        title,
        description,
        secondaryDescription,
        phoneNumber,
        phoneText,
        buttonText,
        buttonLink,
        imageOne,
        imageTwo,
        badgeNumber,
        badgeText,
        isPublished:
          typeof isPublished ===
          "boolean"
            ? isPublished
            : true,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Visite created successfully.",
        data: visite,
      },
      {
        status: 201,
        headers,
      },
    );
  } catch (error) {
    console.error(
      "POST VISITE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Visite.",
      },
      {
        status: 500,
        headers,
      },
    );
  }
}

// ============================================================
// PATCH
// ============================================================

export async function PATCH(
  request: NextRequest,
) {
  const headers =
    corsHeaders(request);

  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Visite ID is required.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        id,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Visite ID.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    const body =
      await request.json();

    // ========================================================
    // ALLOWED UPDATE FIELDS
    // ========================================================

    const allowedFields = [
      "title",
      "description",
      "secondaryDescription",
      "phoneNumber",
      "phoneText",
      "buttonText",
      "buttonLink",
      "imageOne",
      "imageTwo",
      "badgeNumber",
      "badgeText",
      "isPublished",
    ];

    const updateData: Record<
      string,
      unknown
    > = {};

    for (
      const field of allowedFields
    ) {
      if (
        Object.prototype.hasOwnProperty.call(
          body,
          field,
        )
      ) {
        updateData[field] =
          body[field];
      }
    }

    if (
      Object.keys(updateData)
        .length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No fields were provided for update.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    // ========================================================
    // UPDATE
    // ========================================================

    const visite =
      await Visite.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!visite) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Visite not found.",
        },
        {
          status: 404,
          headers,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Visite updated successfully.",
        data: visite,
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error(
      "PATCH VISITE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Visite.",
      },
      {
        status: 500,
        headers,
      },
    );
  }
}

// ============================================================
// DELETE
// ============================================================

export async function DELETE(
  request: NextRequest,
) {
  const headers =
    corsHeaders(request);

  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Visite ID is required.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        id,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Visite ID.",
        },
        {
          status: 400,
          headers,
        },
      );
    }

    // ========================================================
    // DELETE
    // ========================================================

    const visite =
      await Visite.findByIdAndDelete(
        id,
      );

    if (!visite) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Visite not found.",
        },
        {
          status: 404,
          headers,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Visite deleted successfully.",
        data: visite,
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error(
      "DELETE VISITE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Visite.",
      },
      {
        status: 500,
        headers,
      },
    );
  }
}