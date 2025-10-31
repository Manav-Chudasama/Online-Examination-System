"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type TestRow = {
  _id: string;
  title: string;
  subject: string;
  durationMinutes?: number;
};

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<TestRow[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/student/assignments/today");
        const data = await r.json();
        if (r.ok) {
          setTests(data.tests || []);
          console.log(data.tests);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-green-700 mb-4">
        Welcome, Student
      </h1>
      <div className="text-lg text-muted-foreground mb-4">
        Organization:{" "}
        <span className="text-green-900 font-semibold">
          EDU-X International
        </span>
      </div>

      <div className="mb-8 flex items-center gap-3 text-base text-green-600">
        <span className="font-semibold">
          Today is: {new Date().toLocaleDateString()}
        </span>
        <span className="ml-3 text-green-800 animate-pulse">●</span>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center justify-center min-h-[200px] bg-muted border border-border rounded-xl">
          Loading tests...
        </div>
      ) : tests.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center min-h-[200px] bg-muted border border-border rounded-xl">
          <div className="text-xl text-muted-foreground font-semibold">
            No Pending Tests
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            All tests completed! Check the Results tab.{" "}
            <span className="inline-block animate-bounce">🎉</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((t) => (
            <div
              key={String(t._id)}
              className="rounded-2xl bg-white border border-border shadow-sm p-6 flex flex-col gap-2 animate-in"
            >
              <div className="font-bold text-lg text-green-800 mb-1">
                {t.title || "Test"}
              </div>
              <div className="text-sm mb-1">
                Subject:{" "}
                <span className="font-medium text-green-600">
                  {t.subject || "-"}
                </span>
              </div>
              <div className="text-sm mb-2">
                Duration: {t.durationMinutes || 60} min
              </div>
              <div className="text-sm mb-2">
                Start Time:{" "}
                {t.startTime ? new Date(t.startTime).toLocaleTimeString() : "-"}
              </div>
              <div className="text-sm mb-2">
                End Time:{" "}
                {t.endTime ? new Date(t.endTime).toLocaleTimeString() : "-"}
              </div>
              <div className="flex items-center gap-4">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href={`/student/test/${t._id}`}>Start Test</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
