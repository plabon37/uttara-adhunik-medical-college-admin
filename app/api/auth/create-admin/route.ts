import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectToDB();

    const existingAdmin = await User.findOne({
      email: "ahmedplabon4@gmail.com",
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("plabon31", 10);

    await User.create({
      name: "Administrator",
      email: "ahmedplabon4@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}