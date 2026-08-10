import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDB } from "@/lib/connectToDB";

import {
  FacilitiesModel,
} from "@/lib/models/Facilities";

// =========================================================
// RUNTIME
// =========================================================

export const runtime = "nodejs";

// =========================================================
// CORS
// =========================================================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

function getCorsHeaders(
  origin: string | null
) {
  const headers =
    new Headers();

  if (
    origin &&
    allowedOrigins.includes(
      origin
    )
  ) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
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
// ERROR MESSAGE
// =========================================================

function getErrorMessage(
  error: unknown
): string {
  /* =====================================================
     MONGOOSE VALIDATION ERROR
  ===================================================== */

  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name ===
      "ValidationError" &&
    "errors" in error
  ) {
    const mongooseError =
      error as {
        errors?: Record<
          string,
          {
            message?: string;
          }
        >;
      };

    const messages =
      Object.entries(
        mongooseError.errors || {}
      ).map(
        ([field, value]) =>
          `${field}: ${
            value?.message ||
            "Invalid value"
          }`
      );

    if (
      messages.length > 0
    ) {
      return messages.join(
        ", "
      );
    }
  }

  /* =====================================================
     INVALID OBJECT ID
  ===================================================== */

  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name ===
      "CastError"
  ) {
    return "Invalid Facilities ID.";
  }

  /* =====================================================
     DUPLICATE
  ===================================================== */

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    return "Duplicate Facilities data.";
  }

  /* =====================================================
     NORMAL ERROR
  ===================================================== */

  if (
    error instanceof Error
  ) {
    return error.message;
  }

  return "An unexpected server error occurred.";
}

// =========================================================
// VALIDATE ID
// =========================================================

function isValidId(
  id: string
) {
  return /^[a-fA-F0-9]{24}$/.test(
    id
  );
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

  return new NextResponse(
    null,
    {
      status: 204,
      headers:
        getCorsHeaders(
          origin
        ),
    }
  );
}

// =========================================================
// GET
// GET /api/facilities/:id
// =========================================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    /* =====================================================
       GET ID
    ===================================================== */

    const {
      id,
    } = await params;

    /* =====================================================
       VALIDATE ID
    ===================================================== */

    if (!isValidId(id)) {
      return jsonResponse(
        {
          success: false,

          message:
            "Invalid Facilities ID.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectToDB();

    /* =====================================================
       FIND FACILITIES
    ===================================================== */

    const facilities =
      await FacilitiesModel
        .findById(id)
        .lean();

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!facilities) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities section not found.",
        },
        404,
        origin
      );
    }

    /* =====================================================
       SORT FACILITIES
    ===================================================== */

    const sortedFacilities =
      [
        ...(facilities.facilities ||
          []),
      ].sort(
        (a, b) =>
          a.order - b.order
      );

    /* =====================================================
       SUCCESS
    ===================================================== */

    return jsonResponse(
      {
        success: true,

        data: {
          ...facilities,

          facilities:
            sortedFacilities,
        },
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "GET FACILITIES BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,

        message:
          getErrorMessage(error),
      },
      500,
      origin
    );
  }
}

