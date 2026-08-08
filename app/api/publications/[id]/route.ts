import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { PublicationModel } from "@/lib/models/Publication";

// ==========================
// GET SINGLE PUBLICATION
// ==========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const publication = await PublicationModel.findById(id);

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: publication,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET SINGLE PUBLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publication.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// UPDATE PUBLICATION
// ==========================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const publication = await PublicationModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Publication updated successfully.",
        data: publication,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPDATE PUBLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update publication.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// DELETE PUBLICATION
// ==========================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const publication = await PublicationModel.findByIdAndDelete(id);

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Publication deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE PUBLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete publication.",
      },
      {
        status: 500,
      }
    );
  }
}