import { NextRequest, NextResponse } from "next/server";
import TestAssignment from "@/models/TestAssignment";
import dbConnect from "@/lib/mongoose-connect";
import { getAuthOrThrow } from "@/lib/with-auth";

export async function GET(req: NextRequest) {
  const auth = await getAuthOrThrow("admin");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const assignments = await TestAssignment.find({}).lean();
  return NextResponse.json(assignments);
}

export async function POST(req: NextRequest) {
  const auth = await getAuthOrThrow("admin");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const body = await req.json();
  const assignment = await TestAssignment.create(body);
  return NextResponse.json(assignment);
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuthOrThrow("admin");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const { id, ...fields } = await req.json();
  const assignment = await TestAssignment.findByIdAndUpdate(id, fields, {
    new: true,
  });
  return NextResponse.json(assignment);
}

export async function DELETE(req: NextRequest) {
  const auth = await getAuthOrThrow("admin");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const { id } = await req.json();
  const assignment = await TestAssignment.findByIdAndDelete(id);
  return NextResponse.json({ success: !!assignment });
}