// =========================================================
// PUT
// PUT /api/facilities/:id
// =========================================================

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    /* =====================================================
       GET ID
    ===================================================== */

    const {
      id,
    } = await params;

    /* =====================================================
       VALIDATE ID
    ===================================================== */

    if (!isValidId(id)) {
      return jsonResponse(
        {
          success: false,

          message:
            "Invalid Facilities ID.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectToDB();

    /* =====================================================
       BODY
    ===================================================== */

    const body =
      await request.json();

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (
      !body ||
      typeof body !==
        "object"
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Invalid request body.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       TAGLINE
    ===================================================== */

    if (
      typeof body.tagline !==
        "string" ||
      !body.tagline.trim()
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities tagline is required.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       TITLE
    ===================================================== */

    if (
      typeof body.title !==
        "string" ||
      !body.title.trim()
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities title is required.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       IMAGE
    ===================================================== */

    if (
      typeof body.image !==
        "string" ||
      !body.image.trim()
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities image is required.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       FACILITIES ARRAY
    ===================================================== */

    if (
      !Array.isArray(
        body.facilities
      ) ||
      body.facilities.length ===
        0
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "At least one facility is required.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       VALIDATE EACH FACILITY
    ===================================================== */

    for (
      let index = 0;
      index <
      body.facilities.length;
      index++
    ) {
      const facility =
        body.facilities[index];

      const number =
        index + 1;

      if (
        !facility ||
        typeof facility !==
          "object"
      ) {
        return jsonResponse(
          {
            success: false,

            message:
              `Facility ${number} is invalid.`,
          },
          400,
          origin
        );
      }

      if (
        typeof facility.name !==
          "string" ||
        !facility.name.trim()
      ) {
        return jsonResponse(
          {
            success: false,

            message:
              `Facility ${number} name is required.`,
          },
          400,
          origin
        );
      }

      if (
        typeof facility.title !==
          "string" ||
        !facility.title.trim()
      ) {
        return jsonResponse(
          {
            success: false,

            message:
              `Facility ${number} title is required.`,
          },
          400,
          origin
        );
      }

      if (
        typeof facility.description !==
          "string" ||
        !facility.description.trim()
      ) {
        return jsonResponse(
          {
            success: false,

            message:
              `Facility ${number} description is required.`,
          },
          400,
          origin
        );
      }
    }

    /* =====================================================
       CLEAN DATA
    ===================================================== */

    const cleanedFacilities =
      body.facilities.map(
        (
          facility: any,
          index: number
        ) => ({
          ...(facility._id
            ? {
                _id:
                  facility._id,
              }
            : {}),

          name:
            facility.name.trim(),

          title:
            facility.title.trim(),

          description:
            facility.description.trim(),

          detailsText:
            typeof facility.detailsText ===
              "string" &&
            facility.detailsText.trim()
              ? facility.detailsText.trim()
              : "View Details",

          detailsLink:
            typeof facility.detailsLink ===
              "string" &&
            facility.detailsLink.trim()
              ? facility.detailsLink.trim()
              : "#",

          order: index,

          isActive:
            facility.isActive ??
            true,
        })
      );

    /* =====================================================
       UPDATE
    ===================================================== */

    const updatedFacilities =
      await FacilitiesModel.findByIdAndUpdate(
        id,
        {
          tagline:
            body.tagline.trim(),

          title:
            body.title.trim(),

          image:
            body.image.trim(),

          facilities:
            cleanedFacilities,

          programButtonText:
            typeof body.programButtonText ===
              "string" &&
            body.programButtonText.trim()
              ? body.programButtonText.trim()
              : "View Our Program",

          programButtonLink:
            typeof body.programButtonLink ===
              "string" &&
            body.programButtonLink.trim()
              ? body.programButtonLink.trim()
              : "/programs",

          isActive:
            body.isActive ??
            true,
        },
        {
          new: true,

          runValidators: true,
        }
      );

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (
      !updatedFacilities
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities section not found.",
        },
        404,
        origin
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return jsonResponse(
      {
        success: true,

        message:
          "Facilities section updated successfully.",

        data:
          updatedFacilities,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "UPDATE FACILITIES BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,

        message:
          getErrorMessage(error),

        ...(process.env.NODE_ENV !==
          "production"
          ? {
              error:
                error instanceof Error
                  ? error.stack
                  : String(error),
            }
          : {}),
      },
      500,
      origin
    );
  }
}

// =========================================================
// DELETE
// DELETE /api/facilities/:id
// =========================================================

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const origin =
    request.headers.get(
      "origin"
    );

  try {
    /* =====================================================
       GET ID
    ===================================================== */

    const {
      id,
    } = await params;

    /* =====================================================
       VALIDATE ID
    ===================================================== */

    if (!isValidId(id)) {
      return jsonResponse(
        {
          success: false,

          message:
            "Invalid Facilities ID.",
        },
        400,
        origin
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectToDB();

    /* =====================================================
       DELETE
    ===================================================== */

    const deletedFacilities =
      await FacilitiesModel.findByIdAndDelete(
        id
      );

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (
      !deletedFacilities
    ) {
      return jsonResponse(
        {
          success: false,

          message:
            "Facilities section not found.",
        },
        404,
        origin
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return jsonResponse(
      {
        success: true,

        message:
          "Facilities section deleted successfully.",
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "DELETE FACILITIES BY ID ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,

        message:
          getErrorMessage(error),
      },
      500,
      origin
    );
  }
}