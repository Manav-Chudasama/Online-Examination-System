import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose-connect";
import Test from "@/models/Test";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { testId, terms } = await req.json();
  if (!Array.isArray(terms) || terms.length === 0 || terms.length > 10) {
    return NextResponse.json(
      { error: "terms must be 1-10 items" },
      { status: 400 }
    );
  }
  const doc = await Test.findByIdAndUpdate(
    testId,
    { $set: { termsAndConditions: terms } },
    { new: true }
  );
  return NextResponse.json({ ok: true, id: doc?._id });
}
