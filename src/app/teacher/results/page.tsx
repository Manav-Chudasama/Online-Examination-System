"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherResultsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight text-violet-700 mb-4">
        Test Results
      </h1>
      <div className="flex flex-wrap gap-4 items-center">
        <select className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none">
          <option>Select test</option>
          <option>Math Finals</option>
          <option>Physics Midterm</option>
        </select>
        <input
          className="px-3 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-ring outline-none"
          placeholder="Search student"
        />
        <Button className="">Filter</Button>
        <Button variant="secondary" size="sm" className="ml-auto">
          Download Encrypted Excel
        </Button>
      </div>
      <div className="bg-white border border-border rounded-xl shadow p-3 mt-4">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40 text-violet-700 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Total Q</th>
              <th className="text-left px-4 py-2">Correct</th>
              <th className="text-left px-4 py-2">%</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Manav</td>
              <td className="px-4 py-2">S1001</td>
              <td className="px-4 py-2">20</td>
              <td className="px-4 py-2">18</td>
              <td className="px-4 py-2">90%</td>
              <td className="text-right px-4 py-2">
                <Button size="sm">View</Button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Aisha</td>
              <td className="px-4 py-2">S1002</td>
              <td className="px-4 py-2">20</td>
              <td className="px-4 py-2">15</td>
              <td className="px-4 py-2">75%</td>
              <td className="text-right px-4 py-2">
                <Button size="sm">View</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-8 w-36" /> <Skeleton className="h-8 w-36" />
        </div>
      </div>
    </div>
  );
}
