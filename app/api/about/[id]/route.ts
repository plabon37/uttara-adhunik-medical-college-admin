import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import {connectToDB} from "@/lib/connectToDB";
import { AboutModel } from "@/lib/models/About";

export const runtime = "nodejs";

/* =========================================================
   GET
   Get About by ID
========================================================= */

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const { id } = await params;

    /* -------------------------------------------------------
       VALIDATE OBJECT ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid About ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       FIND ABOUT
    ------------------------------------------------------- */

    const about =
      await AboutModel.findById(id).lean();

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
        data: about,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET ABOUT BY ID ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch About section.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PUT
   Update About by ID
========================================================= */

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const { id } = await params;

    /* -------------------------------------------------------
       VALIDATE OBJECT ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid About ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       REQUEST BODY
    ------------------------------------------------------- */

    const body = await req.json();

    /* -------------------------------------------------------
       UPDATE
    ------------------------------------------------------- */

    const about =
      await AboutModel.findByIdAndUpdate(
        id,
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
      "UPDATE ABOUT BY ID ERROR:",
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
   Delete About by ID
========================================================= */

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const { id } = await params;

    /* -------------------------------------------------------
       VALIDATE OBJECT ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid About ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       DELETE
    ------------------------------------------------------- */

    const about =
      await AboutModel.findByIdAndDelete(id);

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
      "DELETE ABOUT BY ID ERROR:",
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