"use client";

import { useReveal } from "@/hooks/useReveal";

export default function Testimonial() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6">
      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <div className="rounded-2xl border border-gray-200 p-10 sm:p-14">
          {/* Company name */}
          <p className="text-xl font-bold text-foreground tracking-tight mb-8">
            Leading IT Staffing Firm
          </p>

          <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-10">
            Our partnership with Drishty AI has enabled us to screen candidates
            with confidence. We caught 34% of candidates using AI assistance in
            technical interviews. The platform paid for itself in the first week
            by dramatically improving our hire quality.
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-300 to-gray-200 flex items-center justify-center text-white text-sm font-semibold">
                PS
              </div>
              <div>
                <p className="font-semibold text-foreground">Priya Sharma</p>
                <p className="text-sm text-gray-500">
                  Head of Talent Acquisition
                </p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
            >
              Read case study
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
