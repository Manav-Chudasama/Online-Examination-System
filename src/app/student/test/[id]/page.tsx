"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, useParams } from "next/navigation";

export default function StudentTestPage() {
  const router = useRouter();
  const search = useSearchParams();
  const { id: testId } = useParams<{ id: string }>();
  const [index, setIndex] = useState<number>(
    parseInt(search.get("index") || "1")
  );

  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(120);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (i: number) => {
    if (!testId) return;
    try {
      setLoading(true);
      setError(null);
      const r = await fetch(`/api/student/tests/${testId}/question?index=${i}`);
      const data = await r.json();
      if (!r.ok) {
        // Only finalize if we've reached beyond range; otherwise surface error
        if (
          r.status === 404 &&
          (data?.error === "Out of range" || data?.error === "No questions")
        ) {
          await finalize();
        } else if (r.status === 403) {
          setError("You are not assigned to this test.");
        } else {
          setError(data?.error || "Failed to load question.");
        }
        return;
      }
      setQuestion(data.question);
      setOptions(data.options || []);
      setSelected(null);
    } catch (e: any) {
      setError("Network error while loading question.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) load(index);
  }, [index, testId]);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timer === 0) finalize();
  }, [timer]);

  const submitAnswer = async () => {
    if (selected == null || !testId) return;
    setSubmitting(true);
    try {
      await fetch(`/api/student/tests/${testId}/submit-question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionNumber: index,
          chosenOption: selected,
          timeTakenSec: 0,
        }),
      });
      setIndex(index + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const finalize = async () => {
    if (!testId) return;
    setSubmitting(true);
    try {
      const r = await fetch(`/api/student/tests/${testId}/submit-final`, {
        method: "POST",
      });
      const data = await r.json();
      if (r.ok) {
        router.replace(`/student/result/${data.resultId}`);
      } else {
        router.replace(`/student/result/0`);
      }
    } catch {
      router.replace(`/student/result/0`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-green-700 font-semibold">Question {index}</div>
        <div className="text-green-700 font-semibold">
          Timer:{" "}
          <span
            className={timer < 10 ? "text-red-600 animate-pulse" : undefined}
          >
            {timer}s
          </span>
        </div>
      </div>
      {error ? (
        <div className="w-full text-center text-red-600 text-sm">{error}</div>
      ) : null}
      {loading ? (
        <div className="w-full text-center">Loading...</div>
      ) : (
        <>
          <div className="text-center w-full text-lg p-4 bg-green-50 rounded-xl border border-green-200 shadow font-semibold">
            {question}
          </div>
          <div className="flex flex-col gap-3 w-full mt-1">
            {options.map((opt, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-border text-base font-medium shadow cursor-pointer transition ${
                  selected === idx ? "border-green-600 bg-green-50" : ""
                }`}
              >
                <input
                  type="radio"
                  checked={selected === idx}
                  onChange={() => setSelected(idx)}
                  className="accent-green-600"
                />{" "}
                {String.fromCharCode(65 + idx)}. {opt}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2 w-full justify-end">
            <Button
              disabled={selected === null || submitting}
              onClick={submitAnswer}
            >
              Next
            </Button>
            <Button
              variant="secondary"
              disabled={submitting}
              onClick={finalize}
            >
              Submit Test
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
