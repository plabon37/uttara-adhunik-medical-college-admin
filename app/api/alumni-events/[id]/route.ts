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
// ROUTE PARAMS TYPE
// =========================================================

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
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
// GET — SINGLE ALUMNI EVENT
// =========================================================

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // ID VALIDATION
    // =====================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event ID is missing.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // FIND EVENT
    // =====================================================

    const event =
      await AlumniEvent.findById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event not found.",
        },
        {
          status: 404,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "GET SINGLE ALUMNI EVENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Alumni Event.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// =========================================================
// PUT — UPDATE ALUMNI EVENT
// =========================================================

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // ID VALIDATION
    // =====================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event ID is missing.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // REQUEST BODY
    // =====================================================

    const body =
      await request.json();

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
    // NORMALIZE DATA
    // =====================================================

    const published =
      typeof isPublished ===
      "boolean"
        ? isPublished
        : true;

    const eventOrder =
      typeof order === "number" &&
      Number.isFinite(order)
        ? order
        : 0;

    // =====================================================
    // UPDATE
    // =====================================================

    const updatedEvent =
      await AlumniEvent.findByIdAndUpdate(
        id,
        {
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
        },
        {
          new: true,
          runValidators: true,
        }
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!updatedEvent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event not found.",
        },
        {
          status: 404,
          headers: corsHeaders(),
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
          "Alumni Event updated successfully.",
        data: updatedEvent,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE ALUMNI EVENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Alumni Event.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// =========================================================
// DELETE — DELETE ALUMNI EVENT
// =========================================================

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =====================================================
    // ID VALIDATION
    // =====================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event ID is missing.",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // =====================================================
    // DELETE
    // =====================================================

    const deletedEvent =
      await AlumniEvent.findByIdAndDelete(
        id
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!deletedEvent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Alumni Event not found.",
        },
        {
          status: 404,
          headers: corsHeaders(),
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
          "Alumni Event deleted successfully.",
        data: deletedEvent,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "DELETE ALUMNI EVENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Alumni Event.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}