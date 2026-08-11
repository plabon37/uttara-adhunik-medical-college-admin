import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import AlumniEvent from "@/lib/models/AlumniEvent";

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
// GET — ALL ALUMNI EVENTS
// =========================================================

export async function GET() {
  try {
    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    await connectToDB();

    // =====================================================
    // FETCH EVENTS
    // =====================================================

    const events =
      await AlumniEvent.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: events,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "GET ALUMNI EVENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Alumni Events.",
        data: [],
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// =========================================================
// POST — CREATE ALUMNI EVENT
// =========================================================

export async function POST(
  request: NextRequest
) {
  try {
    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    await connectToDB();

    // =====================================================
    // READ REQUEST BODY
    // =====================================================

    const body =
      await request.json();

    // =====================================================
    // EXTRACT DATA
    // =====================================================

    const {
      title,
      date,
      time,
      location,
      image,
      isPublished,
      order,
    } = body;

    // =====================================================
    // VALIDATION — TITLE
    // =====================================================

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Event title is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // VALIDATION — DATE
    // =====================================================

    if (
      typeof date !== "string" ||
      !date.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Event date is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // VALIDATION — TIME
    // =====================================================

    if (
      typeof time !== "string" ||
      !time.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Event time is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // VALIDATION — LOCATION
    // =====================================================

    if (
      typeof location !== "string" ||
      !location.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Event location is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // VALIDATION — IMAGE
    // =====================================================

    if (
      typeof image !== "string" ||
      !image.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Event image is required.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // NORMALIZE PUBLISH STATUS
    // =====================================================

    const published =
      typeof isPublished ===
      "boolean"
        ? isPublished
        : true;

    // =====================================================
    // NORMALIZE ORDER
    // =====================================================

    const eventOrder =
      typeof order === "number" &&
      Number.isFinite(order)
        ? order
        : 0;

    // =====================================================
    // CREATE EVENT
    // =====================================================

    const event =
      await AlumniEvent.create({
        title: title.trim(),

        date: date.trim(),

        time: time.trim(),

        location:
          location.trim(),

        image: image.trim(),

        isPublished:
          published,

        order:
          eventOrder,
      });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Alumni Event created successfully.",
        data: event,
      },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error(
      "CREATE ALUMNI EVENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Alumni Event.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}