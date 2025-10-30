import { NextResponse } from "next/server";
import { getAuthOrThrow } from "@/lib/with-auth";
import dbConnect from "@/lib/mongoose-connect";
import TestAssignment from "@/models/TestAssignment";
import Test from "@/models/Test";

export async function GET() {
  const auth = await getAuthOrThrow("student");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const list = await TestAssignment.find({
    studentId: auth.user.id,
    testDate: { $gte: start, $lte: end },
  }).lean();
  const testIds = list.map((a) => a.testId);
  const tests = await Test.find({ _id: { $in: testIds } }).lean();
  return NextResponse.json({ assignments: list, tests });
}
