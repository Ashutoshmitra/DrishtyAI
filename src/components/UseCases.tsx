"use client";

import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "38%", label: "of candidates use AI tools in interviews" },
  { value: "61%", label: "of AI cheaters pass interview thresholds" },
  { value: "3x", label: "increase in AI cheating since 2025" },
];

export default function UseCases() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6">
      <div ref={ref} className="reveal max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-[40px] font-normal text-foreground leading-tight mb-4">
          Enterprise-grade security.
          <br />
          Built in from day one.
        </h2>
        <p className="text-gray-500 text-lg mb-16 max-w-xl mx-auto">
          Based on analysis of 19,000+ interviews
        </p>

        {/* Stats circles — like Sarvam's security badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-20">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-b from-blue-100 via-blue-50 to-white flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-foreground">
                  {s.value}
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-[160px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
