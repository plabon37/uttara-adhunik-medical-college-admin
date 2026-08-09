import { NextRequest, NextResponse } from "next/server";
import {connectToDB} from "@/lib/connectToDB";
import { AboutModel } from "@/lib/models/About";

export const runtime = "nodejs";

/* =========================================================
   GET
   Get About section
========================================================= */

export async function GET() {
  try {
    await connectToDB();

    const about = await AboutModel.findOne().lean();

    if (!about) {
      return NextResponse.json(
        {
          success: false,
          message: "About section not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: about,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET ABOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch About section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
   Create About section
========================================================= */

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    /* -------------------------------------------------------
       CHECK EXISTING ABOUT
    ------------------------------------------------------- */

    const existingAbout =
      await AboutModel.findOne();

    if (existingAbout) {
      return NextResponse.json(
        {
          success: false,
          message:
            "About section already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* -------------------------------------------------------
       CREATE ABOUT
    ------------------------------------------------------- */

    const about =
      await AboutModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message:
          "About section created successfully.",
        data: about,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE ABOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create About section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PUT
   Update About section
========================================================= */

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const about =
      await AboutModel.findOneAndUpdate(
        {},
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!about) {
      return NextResponse.json(
        {
          success: false,
          message:
            "About section not found.",
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
          "About section updated successfully.",
        data: about,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE ABOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update About section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   Delete About section
========================================================= */

export async function DELETE() {
  try {
    await connectToDB();

    const about =
      await AboutModel.findOneAndDelete({});

    if (!about) {
      return NextResponse.json(
        {
          success: false,
          message:
            "About section not found.",
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
          "About section deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE ABOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete About section.",
      },
      {
        status: 500,
      }
    );
  }
}