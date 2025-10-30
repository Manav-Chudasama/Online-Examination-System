"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssignTestsPage() {
  const [saving, setSaving] = useState(false);

  const [testId, setTestId] = useState("");
  const [students, setStudents] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [duration, setDuration] = useState<number>(60);
  const [folder, setFolder] = useState<string>("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">
        Assign Tests
      </h1>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-card border border-border rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Select Test
          </label>
          <select
            required
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          >
            <option value="" disabled>
              Choose test
            </option>
            <option value="math-101">Math 101</option>
            <option value="physics-201">Physics 201</option>
            <option value="chem-301">Chemistry 301</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Students
          </label>
          <select
            multiple
            value={students}
            onChange={(e) =>
              setStudents(Array.from(e.target.selectedOptions, (o) => o.value))
            }
            className="h-28 px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          >
            <option value="s1">Manav</option>
            <option value="s2">Aisha</option>
            <option value="s3">Kabir</option>
            <option value="s4">Jia</option>
          </select>
          <div className="text-xs text-muted-foreground">
            Hold Ctrl/Cmd to select multiple
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Test Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Start Time
          </label>
          <input
            type="time"
            required
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Duration (minutes)
          </label>
          <input
            type="number"
            min={10}
            step={5}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Subject/Test Folder
          </label>
          <input
            placeholder="/subjects/math/term1/algebra"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
          <Button type="submit" className="font-semibold" disabled={saving}>
            {saving ? <span className="animate-pulse">Saving…</span> : "Assign"}
          </Button>
        </div>
      </form>

      <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <div className="mb-2 font-medium text-foreground">
          Recent Assignments
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    </div>
  );
}
