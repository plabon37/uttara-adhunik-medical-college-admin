import {
  NextRequest,
  NextResponse,
} from "next/server";

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
// Get Principal Message
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
    // FETCH LATEST PRINCIPAL MESSAGE
    // =====================================================

    const principalMessage =
      await PrincipalMessageModel
        .findOne()
        .sort({
          createdAt: -1,
        })
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!principalMessage) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
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
        data:
          principalMessage,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "GET PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Principal Message.",
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
// Create Principal Message
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
    // READ BODY
    // =====================================================

    const body =
      await request.json();

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

    // =====================================================
    // VALIDATION
    // =====================================================

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
      return NextResponse.json(
        {
          success: false,
          message:
            "Required fields are missing.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // CHECK EXISTING
    // =====================================================

    const existing =
      await PrincipalMessageModel.findOne();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message already exists. Please edit the existing section.",
          data: existing,
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

    const principalMessage =
      await PrincipalMessageModel.create(
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
        }
      );

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Principal Message created successfully.",
        data:
          principalMessage,
      },
      {
        status: 201,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "CREATE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Principal Message.",
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
// Update Principal Message
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
    // GET ID
    // =====================================================

    const {
      searchParams,
    } = new URL(
      request.url
    );

    const id =
      searchParams.get("id");

    // =====================================================
    // ID REQUIRED
    // =====================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message ID is required.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await request.json();

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

    // =====================================================
    // VALIDATION
    // =====================================================

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
      return NextResponse.json(
        {
          success: false,
          message:
            "Required fields are missing.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

    // =====================================================
    // UPDATE
    // =====================================================

    const updatedPrincipalMessage =
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

    if (
      !updatedPrincipalMessage
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
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
          "Principal Message updated successfully.",
        data:
          updatedPrincipalMessage,
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Principal Message.",
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
// Delete Principal Message
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
    // GET ID
    // =====================================================

    const {
      searchParams,
    } = new URL(
      request.url
    );

    const id =
      searchParams.get("id");

    // =====================================================
    // ID REQUIRED
    // =====================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message ID is required.",
        },
        {
          status: 400,
          headers:
            getCorsHeaders(origin),
        }
      );
    }

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
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
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
          "Principal Message deleted successfully.",
      },
      {
        status: 200,
        headers:
          getCorsHeaders(origin),
      }
    );
  } catch (error) {
    console.error(
      "DELETE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Principal Message.",
      },
      {
        status: 500,
        headers:
          getCorsHeaders(origin),
      }
    );
  }
}