"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Coding from "@/LottieFiles/anims/Coding";
import { Toaster } from "@/components/ui/sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: Show toast, redirect, etc.
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-background text-foreground font-sans">
      {/* Left: Lottie + Branding */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-primary dark:bg-sidebar py-16 px-8 animate-in fade-in slide-in-from-left duration-700 min-h-[40vh] md:min-h-0">
        <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4">
          <div className="w-64 md:w-80 lg:w-96">
            <Coding />
          </div>
          <div className="text-xl text-primary-foreground font-semibold tracking-tight mt-4 animate-in fade-in slide-in-from-bottom duration-700 select-none">
            Welcome To
          </div>
          <div className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-400 to-red-500 animate-gradient select-none">
            EDU-<span className="text-red-600">X</span>
          </div>
        </div>
      </div>
      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-background py-16 px-8 animate-in fade-in slide-in-from-right duration-700">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm mx-auto flex flex-col gap-6 animate-fadeInUp"
          style={{ minWidth: 280 }}
        >
          <h2 className="text-2xl md:text-3xl text-center font-bold text-primary mb-2">
            Welcome Back!
          </h2>
          <div className="flex flex-col gap-2 animate-in fade-in duration-700 delay-100">
            <label
              htmlFor="email"
              className="font-medium text-sm ml-1 text-muted-foreground uppercase tracking-wide"
            >
              Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder="kunal@bvp.com"
              autoComplete="username"
              className="px-4 py-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-ring outline-none transition-all text-base"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>
          <div className="flex flex-col gap-2 animate-in fade-in duration-700 delay-150">
            <label
              htmlFor="password"
              className="font-medium text-sm ml-1 text-muted-foreground uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              className="px-4 py-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-ring outline-none transition-all text-base"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontFamily: "var(--font-sans)" }}
            />
            <a
              href="#"
              className="w-fit ml-auto text-xs text-blue-600 hover:underline mt-1 transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <Button
            type="submit"
            className="mt-4 w-full h-12 text-lg font-bold shadow-md transition-all active:scale-[.98] focus:ring-2 focus:ring-ring focus:outline-none"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
