import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/lib/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    console.log("========== LOGIN START ==========");

    await connectToDB();
    console.log("✅ Database Connected");

    const { email, password } = await req.json();

    console.log("Email:", email);

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    console.log("Token Generated");

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    console.log("========== LOGIN SUCCESS ==========");

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: String(error),
      },
      { status: 500 }
    );
  }
}