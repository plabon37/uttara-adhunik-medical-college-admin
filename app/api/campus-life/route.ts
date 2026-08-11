import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import { CampusLifeModel } from "@/lib/models/CampusLife";

// =========================================================
// CORS
// =========================================================

const CLIENT_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  "http://localhost:3001";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": CLIENT_URL,
    "Access-Control-Allow-Methods":
      "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type",
  };
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// =========================================================
// GET
// =========================================================

export async function GET() {
  try {
    await connectToDB();

    const campusLife =
      await CampusLifeModel.findOne()
        .sort({ createdAt: -1 })
        .lean();

    return NextResponse.json(
      {
        success: true,
        data: campusLife || null,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "GET CAMPUS LIFE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Campus Life.",
      },
      {
        status: 500,
        headers: corsHeaders(),
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
      title,
      description,
      items,
      isActive,
    } = body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      typeof tagline !== "string" ||
      !tagline.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tagline is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    if (
      typeof description !==
        "string" ||
      !description.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Description is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least one Campus Life item is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // DUPLICATE CHECK
    // =====================================================

    const existing =
      await CampusLifeModel.findOne();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campus Life already exists. Please edit the existing section.",
        },
        {
          status: 409,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // PREPARE ITEMS
    // =====================================================

    const preparedItems =
      items.map(
        (
          item: {
            title?: string;
            image?: string;
            link?: string;
            isActive?: boolean;
            order?: number;
          },
          index: number
        ) => ({
          title:
            typeof item.title ===
            "string"
              ? item.title.trim()
              : "",

          image:
            typeof item.image ===
            "string"
              ? item.image.trim()
              : "",

          link:
            typeof item.link ===
              "string" &&
            item.link.trim()
              ? item.link.trim()
              : "#",

          isActive:
            typeof item.isActive ===
            "boolean"
              ? item.isActive
              : true,

          order:
            typeof item.order ===
            "number"
              ? item.order
              : index,
        })
      );

    // =====================================================
    // CREATE
    // =====================================================

    const campusLife =
      await CampusLifeModel.create({
        tagline:
          tagline.trim(),

        title:
          title.trim(),

        description:
          description.trim(),

        items:
          preparedItems,

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
          "Campus Life created successfully.",
        data: campusLife,
      },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "CREATE CAMPUS LIFE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Campus Life.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}