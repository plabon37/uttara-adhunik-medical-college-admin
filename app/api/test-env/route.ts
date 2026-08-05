import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    jwt: process.env.JWT_SECRET,
    mongodb: !!process.env.MONGODB_URI,
  });
}