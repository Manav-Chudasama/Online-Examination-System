import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose-connect";
import Question from "@/models/Question";
import { encryptString } from "@/lib/encryption";

async function readFileToText(
  file: File
): Promise<{ text: string; type: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) {
    return { text: buf.toString("utf8"), type: "txt" };
  }
  if (name.endsWith(".docx")) {
    try {
      const mammoth = await import("mammoth");
      const res = await mammoth.extractRawText({ buffer: buf });
      return { text: res.value || "", type: "docx" };
    } catch (e) {
      throw new Error("DOCX parsing not available. Please install 'mammoth'.");
    }
  }
  if (name.endsWith(".pptx")) {
    try {
      const { default: PptxReader } = await import("pptx-parser" as any);
      const reader = new (PptxReader as any)();
      const slides = await reader.read(buf);
      const texts: string[] = [];
      for (const slide of slides) {
        if (slide.text) texts.push(slide.text);
      }
      return { text: texts.join("\n\n"), type: "pptx" };
    } catch (e) {
      throw new Error(
        "PPTX parsing not available. Please install a pptx parser."
      );
    }
  }
  throw new Error("Unsupported file type. Please upload .docx, .pptx, or .txt");
}

// Very simple MCQ parser supporting formats like:
// Q1. Question text\nA) ...\nB) ...\nC) ...\nD) ...\nAnswer: C
function parseMcqsFromText(text: string) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const questions: {
    question: string;
    options: string[];
    answerIndex: number;
  }[] = [];
  for (const block of blocks) {
    const lines = block
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 5) continue;
    const qline = lines[0].replace(/^Q\d+\.?\s*/i, "");
    const opts: string[] = [];
    for (let i = 1; i <= 4 && i < lines.length; i++) {
      opts.push(lines[i].replace(/^[A-D][\)\.\-]\s*/, ""));
    }
    const ansLine = lines.find((l) => /^answer\s*:/i.test(l));
    let answerIndex = 0;
    if (ansLine) {
      const m = ansLine.match(/[A-D]/i);
      if (m) answerIndex = m[0].toUpperCase().charCodeAt(0) - 65;
    }
    if (opts.length === 4)
      questions.push({ question: qline, options: opts, answerIndex });
  }
  return questions;
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const form = await req.formData();
  const file = form.get("file");
  const subject = String(form.get("subject") || "");
  const testId = String(form.get("testId") || "");
  const createdBy = String(form.get("createdBy") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  try {
    const { text, type } = await readFileToText(file);
    const parsed = parseMcqsFromText(text);

    if (parsed.length === 0) {
      return NextResponse.json(
        { error: "No questions detected" },
        { status: 400 }
      );
    }

    const questionsDoc = {
      testId,
      subject,
      createdBy,
      uploadedFileName: (file as File).name,
      uploadedAt: new Date(),
      fileType: type as any,
      questions: parsed.map((q, idx) => ({
        questionNumber: idx + 1,
        encryptedQuestion: encryptString(q.question),
        encryptedOptions: q.options.map(encryptString),
        correctAnswerIndex: q.answerIndex,
      })),
    };

    const saved = await Question.create(questionsDoc as any);
    return NextResponse.json({ ok: true, count: parsed.length, id: saved._id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 500 }
    );
  }
}
