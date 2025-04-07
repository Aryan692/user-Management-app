import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";


export async function GET(_: Request, context: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(context.params.id);
  return NextResponse.json(user);
}