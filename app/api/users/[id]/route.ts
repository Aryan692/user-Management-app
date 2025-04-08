// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

// GET user by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  const { id } = context.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
  }
}

// DELETE user by ID
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  const { id } = context.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}

// PUT (update) user by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  const { id } = context.params;
  const body = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
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

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}
