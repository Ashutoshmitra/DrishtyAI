"use client";

import { useReveal } from "@/hooks/useReveal";

const analysisLayers = [
  {
    name: "Spectral Coherence Analysis",
    description:
      "Compares the mel-frequency cepstral coefficients (MFCCs) of the candidate's baseline voice against real-time responses. AI-generated speech shows unnaturally smooth spectral transitions and lacks the micro-variations present in genuine human speech.",
    metric: "MFCC variance delta",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    name: "Response Latency Mapping",
    description:
      "Human cognition produces predictable response timing patterns — complex questions elicit longer pauses, simple questions trigger faster answers. AI-assisted candidates show flattened latency curves as they wait for copilot output regardless of question complexity.",
    metric: "Latency variance coefficient",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Prosodic Pattern Detection",
    description:
      "Analyzes pitch contour, stress patterns, and speech rhythm (F0 trajectory analysis). Candidates reading AI-generated answers exhibit a distinctive 'reading cadence' — monotonic pitch, uniform stress, and missing hesitation markers (um, uh, well).",
    metric: "F0 trajectory + jitter analysis",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
  {
    name: "Linguistic Complexity Scoring",
    description:
      "Real-time NLP analysis on transcribed speech using our fine-tuned language model. Flags responses with unnaturally high Flesch-Kincaid scores, excessive use of hedging phrases ('It\'s important to note that...'), and vocabulary distributions that deviate from the candidate's established baseline.",
    metric: "Perplexity score + vocabulary entropy",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    name: "Cross-Modal Consistency Check",
    description:
      "Correlates video micro-expressions (eye movement, lip sync accuracy) with audio patterns. Candidates using text-to-speech AI tools show desynchronized lip movements, while those reading copilot output display characteristic gaze patterns — rapid left-right scanning inconsistent with recall-based speech.",
    metric: "Audio-visual sync score + gaze entropy",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: "Temporal Answer Segmentation",
    description:
      "Splits each answer into micro-segments and analyzes confidence/fluency trajectories. Genuine responses show natural confidence build-up. AI-assisted responses show a distinctive 'confidence cliff' — hesitant start while waiting for AI output, then sudden fluency spike when reading the generated answer.",
    metric: "Confidence trajectory gradient",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function VoiceAnalysis() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6" id="voice-analysis">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            AI Transcription + Voice Intelligence
          </span>
          <h2 className="text-3xl sm:text-[40px] font-normal text-foreground leading-tight">
            Every word analyzed.
            <br />
            Every pattern detected.
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Real-time speech-to-text transcription powered by our fine-tuned Whisper model,
            combined with 6-layer voice forensics that catches what humans can&apos;t hear.
          </p>
        </div>

        {/* Transcription demo */}
        <div className="my-16 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Live Transcription — Interview Session #4829</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">00:14:32</span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="text-xs font-medium text-blue-500 mt-0.5 shrink-0 w-20">Interviewer</span>
                <p className="text-gray-700">&ldquo;Can you explain the difference between a mutex and a semaphore?&rdquo;</p>
              </div>
              <div className="flex gap-3">
                <span className="text-xs font-medium text-gray-400 mt-0.5 shrink-0 w-20">3.2s pause</span>
                <div className="flex-1 border-t border-dashed border-gray-200 mt-2.5" />
              </div>
              <div className="flex gap-3 bg-red-50 rounded-lg p-3 border border-red-100">
                <span className="text-xs font-medium text-red-500 mt-0.5 shrink-0 w-20">Candidate</span>
                <div>
                  <p className="text-gray-700">&ldquo;So, a mutex is essentially a mutual exclusion object that provides a locking mechanism. <span className="bg-red-100 text-red-700 px-1 rounded">It&apos;s important to note that</span> a mutex allows only one thread to access a shared resource at a time, while a semaphore is a signaling mechanism that can allow multiple threads...&rdquo;</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-100 rounded-full px-2 py-0.5">
                      ⚠ Hedging phrase detected
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-100 rounded-full px-2 py-0.5">
                      ⚠ MFCC variance: 0.12 (threshold: 0.35)
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-100 rounded-full px-2 py-0.5">
                      ⚠ Confidence cliff at 3.2s mark
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-yellow-700 bg-yellow-100 rounded-full px-2 py-0.5">
                      △ Flesch-Kincaid: 14.2 (baseline: 9.8)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xs font-medium text-gray-400 mt-0.5 shrink-0 w-20">Analysis</span>
                <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-red-500">Trust Score: 23/100 — HIGH RISK</span>
                    <span className="text-xs font-mono text-gray-400">Signal confidence: 94.3%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "23%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Analysis layers */}
        <h3 className="text-2xl font-normal text-foreground text-center mb-12">
          Six-layer voice forensics pipeline
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisLayers.map((layer) => (
            <div
              key={layer.name}
              className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-4">
                {layer.icon}
              </div>
              <h4 className="text-base font-semibold text-foreground mb-2">
                {layer.name}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {layer.description}
              </p>
              <p className="text-xs font-mono text-accent/70">
                Key metric: {layer.metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
