import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";

// ==========================
// GET SINGLE NOTICE
// ==========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const notice = await NoticeModel.findById(id);

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: notice,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET SINGLE NOTICE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notice.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// UPDATE NOTICE
// ==========================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const notice = await NoticeModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notice updated successfully.",
        data: notice,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPDATE NOTICE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update notice.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// DELETE NOTICE
// ==========================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const notice = await NoticeModel.findByIdAndDelete(id);

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notice deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE NOTICE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete notice.",
      },
      {
        status: 500,
      }
    );
  }
}