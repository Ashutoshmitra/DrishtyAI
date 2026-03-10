import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="hero-gradient pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          India&apos;s first anti-cheating platform for interviews
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-foreground leading-[1.15] tracking-tight">
          Know if your candidate
          <br />
          is using AI to cheat
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Drishty AI sits on the candidate&apos;s computer during interviews and catches
          <br className="hidden sm:block" />
          AI tools like ChatGPT, Copilot, and <span className="text-foreground font-medium">screen-share hacks</span> — in real time.
        </p>

        {/* Inline waitlist form */}
        <WaitlistForm inline />
        <p className="mt-3 text-xs text-gray-400">
          Get 30 days free when we launch. No spam.
        </p>

        {/* Trust logos */}
        <p className="mt-12 text-xs tracking-widest uppercase text-gray-400 font-medium">
          India hires with Drishty AI
        </p>
      </div>
    </section>
  );
}
