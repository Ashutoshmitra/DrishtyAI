"use client";

import { useEffect, useRef, useState } from "react";

const tabs = ["FOR HR TEAMS", "FOR STAFFING FIRMS", "FOR RECRUITERS"];

const features = [
  {
    title: "Real-Time Detection",
    description:
      "Identifies AI-generated responses instantly as candidates speak during live interviews.",
    gradient: "from-orange-400 via-amber-400 to-yellow-300",
    icon: (
      <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Copilot Fingerprinting",
    description:
      "Detects known tools like Cluely, FinalRound AI, Interview Coder, Parakeet, and ChatGPT voice mode.",
    gradient: "from-violet-400 via-purple-300 to-blue-200",
    pills: ["Cluely", "FinalRound", "Parakeet", "ChatGPT", "Interview Coder"],
    icon: (
      <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a48.667 48.667 0 00-1.377 8.27M12 3v1.5M12 15v1.5m0-9a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
  {
    title: "Detailed Trust Reports",
    description:
      "Get confidence scores, flagged responses, and specific indicators for every interview.",
    gradient: "from-emerald-400 via-teal-300 to-cyan-200",
    icon: (
      <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = section.offsetTop;
      const scrollY = window.scrollY;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far we've scrolled into the section (relative to section start)
      const scrollIntoSection = scrollY - sectionTop;
      // Total scrollable distance within the pinned area
      // Section height minus one viewport (the pinned viewport)
      const scrollableDistance = sectionHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      // Progress 0 to 1 through the section
      const progress = Math.max(0, Math.min(1, scrollIntoSection / scrollableDistance));

      // Map progress to feature index
      const index = Math.min(features.length - 1, Math.floor(progress * features.length));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = features[activeIndex];

  return (
    <section
      id="features"
      ref={sectionRef}
      // Height = 1 viewport for the pinned view + (N features * 100vh) for scroll distance
      style={{ height: `${(features.length + 1) * 100}vh` }}
      className="relative"
    >
      {/* Sticky container — stays pinned while we scroll through the section */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Tab row */}
          <div className="flex items-center justify-center gap-3 text-xs tracking-widest text-gray-400 font-medium mb-6">
            {tabs.map((tab, i) => (
              <span key={tab} className="flex items-center gap-3">
                {i > 0 && <span className="text-gray-300">|</span>}
                <span className={i === 0 ? "text-foreground" : ""}>{tab}</span>
              </span>
            ))}
          </div>

          <h2 className="text-3xl sm:text-[40px] font-normal text-foreground text-center leading-tight mb-16">
            India&apos;s Full-stack Interview
            <br />
            Integrity Platform
          </h2>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-12">
            {features.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-foreground w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Feature card — crossfade between them */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-center">
            {/* Left: gradient illustration */}
            <div className="relative flex items-center justify-center">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`w-full aspect-square max-w-[440px] rounded-3xl bg-gradient-to-b ${f.gradient} flex items-center justify-center overflow-hidden transition-all duration-500 ${
                    i === activeIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 absolute inset-0 m-auto"
                  }`}
                >
                  <div className="relative">
                    <div className="w-36 h-36 rounded-2xl bg-white/20 rotate-45 absolute -top-2 left-1/2 -translate-x-1/2" />
                    <div className="w-28 h-28 rounded-2xl bg-white/15 rotate-45 absolute top-6 left-1/2 -translate-x-1/2" />
                    <div className="relative z-10 mt-10">{f.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: text content */}
            <div className="relative min-h-[200px]">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`transition-all duration-500 ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed mb-6">
                    {f.description}
                  </p>
                  {f.pills && (
                    <div className="flex flex-wrap gap-2">
                      {f.pills.map((pill) => (
                        <span
                          key={pill}
                          className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
