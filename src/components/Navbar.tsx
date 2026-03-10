"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "PLATFORM", href: "#features" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "COMPANY", href: "#resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-foreground text-white text-center py-2.5 px-4 text-sm relative z-50">
        <span className="inline-flex items-center gap-2">
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            New
          </span>
          <span className="text-gray-300">
            Now detecting 15+ AI interview tools including ChatGPT Voice Mode
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>

      {/* Main Nav */}
      <nav
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="#" className="inline-flex items-center gap-2">
            <span className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-hindi), serif" }}>दृष्टि</span>
            <span className="text-base font-medium text-gray-500">AI</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-xs font-medium tracking-widest text-gray-600 hover:text-foreground transition-colors"
              >
                {link.label}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors"
            >
              Join Waitlist
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-foreground border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Talk to Sales
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-medium tracking-widest text-gray-600 hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-2.5 text-sm font-medium text-white bg-foreground rounded-full"
              >
                Join Waitlist
              </a>
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-2.5 text-sm font-medium text-foreground border border-gray-300 rounded-full"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
