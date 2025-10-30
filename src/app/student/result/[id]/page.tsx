"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function StudentResultPage({
  params,
}: {
  params: { id: string };
}) {
  const resultId = params.id;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const key = `result-viewed-${resultId}`;
    const seen = sessionStorage.getItem(key);
    if (seen) setVisible(false);
  }, [resultId]);

  const close = () => {
    sessionStorage.setItem(`result-viewed-${resultId}`, "1");
    setVisible(false);
  };

  if (!visible) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-lg text-muted-foreground font-semibold">
        <div>Result closed. You can't view it again.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[70vh]">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-8 border border-green-200 animate-in fade-in">
        <div className="text-2xl font-bold text-green-700">Result Summary</div>
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#D1FAE5"
              strokeWidth="16"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#4ade80"
              strokeWidth="16"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - 0.8)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-green-700 animate-in duration-1000">
              80%
            </span>
            <span className="mt-1 text-green-700 text-xs font-medium">
              Score
            </span>
          </div>
        </div>
        <ul className="flex flex-col gap-2 text-green-800 text-lg">
          <li>
            <b>Name:</b> Manav
          </li>
          <li>
            <b>Total Questions:</b> 20
          </li>
          <li>
            <b>Correct:</b> 16
          </li>
          <li>
            <b>Percentage:</b> 80%
          </li>
        </ul>
        <Button
          onClick={close}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-base mt-4 rounded-lg"
        >
          Close Result
        </Button>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Note: You will not be able to see this result again.
      </div>
    </div>
  );
}
