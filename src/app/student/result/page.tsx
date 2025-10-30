import { Button } from "@/components/ui/button";

const results = [
  { id: "1", name: "Math 101 Midterm", status: "viewable" },
  { id: "2", name: "Physics 201", status: "closed" },
];

export default function StudentResultsList() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-green-700 mb-4">
        Results
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((res) => (
          <div
            key={res.id}
            className={`rounded-2xl bg-white border border-border shadow-sm p-6 flex flex-col gap-2 ${
              res.status === "closed" ? "opacity-60" : ""
            }`}
          >
            <div className="font-bold text-lg text-green-800 mb-1">
              {res.name}
            </div>
            <div className="text-sm mb-2">
              Status:{" "}
              <span
                className={
                  res.status === "viewable"
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                {res.status === "viewable" ? "Ready to View" : "Closed"}
              </span>
            </div>
            {res.status === "viewable" ? (
              <Button asChild>
                <a href={`/student/result/${res.id}`}>View Result</a>
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Result Closed
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
