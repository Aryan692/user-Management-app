// app/api/users/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}

export async function PUT(req: Request, { params }: Params) {
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
