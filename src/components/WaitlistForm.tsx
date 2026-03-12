"use client";

import { useState } from "react";
import posthog from "posthog-js";

export default function WaitlistForm({ inline = false }: { inline?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "", linkedin: "" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
        (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("trackCustom", "DrishtyWaitlist", {});
      }
      posthog.capture("waitlist_signup", { email });
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    if (inline) {
      return (
        <div className="flex items-center gap-2 justify-center mt-8">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <p className="text-foreground font-medium">You&apos;re in! We&apos;ll email you with early access.</p>
        </div>
      );
    }
    return (
      <div id="waitlist" className="py-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">You&apos;re on the list</h3>
          <p className="text-gray-500 text-sm">We&apos;ll reach out soon with early access details.</p>
        </div>
      </div>
    );
  }

  // Inline version — embedded in Hero
  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Get Early Access"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-xs">{errorMsg}</p>
        )}
      </form>
    );
  }

  // Standalone section version
  return (
    <section id="waitlist" className="py-16 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-normal text-foreground leading-tight">
          Get 30 days free when we launch
        </h2>
        <p className="mt-3 text-gray-500">
          Drop your email. We&apos;ll notify you first.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Get Early Access"}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-red-500 text-xs text-center">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
