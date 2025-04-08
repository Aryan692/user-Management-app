import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";




type Params = {
  params: {
    id: string;
  };
};


export async function GET(req: NextRequest, { params }: Params) {
  await connectDB();

  const { id } = params;

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


export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();

  const { id } = params;
  const body = await req.json();

  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();

  const { id } = params;

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
