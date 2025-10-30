import { NextRequest, NextResponse } from "next/server";
import { getAuthOrThrow } from "@/lib/with-auth";
import dbConnect from "@/lib/mongoose-connect";
import Result from "@/models/Result";
import Question from "@/models/Question";

export async function POST(
  req: NextRequest,
  { params }: { params: { testId: string } }
) {
  const auth = await getAuthOrThrow("student");
  if ("error" in auth) return auth.error;
  await dbConnect();

  const resDoc = await Result.findOne({
    student: auth.user.id,
    test: params.testId,
  });
  if (!resDoc)
    return NextResponse.json({ error: "No answers" }, { status: 400 });

  const qs = await Question.findOne({ testId: params.testId }).lean();
  if (!qs) return NextResponse.json({ error: "No questions" }, { status: 400 });

  let correct = 0;
  for (const ans of resDoc.answers as any[]) {
    const sub = qs.questions.find(
      (q: any) => q.questionNumber === ans.questionNumber
    );
    if (sub && ans.chosenOption === sub.correctAnswerIndex) correct++;
    ans.isCorrect = sub ? ans.chosenOption === sub.correctAnswerIndex : false;
  }
  resDoc.correctAnswers = correct;
  resDoc.totalQuestions = qs.questions.length;
  resDoc.percentage = resDoc.totalQuestions
    ? Math.round((correct / resDoc.totalQuestions) * 100)
    : 0;
  resDoc.testCompleted = true;
  await resDoc.save();

  return NextResponse.json({
    ok: true,
    resultId: resDoc._id,
    percentage: resDoc.percentage,
  });
}
