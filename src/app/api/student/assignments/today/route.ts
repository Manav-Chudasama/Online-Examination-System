import { NextResponse } from "next/server";
import { getAuthOrThrow } from "@/lib/with-auth";
import dbConnect from "@/lib/mongoose-connect";
import Test from "@/models/Test";

export async function GET() {
  const auth = await getAuthOrThrow("student");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const tests = await Test.find({
    assignedStudents: auth.user.id,
    testDate: { $gte: start, $lte: end },
  })
    .select("title subject durationMinutes startTime endTime")
    .lean();

  return NextResponse.json({ tests });
}
