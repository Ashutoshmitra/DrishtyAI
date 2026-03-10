"use client";

import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    title: "Real-time detection",
    description:
      "Identify AI-generated responses as they happen during live video interviews",
  },
  {
    title: "20+ behavioral signals",
    description:
      "Multi-signal analysis combining latency patterns, linguistics, and screen behavior",
  },
  {
    title: "Tamper-proof desktop agent",
    description:
      "Lightweight agent installed on the candidate's machine — runs silently with kernel-level process monitoring",
  },
];

export default function StatsBar() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-[40px] font-normal text-foreground text-center leading-tight mb-20">
          Protecting India&apos;s hiring integrity
        </h2>

        <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left: decorative illustration */}
          <div className="relative flex items-center justify-center">
            <div className="w-[340px] h-[400px] rounded-3xl bg-gradient-to-b from-accent/80 via-accent-light/60 to-blue-200/40 flex items-center justify-center overflow-hidden">
              {/* Decorative shapes like Sarvam's geometric motifs */}
              <div className="relative">
                <div className="w-40 h-40 rounded-2xl bg-white/20 rotate-45 absolute -top-4 left-1/2 -translate-x-1/2" />
                <div className="w-32 h-32 rounded-2xl bg-white/15 rotate-45 absolute top-6 left-1/2 -translate-x-1/2" />
                <div className="w-24 h-24 rounded-2xl bg-white/10 rotate-45 absolute top-14 left-1/2 -translate-x-1/2" />
                {/* Shield icon */}
                <svg className="w-20 h-20 text-white/80 relative z-10 mt-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: pillars */}
          <div className="space-y-10">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="mt-1.5 shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
