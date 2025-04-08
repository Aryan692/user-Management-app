import { connectDB } from "@/lib/db";
import { User } from "@/models/user";


import { NextResponse } from "next/server";

// GET single user
export async function GET(req: Request, context: { params: { id: string } }) {
  await connectDB();

  const { id } = await context.params; // ✅ FIXED HERE

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// UPDATE user
export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();

  const { id } = await context.params; // ✅ FIXED HERE
  const body = await req.json();

  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req: Request, context: { params: { id: string } }) {
  await connectDB();

  const { id } = await context.params; // ✅ FIXED HERE

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
