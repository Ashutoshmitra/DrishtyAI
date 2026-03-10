export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20 text-center">
          {/* Gradient background like Sarvam's CTA band */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-blue-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-blue-500/10" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-[40px] font-normal text-white leading-tight">
              Build the future of
              <br />
              trustworthy hiring with Drishty.
            </h2>
            <a
              href="#pricing"
              className="mt-8 inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
