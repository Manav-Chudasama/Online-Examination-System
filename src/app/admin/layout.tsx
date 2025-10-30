"use client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HomeIcon, UsersIcon, FolderIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Assign Tests", href: "/admin/assignments", icon: FolderIcon },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        const data = await r.json();
        const role = data?.user?.role;
        if (!role) return router.replace("/login");
        if (role !== "admin" && role !== "superadmin") {
          if (role === "teacher") return router.replace("/teacher");
          return router.replace("/student");
        }
        setReady(true);
      })
      .catch(() => router.replace("/login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="flex flex-col w-20 md:w-64 bg-primary/10 border-r border-border items-center md:items-stretch py-6 gap-4">
        <div className="flex items-center justify-center text-2xl font-bold tracking-wide text-primary-foreground mb-10 select-none">
          <span className="hidden md:inline">
            EDU-<span className="text-red-600">X</span>
          </span>
          <span className="md:hidden">EX</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "group flex items-center gap-2 px-2.5 py-2 md:px-5 md:py-3 rounded-lg transition hover:bg-primary hover:text-primary-foreground text-muted-foreground font-medium"
              )}
            >
              <Icon className="size-6 shrink-0 opacity-80 group-hover:opacity-100" />
              <span className="hidden md:inline">{name}</span>
            </Link>
          ))}
        </nav>
        <div className="flex-0 flex flex-col gap-2 px-2.5 md:px-5 mt-6">
          <Button
            variant="secondary"
            className="w-full"
            size="sm"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.replace("/login");
            }}
          >
            <LogOutIcon className="size-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-background/80 sticky top-0 z-10 backdrop-blur font-sans">
          <span className="text-lg font-semibold text-muted-foreground tracking-tight hidden md:inline">
            Admin Dashboard
          </span>
          <div className="flex items-center gap-3">
            {/* Add theme toggle/profile avatar here later */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-fuchsia-300 flex items-center justify-center font-bold text-primary uppercase border border-border">
              A
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
