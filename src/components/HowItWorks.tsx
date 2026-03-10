"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    title: "Connect Your Platform",
    description:
      "Integrate with your interview tool in under 5 minutes. Works with Zoom, Meet, and Teams.",
    gradient: "from-purple-400 via-violet-300 to-blue-200",
    icon: (
      <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Conduct Interviews Normally",
    description:
      "Drishty AI monitors silently in the background. Zero disruption to the candidate experience.",
    gradient: "from-red-400 via-orange-300 to-amber-200",
    icon: (
      <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Get Integrity Reports",
    description:
      "Receive detailed analysis with trust scores, flagged moments, and actionable insights after every interview.",
    gradient: "from-green-400 via-emerald-300 to-teal-200",
    icon: (
      <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useReveal();

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-[40px] font-normal text-foreground text-center leading-tight mb-6">
          Built to run anywhere
          <br />
          your team interviews
        </h2>
        <p className="text-center text-gray-500 text-lg mb-16">
          Simple setup. Powerful detection. Zero friction.
        </p>

        <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
            >
              {/* App-icon style illustration */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${s.gradient} flex items-center justify-center mb-6`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
