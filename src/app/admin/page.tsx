// import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import Chart components (to implement later)

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      {/* Greeting section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-800 via-blue-600 to-fuchsia-400 drop-shadow">
          Let&apos;s Start Your New Course!
        </div>
        {/* Upgrade banner */}
        <div className="flex items-center gap-3 bg-gradient-to-l from-yellow-100 to-yellow-300/40 border border-yellow-300 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-right duration-700 text-zinc-700">
          Buy Premium and Get Access to New Courses
          <button className="ml-4 bg-gradient-to-br from-yellow-400 to-orange-300 text-yellow-950 rounded-xl px-5 py-1.5 font-bold text-xs shadow hover:from-yellow-300 hover:to-orange-200 hover:text-yellow-900 transition focus:outline-none border border-yellow-400 active:scale-[.97]">
            Upgrade Now &rarr;
          </button>
        </div>
      </div>
      {/* Main widget grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="rounded-2xl bg-white border border-border shadow-md p-5 flex flex-col gap-2 transition hover:shadow-xl">
          <div className="font-semibold text-zinc-500 mb-2">Performance</div>
          <div className="h-36 flex items-center">
            {/* Placeholder for chart */}
            <Skeleton className="w-full h-24 rounded-xl bg-primary/20" />
          </div>
          <div className="text-right text-xs text-muted-foreground">
            7 Courses Completed
          </div>
        </div>
        {/* Students Summary */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 border border-blue-200 shadow-md p-5 flex flex-col gap-2">
          <div className="font-semibold text-blue-700 mb-2">
            Students Summary
          </div>
          <div className="h-36 flex items-center justify-center">
            <Skeleton className="w-24 h-24 rounded-full bg-primary/30" />
          </div>
          <div className="text-center text-xl font-bold text-blue-700">
            350{" "}
            <span className="text-xs font-normal text-zinc-500">Excellent</span>
          </div>
        </div>
        {/* Time Spent on Learning */}
        <div className="rounded-2xl bg-white border border-border shadow-md p-5 flex flex-col gap-2 transition hover:shadow-xl">
          <div className="font-semibold text-zinc-500 mb-2 flex justify-between items-center">
            Time Spent on Learning{" "}
            <span className="text-xs text-zinc-400">December</span>
          </div>
          <div className="h-36 flex items-end gap-2">
            <Skeleton className="w-20 h-20 rounded-lg bg-blue-200/40" />
            <Skeleton className="w-8 h-12 rounded-lg bg-blue-200/40" />
            <Skeleton className="w-6 h-28 rounded-lg bg-blue-200/40" />
            <Skeleton className="w-10 h-16 rounded-lg bg-blue-200/40" />
          </div>
          <div className="text-right text-xs text-muted-foreground">
            6 Courses Completed
          </div>
        </div>
      </div>
      {/* Stats widgets row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-xl bg-gradient-to-r from-blue-500/10 via-blue-100 to-blue-300/10 border border-blue-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-blue-800">271</div>
          <div className="uppercase text-xs font-medium text-zinc-500">
            Total Users
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-purple-400/10 via-violet-100 to-blue-100 border border-purple-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-purple-700">33</div>
          <div className="uppercase text-xs font-medium text-zinc-500">
            Teachers
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-fuchsia-300/20 via-pink-100 to-fuchsia-50 border border-pink-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-pink-600">221</div>
          <div className="uppercase text-xs font-medium text-zinc-500">
            Students
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-green-200 via-green-50 to-white border border-green-200 text-center flex flex-col gap-1 py-7 shadow-md">
          <div className="text-3xl font-extrabold text-green-700">78</div>
          <div className="uppercase text-xs font-medium text-zinc-500">
            Total Tests
          </div>
        </div>
      </div>
      {/* Placeholder for daily activity, course list, etc. */}
    </div>
  );
}
