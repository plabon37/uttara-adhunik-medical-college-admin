import {
  NextRequest,
  NextResponse,
} from "next/server";

import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";

import {
  PrincipalMessageModel,
} from "@/lib/models/PrincipalMessage";

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
    "GET, PUT, DELETE, OPTIONS"
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
// RESPONSE HELPER
// =========================================================

function jsonResponse(
  data: unknown,
  status: number,
  origin: string | null
) {
  return NextResponse.json(
    data,
    {
      status,
      headers:
        getCorsHeaders(origin),
    }
  );
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
// GET BY ID
// =========================================================

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // GET ID
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Principal Message ID.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FIND
    // =====================================================

    const data =
      await PrincipalMessageModel
        .findById(id)
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!data) {
      return jsonResponse(
        {
          success: false,
          message:
            "Principal Message not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        data,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "GET PRINCIPAL MESSAGE BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to fetch Principal Message.",
      },
      500,
      origin
    );
  }
}

// =========================================================
// PUT
// Update Principal Message
// =========================================================

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // GET ID
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Principal Message ID.",
        },
        400,
        origin
      );
    }

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
    // VALIDATION
    // =====================================================

    const {
      tagline,
      titlePrefix,
      titleHighlight,
      signatureImage,
      principalName,
      designation,
      heading,
      description,
      principalImage,
      buttonText,
      buttonLink,
      isActive,
    } = body;

    if (
      !tagline ||
      !titlePrefix ||
      !titleHighlight ||
      !signatureImage ||
      !principalName ||
      !designation ||
      !heading ||
      !description ||
      !principalImage
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Required fields are missing.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // UPDATE
    // =====================================================

    const updated =
      await PrincipalMessageModel.findByIdAndUpdate(
        id,
        {
          tagline:
            tagline.trim(),

          titlePrefix:
            titlePrefix.trim(),

          titleHighlight:
            titleHighlight.trim(),

          signatureImage:
            signatureImage.trim(),

          principalName:
            principalName.trim(),

          designation:
            designation.trim(),

          heading:
            heading.trim(),

          description:
            description.trim(),

          principalImage:
            principalImage.trim(),

          buttonText:
            typeof buttonText ===
              "string" &&
            buttonText.trim()
              ? buttonText.trim()
              : "Read More",

          buttonLink:
            typeof buttonLink ===
              "string" &&
            buttonLink.trim()
              ? buttonLink.trim()
              : "#",

          isActive:
            typeof isActive ===
            "boolean"
              ? isActive
              : true,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!updated) {
      return jsonResponse(
        {
          success: false,
          message:
            "Principal Message not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        message:
          "Principal Message updated successfully.",
        data: updated,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "UPDATE PRINCIPAL MESSAGE BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to update Principal Message.",
      },
      500,
      origin
    );
  }
}

// =========================================================
// DELETE
// Delete Principal Message
// =========================================================

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    // =====================================================
    // GET ID
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Principal Message ID.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // DELETE
    // =====================================================

    const deleted =
      await PrincipalMessageModel.findByIdAndDelete(
        id
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!deleted) {
      return jsonResponse(
        {
          success: false,
          message:
            "Principal Message not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        message:
          "Principal Message deleted successfully.",
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "DELETE PRINCIPAL MESSAGE BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to delete Principal Message.",
      },
      500,
      origin
    );
  }
}