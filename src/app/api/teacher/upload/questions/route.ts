import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose-connect";
import Question from "@/models/Question";
import { encryptString } from "@/lib/encryption";
import { getAuthOrThrow } from "@/lib/with-auth";
import Test from "@/models/Test";

export const runtime = "nodejs";

async function readFileToText(
  file: File
): Promise<{ text: string; type: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) {
    return { text: buf.toString("utf8"), type: "txt" };
  }
  if (name.endsWith(".doc")) {
    throw new Error(
      ".doc is not supported. Please save as .docx and try again."
    );
  }
  if (name.endsWith(".docx")) {
    try {
      const mammothMod = (await import("mammoth")) as any;
      const extract =
        mammothMod?.extractRawText || mammothMod?.default?.extractRawText;
      if (typeof extract !== "function")
        throw new Error("mammoth extractRawText not found");
      const res = await extract({ buffer: buf });
      return { text: res?.value || "", type: "word" };
    } catch (e) {
      throw new Error(
        "DOCX parsing not available. Ensure 'mammoth' is installed on the server runtime."
      );
    }
  }
  if (name.endsWith(".pptx")) {
    // PPTX parsing placeholder: upstream parser varies; allow .pptx via guide/template
    return { text: buf.toString("utf8"), type: "powerpoint" };
  }
  throw new Error("Unsupported file type. Please upload .docx, .pptx, or .txt");
}

function parseMcqsFromText(text: string) {
  const out: { question: string; options: string[]; answerIndex: number }[] =
    [];
  const normalized = text.replace(/\u00A0/g, " ").replace(/\r/g, "");
  const re =
    /Q\s*(\d+)\.\s*([\s\S]*?)\n+\s*A\)\s*([\s\S]*?)\n+\s*B\)\s*([\s\S]*?)\n+\s*C\)\s*([\s\S]*?)\n+\s*D\)\s*([\s\S]*?)\n+\s*Answer\s*:\s*([A-D])/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(normalized)) !== null) {
    const q = m[2].trim();
    const opts = [m[3], m[4], m[5], m[6]].map((s) => s.trim());
    const ans = (m[7] || "A").toUpperCase().charCodeAt(0) - 65;
    if (q && opts.every(Boolean))
      out.push({ question: q, options: opts, answerIndex: ans });
  }
  if (out.length > 0) return out;

  // Fallback: block parsing for simpler cases
  const blocks = normalized
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
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
      const mm = ansLine.match(/[A-D]/i);
      if (mm) answerIndex = mm[0].toUpperCase().charCodeAt(0) - 65;
    }
    if (opts.length === 4)
      out.push({ question: qline, options: opts, answerIndex });
  }
  return out;
}

export async function POST(req: NextRequest) {
  const auth = await getAuthOrThrow(["teacher", "admin", "superadmin"]);
  if ("error" in auth) return auth.error;
  await dbConnect();
  const form = await req.formData();
  const file = form.get("file");
  const subject = String(form.get("subject") || "");
  const testId = String(form.get("testId") || "");
  const createdBy = auth.user.id;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  try {
    const { text, type } = await readFileToText(file);
    const parsed = parseMcqsFromText(text);

    if (parsed.length === 0) {
      return NextResponse.json(
        {
          error:
            "No questions detected. Verify the format: Q1., A) .., B) .., C) .., D) .., Answer: X",
        },
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
    } as any;

    await Question.deleteMany({ testId });
    const saved = await Question.create(questionsDoc);
    await Test.findByIdAndUpdate(testId, {
      $set: { totalQuestions: parsed.length, fileType: type },
    });

    return NextResponse.json({ ok: true, count: parsed.length, id: saved._id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 500 }
    );
  }
}
