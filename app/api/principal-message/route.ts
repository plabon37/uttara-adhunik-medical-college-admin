import {
  NextRequest,
  NextResponse,
} from "next/server";

import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";

import {
  PrincipalMessageModel,
} from "@/lib/models/PrincipalMessage";

// =========================================================
// CORS HEADERS
// =========================================================

const corsHeaders = {
  "Access-Control-Allow-Origin":
    "http://localhost:3001",

  "Access-Control-Allow-Methods":
    "GET, POST, PUT, OPTIONS",

  "Access-Control-Allow-Headers":
    "Content-Type",
};

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS() {
  return new NextResponse(
    null,
    {
      status: 204,
      headers: corsHeaders,
    }
  );
}

// =========================================================
// GET
// =========================================================

export async function GET() {
  try {
    await connectToDB();

    const principalMessage =
      await PrincipalMessageModel.findOne()
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
          headers: corsHeaders,
        }
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: principalMessage,
      },
      {
        status: 200,
        headers: corsHeaders,
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
        headers: corsHeaders,
      }
    );
  }
}

// =========================================================
// POST
// =========================================================

export async function POST(
  request: NextRequest
) {
  try {
    await connectToDB();

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
          headers: corsHeaders,
        }
      );
    }

    // =====================================================
    // PREVENT DUPLICATE
    // =====================================================

    const existing =
      await PrincipalMessageModel.findOne();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message already exists. Please edit the existing section.",
        },
        {
          status: 409,
          headers: corsHeaders,
        }
      );
    }

    // =====================================================
    // CREATE
    // =====================================================

    const principalMessage =
      await PrincipalMessageModel.create({
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
          buttonText?.trim() ||
          "Read More",

        buttonLink:
          buttonLink?.trim() ||
          "#",

        isActive:
          typeof isActive ===
          "boolean"
            ? isActive
            : true,
      });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Principal Message created successfully.",

        data: principalMessage,
      },
      {
        status: 201,
        headers: corsHeaders,
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
        headers: corsHeaders,
      }
    );
  }
}

// =========================================================
// PUT — UPDATE
// =========================================================

export async function PUT(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =====================================================
    // GET ID
    // =====================================================

    const { searchParams } =
      new URL(
        request.url
      );

    const id =
      searchParams.get(
        "id"
      );

    // =====================================================
    // ID VALIDATION
    // =====================================================

    if (
      !id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message ID is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (
      !mongoose.isValidObjectId(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Principal Message ID.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

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
          headers: corsHeaders,
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
            buttonText?.trim() ||
            "Read More",

          buttonLink:
            buttonLink?.trim() ||
            "#",

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
          headers: corsHeaders,
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
        headers: corsHeaders,
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
        headers: corsHeaders,
      }
    );
  }
}