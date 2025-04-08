import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/user";



type Params = {
  params: {
    id: string;
  };
};


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

//


export async function DELETE(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }:  Params) {
  await connectDB();
  const body = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    {
      name: body.name,
      email: body.email,
      phone: body.phone,
    },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(updatedUser);
}