export default function Hero() {
  return (
    <section className="hero-gradient pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          AI Interview Integrity Platform
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-foreground leading-[1.15] tracking-tight">
          Detect AI cheating
          <br />
          in interviews
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Invisible desktop agent. Real-time voice forensics. 200+ AI tool signatures.
          <br className="hidden sm:block" />
          The most advanced interview integrity platform, built in India.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-foreground rounded-full hover:bg-gray-800 transition-colors"
          >
            Start Free Trial
          </a>
        </div>

        {/* Trust logos */}
        <p className="mt-16 text-xs tracking-widest uppercase text-gray-400 font-medium">
          India hires with Drishty
        </p>
      </div>
    </section>
  );
}
