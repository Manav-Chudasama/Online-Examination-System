"use client";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HomeIcon, ClockIcon, AwardIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Dashboard", href: "/student", icon: HomeIcon },
  { name: "Tests", href: "/student/test", icon: ClockIcon },
  { name: "Results", href: "/student/result", icon: AwardIcon },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        const data = await r.json();
        const role = data?.user?.role;
        if (!role) return router.replace("/login");
        if (role !== "student") {
          if (role === "admin" || role === "superadmin")
            return router.replace("/admin");
          if (role === "teacher") return router.replace("/teacher");
        }
        setReady(true);
      })
      .catch(() => router.replace("/login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="flex flex-col w-20 md:w-56 bg-green-100 border-r border-border items-center md:items-stretch py-6 gap-4">
        <div className="flex items-center justify-center text-2xl font-bold tracking-wide text-green-700 mb-10 select-none">
          <span className="hidden md:inline">STUDENT</span>
          <span className="md:hidden">STU</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "group flex items-center gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg transition hover:bg-green-200 hover:text-green-900 text-green-700 font-medium"
              )}
            >
              {" "}
              <Icon className="size-6 shrink-0 opacity-80 group-hover:opacity-100" />{" "}
              <span className="hidden md:inline">{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-background sticky top-0 z-10 font-sans">
          <span className="text-lg font-semibold text-green-700 tracking-tight hidden md:inline">
            Student Panel
          </span>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-yellow-300 flex items-center justify-center font-bold text-primary uppercase border border-border">
              S
            </div>
          </div>
        </header>
        <main className="flex-1 px-2 md:px-8 py-8 bg-background font-sans animate-fadeInUp">
          {children}
        </main>
      </div>
    </div>
  );
}
