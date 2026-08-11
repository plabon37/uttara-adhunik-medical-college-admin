import { NextRequest, NextResponse } from "next/server";

import {connectToDB} from "@/lib/connectToDB";
import NewsletterSubscriber from "@/lib/models/NewsletterSubscriber";

// =========================================================
// CORS
// =========================================================

function getAllowedOrigin(
  request: NextRequest
) {
  const origin =
    request.headers.get("origin");

  const allowedOrigins =
    [
      process.env.NEXT_PUBLIC_CLIENT_URL,
      process.env.CLIENT_URL,
    ].filter(
      (
        value
      ): value is string =>
        Boolean(value)
    );

  // -------------------------------------------------------
  // If request has an origin and it is configured,
  // return that origin.
  // -------------------------------------------------------

  if (
    origin &&
    allowedOrigins.includes(origin)
  ) {
    return origin;
  }

  // -------------------------------------------------------
  // Development fallback
  // -------------------------------------------------------

  if (
    origin &&
    (
      origin.startsWith(
        "http://localhost:"
      ) ||
      origin.startsWith(
        "http://127.0.0.1:"
      )
    )
  ) {
    return origin;
  }

  // -------------------------------------------------------
  // No origin / server-to-server request
  // -------------------------------------------------------

  return "";
}

// =========================================================
// CORS HEADERS
// =========================================================

function corsHeaders(
  request: NextRequest
) {
  const origin =
    getAllowedOrigin(request);

  const headers =
    new Headers();

  if (origin) {
    headers.set(
      "Access-Control-Allow-Origin",
      origin
    );
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept"
  );

  headers.set(
    "Access-Control-Max-Age",
    "86400"
  );

  return headers;
}

// =========================================================
// OPTIONS
// BROWSER CORS PREFLIGHT
// =========================================================

export async function OPTIONS(
  request: NextRequest
) {
  return new NextResponse(
    null,
    {
      status: 204,
      headers:
        corsHeaders(request),
    }
  );
}

// =========================================================
// EMAIL VALIDATION
// =========================================================

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =========================================================
// POST
// CLIENT → ADMIN API → MONGODB
// =========================================================

export async function POST(
  request: NextRequest
) {
  const headers =
    corsHeaders(request);

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // BODY
    // =====================================================

    const body =
      await request.json();

    const email =
      typeof body?.email ===
      "string"
        ? body.email
            .trim()
            .toLowerCase()
        : "";

    // =====================================================
    // REQUIRED
    // =====================================================

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email address is required.",
        },
        {
          status: 400,
          headers,
        }
      );
    }

    // =====================================================
    // EMAIL FORMAT
    // =====================================================

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
          headers,
        }
      );
    }

    // =====================================================
    // DUPLICATE CHECK
    // =====================================================

    const existingSubscriber =
      await NewsletterSubscriber.findOne({
        email,
      });

    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This email is already subscribed.",
        },
        {
          status: 409,
          headers,
        }
      );
    }

    // =====================================================
    // CREATE
    // =====================================================

    const subscriber =
      await NewsletterSubscriber.create({
        email,
      });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Successfully subscribed to the newsletter.",

        data: {
          _id: subscriber._id,
          email: subscriber.email,
          createdAt:
            subscriber.createdAt,
        },
      },
      {
        status: 201,
        headers,
      }
    );
  } catch (error: unknown) {
    // =====================================================
    // DUPLICATE KEY SAFETY
    // =====================================================

    if (
      typeof error ===
        "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number })
        .code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This email is already subscribed.",
        },
        {
          status: 409,
          headers,
        }
      );
    }

    // =====================================================
    // SERVER ERROR
    // =====================================================

    console.error(
      "NEWSLETTER POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while subscribing.",
      },
      {
        status: 500,
        headers,
      }
    );
  }
}

// =========================================================
// GET
// ADMIN PANEL → MONGODB
// =========================================================

export async function GET(
  request: NextRequest
) {
  const headers =
    corsHeaders(request);

  try {
    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDB();

    // =====================================================
    // FETCH
    // =====================================================

    const subscribers =
      await NewsletterSubscriber.find({})
        .sort({
          createdAt: -1,
        })
        .lean();

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        data: subscribers,
      },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(
      "NEWSLETTER GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch newsletter subscribers.",
      },
      {
        status: 500,
        headers,
      }
    );
  }
}