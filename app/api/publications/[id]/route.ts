import { NextRequest, NextResponse } from "next/server";
import {connectToDB} from "@/lib/connectToDB";
import Publication from "@/lib/models/Publication";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    await connectToDB();

    const { id } = await params;

    const publication = await Publication.findById(id);

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: "Publication not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: publication,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publication",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const publication = await Publication.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Publication updated successfully",
      data: publication,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update publication",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    await connectToDB();

    const { id } = await params;

    await Publication.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Publication deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete publication",
      },
      { status: 500 }
    );
  }
}