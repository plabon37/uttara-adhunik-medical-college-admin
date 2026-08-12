import { NextResponse } from "next/server";

import mongoose from "mongoose";

import {connectToDB} from "@/lib/connectToDB";

import StudentFeedback from "@/lib/models/StudentFeedback";

// =========================================================
// TYPES
// =========================================================

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

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
// GET SINGLE FEEDBACK
// =========================================================

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid student feedback ID.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // FIND FEEDBACK
    // =======================================================

    const feedback =
      await StudentFeedback.findById(
        id
      ).lean();

    if (!feedback) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student feedback not found.",
        },
        {
          status: 404,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        data: feedback,
      },
      {
        status: 200,

        headers:
          getCorsHeaders(),
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

        headers:
          getCorsHeaders(),
      }
    );
  }
}

// =========================================================
// UPDATE FEEDBACK
// =========================================================

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid student feedback ID.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

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
    // VALIDATE NAME
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

    // =======================================================
    // VALIDATE DESIGNATION
    // =======================================================

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

    // =======================================================
    // VALIDATE FEEDBACK
    // =======================================================

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

    // =======================================================
    // VALIDATE IMAGE
    // =======================================================

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
    // VALIDATE RATING
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
    // VALIDATE ORDER
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
    // UPDATE
    // =======================================================

    const updatedFeedback =
      await StudentFeedback.findByIdAndUpdate(
        id,

        {
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
        },

        {
          new: true,

          runValidators: true,
        }
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (!updatedFeedback) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student feedback not found.",
        },
        {
          status: 404,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Student feedback updated successfully.",

        data: updatedFeedback,
      },
      {
        status: 200,

        headers:
          getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "UPDATE STUDENT FEEDBACK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to update student feedback.",
      },
      {
        status: 500,

        headers:
          getCorsHeaders(),
      }
    );
  }
}

// =========================================================
// DELETE FEEDBACK
// =========================================================

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    await connectToDB();

    const { id } =
      await context.params;

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid student feedback ID.",
        },
        {
          status: 400,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // DELETE
    // =======================================================

    const deletedFeedback =
      await StudentFeedback.findByIdAndDelete(
        id
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (!deletedFeedback) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student feedback not found.",
        },
        {
          status: 404,

          headers:
            getCorsHeaders(),
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Student feedback deleted successfully.",

        data: deletedFeedback,
      },
      {
        status: 200,

        headers:
          getCorsHeaders(),
      }
    );
  } catch (error) {
    console.error(
      "DELETE STUDENT FEEDBACK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to delete student feedback.",
      },
      {
        status: 500,

        headers:
          getCorsHeaders(),
      }
    );
  }
}