import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    await connectToDB();

    const updatedHero = await HeroModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHero) {
      return NextResponse.json(
        {
          message: "Hero not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Hero Updated Successfully",
        data: updatedHero,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("PATCH Hero Error:", error);

    return NextResponse.json(
      {
        message: "Failed to update hero",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDB();

    const deletedHero = await HeroModel.findByIdAndDelete(
      id
    );

    if (!deletedHero) {
      return NextResponse.json(
        {
          message: "Hero not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Hero Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE Hero Error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete hero",
      },
      {
        status: 500,
      }
    );
  }
}