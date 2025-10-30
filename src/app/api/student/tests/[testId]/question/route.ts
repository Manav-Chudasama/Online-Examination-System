import { NextRequest, NextResponse } from "next/server";
import { getAuthOrThrow } from "@/lib/with-auth";
import dbConnect from "@/lib/mongoose-connect";
import Question from "@/models/Question";
import TestAssignment from "@/models/TestAssignment";
import Test from "@/models/Test";
import { decryptString } from "@/lib/encryption";

export async function GET(
  req: NextRequest,
  { params }: { params: { testId: string } }
) {
  const auth = await getAuthOrThrow("student");
  if ("error" in auth) return auth.error;
  await dbConnect();
  const indexStr = req.nextUrl.searchParams.get("index") || "1";
  const index = Math.max(1, parseInt(indexStr));

  const assignment = await TestAssignment.findOne({
    testId: params.testId,
    studentId: auth.user.id,
  }).lean();
  if (!assignment)
    return NextResponse.json({ error: "Not assigned" }, { status: 403 });

  const test = await Test.findById(params.testId).lean();
  if (!test)
    return NextResponse.json({ error: "Test not found" }, { status: 404 });

  const qs = await Question.findOne({ testId: params.testId }).lean();
  if (!qs) return NextResponse.json({ error: "No questions" }, { status: 404 });

  const sub = qs.questions.find((q: any) => q.questionNumber === index);
  if (!sub)
    return NextResponse.json({ error: "Out of range" }, { status: 404 });

  const payload = {
    questionNumber: sub.questionNumber,
    question: decryptString(sub.encryptedQuestion),
    options: sub.encryptedOptions.map((s: string) => decryptString(s)),
  };
  return NextResponse.json(payload);
}
