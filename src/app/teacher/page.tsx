export default function TeacherDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-blue-700 mb-4">
        Teacher Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-xl bg-gradient-to-br from-blue-300 to-blue-50 border border-blue-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-blue-900">4</div>
          <div className="uppercase text-xs font-medium text-blue-700">
            Subjects
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-green-300 to-green-50 border border-green-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-green-900">8</div>
          <div className="uppercase text-xs font-medium text-green-700">
            Tests Created
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-fuchsia-300 to-fuchsia-50 border border-fuchsia-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-fuchsia-900">42</div>
          <div className="uppercase text-xs font-medium text-fuchsia-700">
            Students Assigned
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-300 to-violet-50 border border-violet-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-violet-900">87%</div>
          <div className="uppercase text-xs font-medium text-violet-700">
            Avg. Result
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white border border-border shadow-md p-6 flex flex-col gap-4">
          <div className="font-semibold text-blue-700 mb-2">Recent Tests</div>
          <ul className="text-sm text-blue-900 space-y-3">
            <li>Math Finals (2025-10-20) - 20 students assigned</li>
            <li>Physics Midterm (2025-10-10) - 12 students assigned</li>
            <li>Chemistry MCQ (2025-09-25) - 24 students assigned</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white border border-border shadow-md p-6 flex flex-col gap-4">
          <div className="font-semibold text-blue-700 mb-2">Quick Actions</div>
          <div className="flex flex-col gap-3">
            <a
              href="/teacher/questions"
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium shadow border border-blue-200/50 hover:bg-blue-200 transition"
            >
              Upload Questions
            </a>
            <a
              href="/teacher/terms"
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium shadow border border-green-200/50 hover:bg-green-200 transition"
            >
              Edit Terms
            </a>
            <a
              href="/teacher/answers"
              className="bg-fuchsia-100 text-fuchsia-700 px-4 py-2 rounded-lg font-medium shadow border border-fuchsia-200/50 hover:bg-fuchsia-200 transition"
            >
              Upload Answers
            </a>
            <a
              href="/teacher/results"
              className="bg-violet-100 text-violet-700 px-4 py-2 rounded-lg font-medium shadow border border-violet-200/50 hover:bg-violet-200 transition"
            >
              View Results
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
