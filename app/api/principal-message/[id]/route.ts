import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDB } from "@/lib/connectToDB";

import {
  PrincipalMessageModel,
} from "@/lib/models/PrincipalMessage";

// =========================================================
// GET BY ID
// =========================================================

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const {
      id,
    } = await context.params;

    const data =
      await PrincipalMessageModel.findById(
        id
      ).lean();

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET PRINCIPAL MESSAGE BY ID ERROR:",
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
      }
    );
  }
}

// =========================================================
// PUT
// =========================================================

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const {
      id,
    } = await context.params;

    const body =
      await request.json();

    const updated =
      await PrincipalMessageModel.findByIdAndUpdate(
        id,
        {
          ...body,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
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
          "Principal Message updated successfully.",
        data: updated,
      },
      {
        status: 200,
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
      }
    );
  }
}

// =========================================================
// DELETE
// =========================================================

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectToDB();

    const {
      id,
    } = await context.params;

    const deleted =
      await PrincipalMessageModel.findByIdAndDelete(
        id
      );

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal Message not found.",
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
          "Principal Message deleted successfully.",
      },
      {
        status: 200,
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
      }
    );
  }
}