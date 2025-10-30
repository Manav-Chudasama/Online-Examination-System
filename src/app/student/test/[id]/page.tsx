"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  { text: "What is 2 + 2?", options: ["1", "2", "3", "4"], correct: 3 },
  {
    text: "Capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
];

export default function StudentTestPage({
  params,
}: {
  params: { id: string };
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(120); // 2 minutes demo
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timer === 0) {
      handleSubmit(true);
    }
  }, [timer]);

  // Client guards: prevent back navigation, right-click, copy/paste
  useEffect(() => {
    const onPop = () => history.pushState(null, "", location.href);
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", onPop);
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("paste", prevent);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("paste", prevent);
    };
  }, []);

  const nextQuestion = () => {
    setCurrent((i) => i + 1);
    setSelected(null);
  };

  const handleSubmit = (auto = false) => {
    setSubmitting(true);
    setTimeout(() => {
      // Redirect to result mock
      window.location.href = "/student/result/1";
    }, 600);
  };

  const isLast = current === questions.length - 1;

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-green-700 font-semibold">
          Question {current + 1} of {questions.length}
        </div>
        <div className="text-green-700 font-semibold">
          Timer:{" "}
          <span
            className={timer < 10 ? "text-red-600 animate-pulse" : undefined}
          >
            {timer}s
          </span>
        </div>
      </div>
      <div className="text-center w-full text-lg p-4 bg-green-50 rounded-xl border border-green-200 shadow font-semibold">
        {q.text}
      </div>
      <div className="flex flex-col gap-3 w-full mt-1">
        {q.options.map((opt, idx) => (
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
        {!isLast ? (
          <Button disabled={selected === null} onClick={nextQuestion}>
            Next
          </Button>
        ) : (
          <Button
            disabled={selected === null || submitting}
            onClick={() => handleSubmit(false)}
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </Button>
        )}
      </div>
    </div>
  );
}
