
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}

// PUT /api/users/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();

  try {
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

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}
