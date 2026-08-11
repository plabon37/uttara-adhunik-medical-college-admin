import {
  NextRequest,
  NextResponse,
} from "next/server";

import mongoose from "mongoose";

import { connectToDB } from "@/lib/connectToDB";

import News from "@/lib/models/News";

// =========================================================
// TYPES
// =========================================================

interface NewsRequestBody {
  title?: string;

  slug?: string;

  category?: string;

  description?: string;

  image?: string;

  author?: string;

  date?: string;

  isPublished?: boolean;

  order?: number;
}

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// =========================================================
// CREATE SLUG
// =========================================================

function createSlug(
  value: string
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .replace(
      /\s+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

// =========================================================
// GET ID
// =========================================================

async function getId(
  context: RouteContext
) {
  const params =
    await context.params;

  return params.id;
}

// =========================================================
// GET
// GET /api/news/:id
// =========================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // =======================================================
    // DATABASE
    // =======================================================

    await connectToDB();

    // =======================================================
    // ID
    // =======================================================

    const id =
      await getId(context);

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid News ID.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // FIND NEWS
    // =======================================================

    const news =
      await News.findById(
        id
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (!news) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        data: news,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET NEWS BY ID ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to fetch News.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// PUT
// PUT /api/news/:id
// =========================================================

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // =======================================================
    // DATABASE
    // =======================================================

    await connectToDB();

    // =======================================================
    // ID
    // =======================================================

    const id =
      await getId(context);

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid News ID.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // CHECK EXISTING NEWS
    // =======================================================

    const existingNews =
      await News.findById(id);

    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =======================================================
    // REQUEST BODY
    // =======================================================

    const body =
      (await request.json()) as NewsRequestBody;

    const {
      title,
      slug,
      category,
      description,
      image,
      author,
      date,
      isPublished,
      order,
    } = body;

    // =======================================================
    // VALIDATION — TITLE
    // =======================================================

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News title is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // VALIDATION — CATEGORY
    // =======================================================

    if (
      typeof category !==
        "string" ||
      !category.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News category is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // VALIDATION — DESCRIPTION
    // =======================================================

    if (
      typeof description !==
        "string" ||
      !description.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News description is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // VALIDATION — IMAGE
    // =======================================================

    if (
      typeof image !==
        "string" ||
      !image.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News image is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // VALIDATION — AUTHOR
    // =======================================================

    if (
      typeof author !==
        "string" ||
      !author.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News author is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // VALIDATION — DATE
    // =======================================================

    if (
      typeof date !== "string" ||
      !date.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News date is required.",
        },
        {
          status: 400,
        }
      );
    }

    const parsedDate =
      new Date(
        date
      );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid News date.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // SLUG
    // =======================================================

    const requestedSlug =
      typeof slug ===
      "string"
        ? slug.trim()
        : "";

    const generatedSlug =
      createSlug(
        requestedSlug ||
          title
      );

    if (!generatedSlug) {
      return NextResponse.json(
        {
          success: false,

          message:
            "A valid News title or slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // CHECK DUPLICATE SLUG
    // Ignore current document
    // =======================================================

    const duplicateSlug =
      await News.findOne({
        slug: generatedSlug,

        _id: {
          $ne: id,
        },
      }).lean();

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Another News item already uses this slug.",
        },
        {
          status: 409,
        }
      );
    }

    // =======================================================
    // ORDER
    // =======================================================

    const finalOrder =
      typeof order ===
        "number" &&
      Number.isFinite(order) &&
      order >= 0
        ? order
        : 0;

    // =======================================================
    // PUBLISHED
    // =======================================================

    const finalPublished =
      typeof isPublished ===
      "boolean"
        ? isPublished
        : true;

    // =======================================================
    // UPDATE
    // =======================================================

    const updatedNews =
      await News.findByIdAndUpdate(
        id,
        {
          title:
            title.trim(),

          slug:
            generatedSlug,

          category:
            category.trim(),

          description:
            description.trim(),

          image:
            image.trim(),

          author:
            author.trim(),

          date:
            parsedDate,

          isPublished:
            finalPublished,

          order:
            finalOrder,
        },
        {
          new: true,

          runValidators: true,
        }
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (!updatedNews) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "News updated successfully.",

        data: updatedNews,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE NEWS ERROR:",
      error
    );

    // =======================================================
    // DUPLICATE KEY
    // =======================================================

    if (
      error &&
      typeof error ===
        "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "A News item with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // =======================================================
    // NORMAL ERROR
    // =======================================================

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to update News.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// DELETE
// DELETE /api/news/:id
// =========================================================

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // =======================================================
    // DATABASE
    // =======================================================

    await connectToDB();

    // =======================================================
    // ID
    // =======================================================

    const id =
      await getId(context);

    // =======================================================
    // VALIDATE ID
    // =======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid News ID.",
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // DELETE
    // =======================================================

    const deletedNews =
      await News.findByIdAndDelete(
        id
      );

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (!deletedNews) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "News deleted successfully.",

        data: deletedNews,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to delete News.",
      },
      {
        status: 500,
      }
    );
  }
}