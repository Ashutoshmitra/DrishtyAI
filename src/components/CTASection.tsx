import WaitlistForm from "./WaitlistForm";

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
              Stop hiring AI.
              <br />
              Start hiring talent.
            </h2>
            <p className="mt-4 text-gray-400 text-sm">
              Get 30 days free when we launch.
            </p>
            <div className="[&_input]:border-gray-600 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-gray-400">
              <WaitlistForm inline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
