// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { type NextApiResponse } from "next";


type Context = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: Context) {
  await connectDB();
  const { id } = context.params;

  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest, context: Context) {
  await connectDB();
  const { id } = context.params;

  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}

export async function PUT(req: NextRequest, context: Context) {
  await connectDB();
  const { id } = context.params;
  const body = await req.json();

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

  return NextResponse.json(updatedUser);
}
