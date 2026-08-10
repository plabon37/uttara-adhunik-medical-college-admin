import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  connectToDB,
} from "@/lib/connectToDB";

import {
  PrincipalMessageModel,
} from "@/lib/models/PrincipalMessage";

// =========================================================
// RUNTIME
// =========================================================

export const runtime =
  "nodejs";

// =========================================================
// GET
//
// GET /api/principal-message
//     -> latest Principal Message
//
// GET /api/principal-message?id=xxxxx
//     -> specific Principal Message
// =========================================================

export async function GET(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =======================================================
    // GET ID
    // =======================================================

    const id =
      request.nextUrl.searchParams.get(
        "id"
      );

    // =======================================================
    // FIND DATA
    // =======================================================

    let principalMessage;

    if (id) {
      principalMessage =
        await PrincipalMessageModel
          .findById(id)
          .lean();

      // -----------------------------------------------------
      // SPECIFIC DATA NOT FOUND
      // -----------------------------------------------------

      if (
        !principalMessage
      ) {
        return NextResponse.json(
          {
            success: false,

            message:
              "Principal Message not found.",

            data: null,
          },
          {
            status: 404,
          }
        );
      }
    } else {
      // -----------------------------------------------------
      // LIST PAGE
      // -----------------------------------------------------

      principalMessage =
        await PrincipalMessageModel
          .findOne()
          .sort({
            createdAt: -1,
          })
          .lean();

      // -----------------------------------------------------
      // NO DATA
      //
      // IMPORTANT:
      // This is NOT an API ERROR.
      // The admin page will show Empty component.
      // -----------------------------------------------------

      if (
        !principalMessage
      ) {
        return NextResponse.json(
          {
            success: true,

            message:
              "Principal Message not found.",

            data: null,
          },
          {
            status: 200,
          }
        );
      }
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Principal Message fetched successfully.",

        data: principalMessage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to fetch Principal Message.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// POST
//
// Create Principal Message
// =========================================================

export async function POST(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =======================================================
    // REQUEST BODY
    // =======================================================

    const body =
      await request.json();

    const {
      tagline,
      titlePrefix,
      titleHighlight,
      signatureImage,
      principalName,
      designation,
      heading,
      description,
      principalImage,
      buttonText,
      buttonLink,
      isActive,
    } = body;

    // =======================================================
    // VALIDATION
    // =======================================================

    if (
      !tagline ||
      !titlePrefix ||
      !titleHighlight ||
      !signatureImage ||
      !principalName ||
      !designation ||
      !heading ||
      !description ||
      !principalImage
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Required fields are missing.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // PREVENT DUPLICATE SECTION
    // =======================================================

    const existing =
      await PrincipalMessageModel.findOne();

    if (
      existing
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message already exists. Please edit the existing section.",

          data: existing,
        },
        {
          status: 409,
        }
      );
    }

    // =======================================================
    // CREATE
    // =======================================================

    const principalMessage =
      await PrincipalMessageModel.create(
        {
          tagline:
            String(
              tagline
            ).trim(),

          titlePrefix:
            String(
              titlePrefix
            ).trim(),

          titleHighlight:
            String(
              titleHighlight
            ).trim(),

          signatureImage:
            String(
              signatureImage
            ).trim(),

          principalName:
            String(
              principalName
            ).trim(),

          designation:
            String(
              designation
            ).trim(),

          heading:
            String(
              heading
            ).trim(),

          description:
            String(
              description
            ).trim(),

          principalImage:
            String(
              principalImage
            ).trim(),

          buttonText:
            buttonText
              ? String(
                  buttonText
                ).trim()
              : "Read More",

          buttonLink:
            buttonLink
              ? String(
                  buttonLink
                ).trim()
              : "#",

          isActive:
            typeof isActive ===
            "boolean"
              ? isActive
              : true,
        }
      );

    // =======================================================
    // SUCCESS
    // =======================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Principal Message created successfully.",

        data: principalMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to create Principal Message.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// PUT
//
// Update Principal Message
// =========================================================

export async function PUT(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =======================================================
    // GET ID
    // =======================================================

    const id =
      request.nextUrl.searchParams.get(
        "id"
      );

    if (
      !id
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message ID is required.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // BODY
    // =======================================================

    const body =
      await request.json();

    const {
      tagline,
      titlePrefix,
      titleHighlight,
      signatureImage,
      principalName,
      designation,
      heading,
      description,
      principalImage,
      buttonText,
      buttonLink,
      isActive,
    } = body;

    // =======================================================
    // VALIDATION
    // =======================================================

    if (
      !tagline ||
      !titlePrefix ||
      !titleHighlight ||
      !signatureImage ||
      !principalName ||
      !designation ||
      !heading ||
      !description ||
      !principalImage
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Required fields are missing.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // UPDATE
    // =======================================================

    const updated =
      await PrincipalMessageModel.findByIdAndUpdate(
        id,
        {
          tagline:
            String(
              tagline
            ).trim(),

          titlePrefix:
            String(
              titlePrefix
            ).trim(),

          titleHighlight:
            String(
              titleHighlight
            ).trim(),

          signatureImage:
            String(
              signatureImage
            ).trim(),

          principalName:
            String(
              principalName
            ).trim(),

          designation:
            String(
              designation
            ).trim(),

          heading:
            String(
              heading
            ).trim(),

          description:
            String(
              description
            ).trim(),

          principalImage:
            String(
              principalImage
            ).trim(),

          buttonText:
            buttonText
              ? String(
                  buttonText
                ).trim()
              : "Read More",

          buttonLink:
            buttonLink
              ? String(
                  buttonLink
                ).trim()
              : "#",

          isActive:
            typeof isActive ===
            "boolean"
              ? isActive
              : true,
        },
        {
          new: true,

          runValidators: true,
        }
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (
      !updated
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message not found.",

          data: null,
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
          "Principal Message updated successfully.",

        data: updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to update Principal Message.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// PATCH
//
// Publish / Hide Principal Message
// =========================================================

export async function PATCH(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =======================================================
    // GET ID
    // =======================================================

    const id =
      request.nextUrl.searchParams.get(
        "id"
      );

    if (
      !id
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message ID is required.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // BODY
    // =======================================================

    const body =
      await request.json();

    // =======================================================
    // VALIDATE STATUS
    // =======================================================

    if (
      typeof body.isActive !==
      "boolean"
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "isActive must be a boolean.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // UPDATE STATUS
    // =======================================================

    const updated =
      await PrincipalMessageModel.findByIdAndUpdate(
        id,
        {
          isActive:
            body.isActive,
        },
        {
          new: true,

          runValidators: true,
        }
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (
      !updated
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message not found.",

          data: null,
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
          updated.isActive
            ? "Principal Message published successfully."
            : "Principal Message hidden successfully.",

        data: updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PATCH PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to update Principal Message status.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// DELETE
//
// Delete Principal Message
// =========================================================

export async function DELETE(
  request: NextRequest
) {
  try {
    await connectToDB();

    // =======================================================
    // GET ID
    // =======================================================

    const id =
      request.nextUrl.searchParams.get(
        "id"
      );

    if (
      !id
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message ID is required.",

          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // =======================================================
    // DELETE
    // =======================================================

    const deleted =
      await PrincipalMessageModel.findByIdAndDelete(
        id
      ).lean();

    // =======================================================
    // NOT FOUND
    // =======================================================

    if (
      !deleted
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Principal Message not found.",

          data: null,
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
          "Principal Message deleted successfully.",

        data: deleted,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE PRINCIPAL MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to delete Principal Message.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}