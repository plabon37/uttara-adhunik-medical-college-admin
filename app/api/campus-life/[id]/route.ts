import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";
import { CampusLifeModel } from "@/lib/models/CampusLife";

interface CampusLifeItemInput {
  title?: string;
  image?: string;
  link?: string;
  isActive?: boolean;
  order?: number;
}

function prepareItems(items: CampusLifeItemInput[]) {
  return items.map((item, index) => ({
    title: typeof item.title === "string" ? item.title.trim() : "",
    image: typeof item.image === "string" ? item.image.trim() : "",
    link:
      typeof item.link === "string" && item.link.trim()
        ? item.link.trim()
        : "#",
    isActive:
      typeof item.isActive === "boolean" ? item.isActive : true,
    order: typeof item.order === "number" ? item.order : index,
  }));
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown server error.";
}

function validateId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await context.params;

    if (!validateId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Campus Life ID.",
        },
        { status: 400 }
      );
    }

    const campusLife = await CampusLifeModel.findById(id).lean();

    if (!campusLife) {
      return NextResponse.json(
        {
          success: false,
          message: "Campus Life not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: campusLife,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CAMPUS LIFE BY ID ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Campus Life.",
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await context.params;

    if (!validateId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Campus Life ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { tagline, title, description, items, isActive } = body;

    if (typeof tagline !== "string" || !tagline.trim()) {
      return NextResponse.json(
        { success: false, message: "Tagline is required." },
        { status: 400 }
      );
    }

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    if (typeof description !== "string" || !description.trim()) {
      return NextResponse.json(
        { success: false, message: "Description is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one Campus Life item is required.",
        },
        { status: 400 }
      );
    }

    const existing = await CampusLifeModel.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Campus Life not found.",
        },
        { status: 404 }
      );
    }

    existing.tagline = tagline.trim();
    existing.title = title.trim();
    existing.description = description.trim();
    existing.items = prepareItems(items) as typeof existing.items;
    existing.isActive =
      typeof isActive === "boolean" ? isActive : true;

    await existing.validate();
    const updated = await existing.save();

    return NextResponse.json(
      {
        success: true,
        message: "Campus Life updated successfully.",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE CAMPUS LIFE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Campus Life.",
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await context.params;

    if (!validateId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Campus Life ID.",
        },
        { status: 400 }
      );
    }

    const deleted = await CampusLifeModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Campus Life not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Campus Life deleted successfully.",
        data: deleted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE CAMPUS LIFE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete Campus Life.",
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}