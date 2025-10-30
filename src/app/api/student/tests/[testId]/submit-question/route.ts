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
  const { questionNumber, chosenOption, timeTakenSec } = await req.json();

  let resDoc = await Result.findOne({
    student: auth.user.id,
    test: params.testId,
  });
  if (!resDoc) {
    const qs = await Question.findOne({ testId: params.testId }).lean();
    const totalQuestions = qs ? qs.questions.length : 0;
    resDoc = await Result.create({
      student: auth.user.id,
      test: params.testId,
      totalQuestions,
      correctAnswers: 0,
      percentage: 0,
      answers: [],
    });
  }

  const answers = resDoc.answers as any[];
  const existing = answers.find((a) => a.questionNumber === questionNumber);
  if (existing) {
    existing.chosenOption = chosenOption;
    existing.timeTakenSec = timeTakenSec;
  } else {
    answers.push({ questionNumber, chosenOption, timeTakenSec });
  }
  await resDoc.save();
  return NextResponse.json({ ok: true, id: resDoc._id });
}
