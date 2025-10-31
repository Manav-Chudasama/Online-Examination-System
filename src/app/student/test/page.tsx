"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function StudentTestsList() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/student/assignments/today");
        const data = await r.json();
        if (r.ok) setTests(data.tests || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-green-700 mb-4">
        Assigned Tests
      </h1>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No tests for today.
            </div>
          ) : (
            tests.map((t: any) => (
              <div
                key={String(t._id)}
                className="rounded-2xl bg-white border border-border shadow-sm p-6 flex flex-col gap-2"
              >
                <div className="font-bold text-lg text-green-800 mb-1">
                  {t.title}
                </div>
                <div className="text-sm mb-1">
                  Subject:{" "}
                  <span className="font-medium text-green-600">
                    {t.subject}
                  </span>
                </div>
                <div className="text-sm mb-2">
                  Date:{" "}
                  {t.testDate ? new Date(t.testDate).toLocaleDateString() : "-"}
                </div>
                <Button asChild>
                  <a href={`/student/test/${String(t._id)}`}>Start Test</a>
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
