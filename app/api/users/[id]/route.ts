import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

interface Params {
  params: {
    id: string;
  };
}

// GET /api/users/:id
export async function GET({ params }: Params) {
  await connectDB();
  const { id } = params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}

// DELETE /api/users/:id
export async function DELETE(  { params }: Params) {
  await connectDB();
  const { id } = params;

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}

// PUT /api/users/:id
export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  const { id } = params;
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
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}
