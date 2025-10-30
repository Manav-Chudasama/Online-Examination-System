"use client";
import { Button } from "@/components/ui/button";

function downloadWordTemplate() {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
  <h2>EDU-X Question Template (Word)</h2>
  <p>Use the exact format below per question block. Duplicate blocks for more questions.</p>
  <pre style="font-family: Consolas, monospace;">
Q1. What is 2 + 2?
A) 1
B) 2
C) 3
D) 4
Answer: D

Q2. Capital of France?
A) Berlin
B) Madrid
C) Paris
D) Rome
Answer: C
  </pre>
  </body></html>`;
  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "questions_template.doc";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadPptxTemplateGuide() {
  const text = `EDU-X PPTX Question Template (One question per slide)\n\nFor each slide:\n- Title: Question text (e.g., "What is 2 + 2?")\n- Body: Four bullet points for options in order A, B, C, D\n- Speaker Notes (optional): Add a line like 'Answer: D' to mark the correct option\n\nExample Slide:\nTitle: Capital of France?\nBullets:\n  • Berlin\n  • Madrid\n  • Paris\n  • Rome\nNotes:\n  Answer: C\n`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pptx_questions_template_guide.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function TeacherQuestionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-blue-700 mb-4">
        Upload Questions
      </h1>

      {/* File drag-and-drop area (placeholder for now) */}
      <div className="flex flex-col items-center justify-center gap-3 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl min-h-[180px] cursor-pointer p-6 text-center">
        <div className="text-blue-500 text-lg font-semibold">
          Drag & drop your Word (.docx/.doc) or PowerPoint (.pptx) here or
          <span className="underline ml-1">browse</span>
        </div>
        <div className="text-xs text-blue-700/80">
          Supported formats: Word (.docx/.doc) with blocks, or PPTX (one
          question per slide)
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button size="sm" variant="secondary" onClick={downloadWordTemplate}>
            Download Word Template
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={downloadPptxTemplateGuide}
          >
            Download PPTX Template Guide
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <div className="font-semibold text-blue-700">Recent Uploads</div>
        <ul className="bg-white border border-border rounded-lg shadow px-4 py-3 text-blue-900 text-sm divide-y divide-blue-100">
          <li className="py-2 flex justify-between items-center">
            math_final.docx <span>2025-10-20</span>
          </li>
          <li className="py-2 flex justify-between items-center">
            phy_midterm.pptx <span>2025-10-10</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button>Upload</Button>
      </div>
    </div>
  );
}
