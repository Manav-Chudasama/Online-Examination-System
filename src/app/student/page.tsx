import { Button } from "@/components/ui/button";

// Mock: set assignedTests = [] to see empty state
const assignedTests = [
  {
    id: "test1",
    name: "Math 101 Midterm",
    subject: "Mathematics",
    date: "2025-11-01",
    duration: "1h",
    status: "active",
  },
];

export default function StudentDashboard() {
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

      {assignedTests.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center min-h-[200px] bg-muted border border-border rounded-xl">
          <div className="text-xl text-muted-foreground font-semibold">
            No Tests Assigned
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Enjoy your day!{" "}
            <span className="inline-block animate-bounce">🪁</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedTests.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-white border border-border shadow-sm p-6 flex flex-col gap-2 animate-in"
            >
              <div className="font-bold text-lg text-green-800 mb-1">
                {t.name}
              </div>
              <div className="text-sm mb-1">
                Subject:{" "}
                <span className="font-medium text-green-600">{t.subject}</span>
              </div>
              <div className="text-sm mb-2">
                Date: {t.date} <span className="mx-2">|</span> Duration:{" "}
                {t.duration}
              </div>
              <div className="flex items-center gap-4">
                <Button>Start Test</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
