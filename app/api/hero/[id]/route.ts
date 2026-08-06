import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";

// ==========================
// GET SINGLE HERO
// ==========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const hero = await HeroModel.findById(id);

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: hero,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hero.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// UPDATE HERO
// ==========================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const hero = await HeroModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hero updated successfully.",
        data: hero,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPDATE HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hero.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// DELETE HERO
// ==========================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const hero = await HeroModel.findByIdAndDelete(id);

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hero deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hero.",
      },
      {
        status: 500,
      }
    );
  }
}