"use client";
import { Button } from "@/components/ui/button";

export default function TeacherQuestionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-blue-700 mb-4">
        Upload Questions
      </h1>

      {/* File drag-and-drop area (placeholder for now) */}
      <div className="flex items-center justify-center bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl min-h-[180px] cursor-pointer">
        <div className="text-blue-500 text-lg font-semibold">
          Drag & drop your Word or PowerPoint file here or
          <span className="underline ml-1">browse</span>
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
