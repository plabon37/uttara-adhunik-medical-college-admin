import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { StatisticsModel } from "@/lib/models/Statistics";

export const runtime = "nodejs";

/* =========================================================
GET
Get Statistics section
========================================================= */

export async function GET() {
  try {
    await connectToDB();

    const statistics =
      await StatisticsModel.findOne().lean();

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: statistics,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch Statistics section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
POST
Create Statistics section
========================================================= */

export async function POST(
  req: NextRequest
) {
  try {
    await connectToDB();

    const body =
      await req.json();

    /* -------------------------------------------------------
       CHECK EXISTING STATISTICS
    ------------------------------------------------------- */

    const existingStatistics =
      await StatisticsModel.findOne();

    if (existingStatistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* -------------------------------------------------------
       CREATE STATISTICS
    ------------------------------------------------------- */

    const statistics =
      await StatisticsModel.create(
        body
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section created successfully.",
        data: statistics,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create Statistics section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
PUT
Update Statistics section
========================================================= */

export async function PUT(
  req: NextRequest
) {
  try {
    await connectToDB();

    const body =
      await req.json();

    const statistics =
      await StatisticsModel.findOneAndUpdate(
        {},
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section updated successfully.",
        data: statistics,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update Statistics section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
DELETE
Delete Statistics section
========================================================= */

export async function DELETE() {
  try {
    await connectToDB();

    const statistics =
      await StatisticsModel.findOneAndDelete(
        {}
      );

    if (!statistics) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Statistics section not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Statistics section deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE STATISTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete Statistics section.",
      },
      {
        status: 500,
      }
    );
  }
}