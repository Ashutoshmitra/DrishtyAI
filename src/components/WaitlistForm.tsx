"use client";

import { useState } from "react";

const roles = [
  "HR / Talent Acquisition",
  "Recruiting Agency",
  "Engineering Manager",
  "CTO / VP Engineering",
  "Other",
];

const FREE_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com",
  "live.com", "msn.com", "me.com", "inbox.com", "gmx.com", "rediffmail.com",
]);

function isCompanyEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain && !FREE_DOMAINS.has(domain);
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;

    if (!isCompanyEmail(email)) {
      setEmailError("Sorry, the waitlist is only open for company email addresses");
      return;
    }
    setEmailError("");

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, linkedin }),
      });
      if (!res.ok) throw new Error();
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
        (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("trackCustom", "DrishtyWaitlist", { role });
      }
      setStatus("success");
      setEmail("");
      setRole("");
      setLinkedin("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div id="waitlist" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">You&apos;re on the list</h3>
          <p className="text-gray-500">We&apos;ll reach out soon with early access details.</p>
        </div>
      </div>
    );
  }

  return (
    <section id="waitlist" className="py-24 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-[40px] font-normal text-foreground leading-tight">
            Get early access
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Join the waitlist. We&apos;ll onboard teams in order of signup.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              placeholder="Work email (company domain only)"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors ${emailError ? "border-red-400" : "border-gray-300"}`}
            />
            {emailError && <p className="mt-1.5 text-red-500 text-xs">{emailError}</p>}
          </div>
          <div>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="" disabled>Your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="url"
              placeholder="LinkedIn profile (optional)"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3.5 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Submitting..." : "Join Waitlist"}
          </button>
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
