import { Button } from "@/components/ui/button";

const mockTests = [
  { id: "test1", name: "Math 101", subject: "Mathematics", date: "2025-11-01" },
  { id: "test2", name: "Physics 201", subject: "Physics", date: "2025-11-15" },
];

export default function StudentTestsList() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-green-700 mb-4">
        Assigned Tests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="rounded-2xl bg-white border border-border shadow-sm p-6 flex flex-col gap-2"
          >
            <div className="font-bold text-lg text-green-800 mb-1">
              {test.name}
            </div>
            <div className="text-sm mb-1">
              Subject:{" "}
              <span className="font-medium text-green-600">{test.subject}</span>
            </div>
            <div className="text-sm mb-2">Date: {test.date}</div>
            <Button asChild>
              <a href={`/student/test/${test.id}`}>Start Test</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
