import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf =
      type === "pdf" ||
      file.type === "application/pdf";

    const folder = isPdf
      ? "uamc/notices"
      : "uamc/hero";

    const resourceType = isPdf
      ? "raw"
      : "image";

    const result = await new Promise<any>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              resource_type: resourceType,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      {
        success: true,
        url: result.secure_url,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "File upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}