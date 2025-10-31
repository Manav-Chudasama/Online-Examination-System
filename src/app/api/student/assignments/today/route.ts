import { NextResponse } from "next/server";
import { getAuthOrThrow } from "@/lib/with-auth";
import dbConnect from "@/lib/mongoose-connect";
import Test from "@/models/Test";
import Result from "@/models/Result";

export async function GET() {
  const auth = await getAuthOrThrow("student");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // Get all tests assigned to the student for today
  const tests = await Test.find({
    assignedStudents: auth.user.id,
    testDate: { $gte: start, $lte: end },
  })
    .select("title subject durationMinutes startTime endTime")
    .lean();

  // Get all completed tests (where result exists and testCompleted is true)
  const completedResults = await Result.find({
    student: auth.user.id,
    testCompleted: true,
  })
    .select("test")
    .lean();

  const completedTestIds = completedResults.map((r) => String(r.test));

  // Filter out completed tests
  const pendingTests = tests.filter(
    (t) => !completedTestIds.includes(String(t._id))
  );

  return NextResponse.json({ tests: pendingTests });
}
