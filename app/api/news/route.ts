import { NextRequest, NextResponse } from "next/server";

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

// =========================================================
// CREATE SLUG
// =========================================================

function createSlug(value: string) {
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
// MAKE UNIQUE SLUG
// =========================================================

async function createUniqueSlug(
  requestedSlug: string,
  title: string
) {
  const baseSlug =
    createSlug(
      requestedSlug
    ) ||
    createSlug(title);

  if (!baseSlug) {
    throw new Error(
      "A valid title or slug is required."
    );
  }

  let slug = baseSlug;

  let counter = 1;

  while (
    await News.exists({
      slug,
    })
  ) {
    slug = `${baseSlug}-${counter}`;

    counter += 1;
  }

  return slug;
}

// =========================================================
// GET
// =========================================================

export async function GET(
  request: NextRequest
) {
  try {
    // =======================================================
    // DATABASE
    // =======================================================

    await connectToDB();

    // =======================================================
    // GET NEWS
    // =======================================================

    const news =
      await News.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

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
      "GET NEWS ERROR:",
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
// POST
// =========================================================

export async function POST(
  request: NextRequest
) {
  try {
    // =======================================================
    // DATABASE
    // =======================================================

    await connectToDB();

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

    const finalSlug =
      await createUniqueSlug(
        typeof slug ===
          "string"
          ? slug
          : "",
        title
      );

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
    // CREATE NEWS
    // =======================================================

    const news =
      await News.create({
        title:
          title.trim(),

        slug:
          finalSlug,

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
      });

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "News created successfully.",

        data: news,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE NEWS ERROR:",
      error
    );

    // =======================================================
    // DUPLICATE SLUG
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
            : "Failed to create News.",
      },
      {
        status: 500,
      }
    );
  }
}