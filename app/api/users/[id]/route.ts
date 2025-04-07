import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/user";


export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url); 
    const id = url.pathname.split("/").pop(); 

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}