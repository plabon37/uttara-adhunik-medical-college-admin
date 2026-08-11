import { NextResponse } from "next/server";

import {connectToDB} from "@/lib/connectToDB";

import StudentFeedback from "@/lib/models/StudentFeedback";

// =========================================================
// CORS
// =========================================================

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin":
      process.env.CLIENT_URL || "*",

    "Access-Control-Allow-Methods":
      "GET, POST, PUT, DELETE, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type",

    "Access-Control-Allow-Credentials":
      "true",
  };
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS() {
  return new Response(null, {
    status: 204,

    headers: getCorsHeaders(),
  });
}

// =========================================================
// GET ALL STUDENT FEEDBACK
// =========================================================

export async function GET() {
  try {
    await connectToDB();

    const feedback =
      await StudentFeedback.find({})
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      {
        success: true,

        data: feedback,
      },
      {
        status: 200,

        headers: getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "GET STUDENT FEEDBACK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to fetch student feedback.",
      },
      {
        status: 500,

        headers: getCorsHeaders(),
      }
    );
  }
}

// =========================================================
// POST STUDENT FEEDBACK
// =========================================================

export async function POST(
  request: Request
) {
  try {
    await connectToDB();

    // =======================================================
    // READ BODY
    // =======================================================

    const body =
      await request.json();

    const {
      name,
      designation,
      feedback,
      image,
      rating,
      isPublished,
      order,
    } = body;

    // =======================================================
    // REQUIRED VALIDATION
    // =======================================================

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student name is required.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    if (
      typeof designation !==
        "string" ||
      !designation.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Designation is required.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    if (
      typeof feedback !==
        "string" ||
      !feedback.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Feedback is required.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    if (
      typeof image !== "string" ||
      !image.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student image is required.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // RATING VALIDATION
    // =======================================================

    const numericRating =
      Number(rating);

    if (
      !Number.isFinite(
        numericRating
      ) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Rating must be between 1 and 5.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // ORDER VALIDATION
    // =======================================================

    const numericOrder =
      Number(order ?? 0);

    if (
      !Number.isFinite(
        numericOrder
      ) ||
      numericOrder < 0
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Order must be a non-negative number.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // CREATE
    // =======================================================

    const newFeedback =
      await StudentFeedback.create({
        name: name.trim(),

        designation:
          designation.trim(),

        feedback:
          feedback.trim(),

        image: image.trim(),

        rating:
          numericRating,

        isPublished:
          typeof isPublished ===
          "boolean"
            ? isPublished
            : true,

        order:
          numericOrder,
      });

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Student feedback created successfully.",

        data: newFeedback,
      },
      {
        status: 201,

        headers: getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "CREATE STUDENT FEEDBACK ERROR:",
      error
    );

    // =======================================================
    // MONGOOSE VALIDATION ERROR
    // =======================================================

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      (
        error as {
          name?: string;
        }
      ).name ===
        "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Please provide valid student feedback data.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // SERVER ERROR
    // =======================================================

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to create student feedback.",
      },
      {
        status: 500,

        headers: getCorsHeaders(),
      }
    );
  }
}