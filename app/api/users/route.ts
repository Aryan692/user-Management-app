import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

// type Params = {
//   params : {
//     id: string;
//   };
// };

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const user = await User.create(body);
  return NextResponse.json(user);
}

// export async function PUT(req: Request, { params } : Params) {
//   await connectDB();
//   const body = await req.json();
//   const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
//   return NextResponse.json(updatedUser);
// }