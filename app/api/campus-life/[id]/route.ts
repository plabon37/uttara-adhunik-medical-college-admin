import {
  NextRequest,
  NextResponse,
} from "next/server";

import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";
import { CampusLifeModel } from "@/lib/models/CampusLife";

export const runtime = "nodejs";

// =========================================================
// CORS
// =========================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.NEXT_PUBLIC_CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
].filter(
  (value): value is string =>
    Boolean(value)
);

// =========================================================
// CORS HEADERS
// =========================================================

function getCorsHeaders(
  origin: string | null
) {
  const headers = new Headers();

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
    );

    headers.set(
      "Vary",
      "Origin"
    );
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, PUT, DELETE, OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  headers.set(
    "Access-Control-Allow-Credentials",
    "true"
  );

  return headers;
}

// =========================================================
// RESPONSE HELPER
// =========================================================

function jsonResponse(
  data: unknown,
  status: number,
  origin: string | null
) {
  return NextResponse.json(
    data,
    {
      status,
      headers:
        getCorsHeaders(origin),
    }
  );
}

// =========================================================
// VALIDATE ID
// =========================================================

function validateId(
  id: string
) {
  return mongoose.Types.ObjectId.isValid(
    id
  );
}

// =========================================================
// PREPARE ITEMS
// =========================================================

interface CampusLifeItemInput {
  _id?: string;
  title?: string;
  image?: string;
  link?: string;
  isActive?: boolean;
  order?: number;
}

function prepareItems(
  items: CampusLifeItemInput[]
) {
  return items.map(
    (
      item,
      index
    ) => ({
      ...(item._id
        ? {
            _id: item._id,
          }
        : {}),

      title:
        typeof item.title ===
        "string"
          ? item.title.trim()
          : "",

      image:
        typeof item.image ===
        "string"
          ? item.image.trim()
          : "",

      link:
        typeof item.link ===
          "string" &&
        item.link.trim()
          ? item.link.trim()
          : "#",

      isActive:
        typeof item.isActive ===
        "boolean"
          ? item.isActive
          : true,

      order:
        typeof item.order ===
        "number"
          ? item.order
          : index,
    })
  );
}

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
  const origin =
    request.headers.get("origin");

  try {
    // =====================================================
    // PARAMS
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (!validateId(id)) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Campus Life ID.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FIND
    // =====================================================

    const campusLife =
      await CampusLifeModel
        .findById(id)
        .lean();

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!campusLife) {
      return jsonResponse(
        {
          success: false,
          message:
            "Campus Life not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        data: campusLife,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "GET CAMPUS LIFE BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to fetch Campus Life.",
      },
      500,
      origin
    );
  }
}

// =========================================================
// PUT
// Update Campus Life
// =========================================================

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get("origin");

  try {
    // =====================================================
    // PARAMS
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (!validateId(id)) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Campus Life ID.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await request.json();

    const {
      tagline,
      title,
      description,
      items,
      isActive,
    } = body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      typeof tagline !== "string" ||
      !tagline.trim()
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Tagline is required.",
        },
        400,
        origin
      );
    }

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Title is required.",
        },
        400,
        origin
      );
    }

    if (
      typeof description !== "string" ||
      !description.trim()
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Description is required.",
        },
        400,
        origin
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "At least one Campus Life item is required.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // PREPARE ITEMS
    // =====================================================

    const preparedItems =
      prepareItems(items);

    // =====================================================
    // VALIDATE ITEMS
    // =====================================================

    for (
      let index = 0;
      index <
      preparedItems.length;
      index++
    ) {
      const item =
        preparedItems[index];

      if (!item.title) {
        return jsonResponse(
          {
            success: false,
            message:
              `Campus Life item ${
                index + 1
              } title is required.`,
          },
          400,
          origin
        );
      }

      if (!item.image) {
        return jsonResponse(
          {
            success: false,
            message:
              `Campus Life item ${
                index + 1
              } image is required.`,
          },
          400,
          origin
        );
      }
    }

    // =====================================================
    // FIND EXISTING
    // =====================================================

    const existing =
      await CampusLifeModel.findById(
        id
      );

    if (!existing) {
      return jsonResponse(
        {
          success: false,
          message:
            "Campus Life not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // UPDATE FIELDS
    // =====================================================

    existing.tagline =
      tagline.trim();

    existing.title =
      title.trim();

    existing.description =
      description.trim();

    existing.items =
      preparedItems as typeof existing.items;

    existing.isActive =
      typeof isActive ===
      "boolean"
        ? isActive
        : true;

    // =====================================================
    // SAVE
    // =====================================================

    await existing.validate();

    const updated =
      await existing.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        message:
          "Campus Life updated successfully.",
        data: updated,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "UPDATE CAMPUS LIFE ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to update Campus Life.",
      },
      500,
      origin
    );
  }
}

// =========================================================
// DELETE
// Delete Campus Life
// =========================================================

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get("origin");

  try {
    // =====================================================
    // PARAMS
    // =====================================================

    const {
      id,
    } = await context.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (!validateId(id)) {
      return jsonResponse(
        {
          success: false,
          message:
            "Invalid Campus Life ID.",
        },
        400,
        origin
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // DELETE
    // =====================================================

    const deleted =
      await CampusLifeModel.findByIdAndDelete(
        id
      );

    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!deleted) {
      return jsonResponse(
        {
          success: false,
          message:
            "Campus Life not found.",
        },
        404,
        origin
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return jsonResponse(
      {
        success: true,
        message:
          "Campus Life deleted successfully.",
        data: deleted,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "DELETE CAMPUS LIFE ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Failed to delete Campus Life.",
      },
      500,
      origin
    );
  }
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS(
  request: NextRequest
) {
  const origin =
    request.headers.get("origin");

  return new NextResponse(
    null,
    {
      status: 204,
      headers:
        getCorsHeaders(origin),
    }
  );
}