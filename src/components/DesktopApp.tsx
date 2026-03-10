"use client";

import { useReveal } from "@/hooks/useReveal";

const capabilities = [
  {
    title: "Zero-Visibility Process Injection",
    description:
      "Drishty Desktop runs as a signed kernel-level background service with no visible window, taskbar icon, or system tray presence. Uses COM surrogate hosting to mask its process footprint — invisible to candidates even with Task Manager open.",
    technical: "Process: drishty-service.exe → svchost.exe (COM Surrogate)",
  },
  {
    title: "Window Z-Order & Overlay Detection",
    description:
      "Continuously monitors the desktop compositor's window stack using DWMAPI hooks. Detects transparent overlay windows, always-on-top applications, and screen-region capture tools that AI copilots use to read interview questions.",
    technical: "DwmGetWindowAttribute() + EnumWindows() @ 60fps polling",
  },
  {
    title: "Clipboard & Input Stream Monitoring",
    description:
      "Hooks into the Win32 clipboard chain and keyboard input pipeline to detect paste operations from external AI tools. Identifies rapid text injection patterns inconsistent with human typing cadence using keystroke dynamics analysis.",
    technical: "SetClipboardViewer() + LowLevelKeyboardProc WH_KEYBOARD_LL",
  },
  {
    title: "Active Process Fingerprinting",
    description:
      "Maintains a real-time hash table of running executables, comparing SHA-256 signatures against our database of 200+ known AI interview tools. Detects even renamed or obfuscated binaries through behavioral signature matching.",
    technical: "CreateToolhelp32Snapshot() + PE header analysis",
  },
  {
    title: "Network Traffic Analysis",
    description:
      "Inspects outbound TLS SNI headers and DNS queries to identify connections to known AI API endpoints (api.openai.com, api.anthropic.com, etc.) during active interview sessions. No content decryption — privacy-preserving by design.",
    technical: "WFP callout driver + DNS cache enumeration",
  },
  {
    title: "Audio Loopback Detection",
    description:
      "Monitors WASAPI audio sessions to detect virtual audio cables, AI voice synthesis outputs, and text-to-speech engines feeding answers into the interview microphone input. Identifies device routing anomalies in real-time.",
    technical: "IAudioSessionManager2 + MMDevice endpoint enumeration",
  },
];

export default function DesktopApp() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6 bg-foreground" id="desktop">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Desktop Agent — Windows & macOS
          </span>
          <h2 className="text-3xl sm:text-[40px] font-normal text-white leading-tight">
            Invisible. Undetectable.
            <br />
            Always watching.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Our desktop agent uses OS-level primitives to monitor for AI cheating tools
            without any visible presence. Candidates never know it&apos;s there.
          </p>
        </div>

        {/* Architecture diagram placeholder */}
        <div className="my-16 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 ml-2 font-mono">drishty-agent v3.2.1 — system monitor</span>
            </div>
            <div className="font-mono text-sm space-y-2 text-gray-400">
              <p className="text-green-400">● Agent initialized — PID masked via COM surrogate</p>
              <p className="text-green-400">● Window compositor hook active — monitoring Z-order stack</p>
              <p className="text-green-400">● Clipboard chain registered — keystroke dynamics calibrated</p>
              <p className="text-green-400">● Process fingerprint DB loaded — 247 signatures</p>
              <p className="text-green-400">● Network filter active — SNI inspection enabled</p>
              <p className="text-green-400">● Audio session monitor active — 2 endpoints detected</p>
              <p className="text-yellow-400">▲ Interview session started — full monitoring engaged</p>
              <p className="text-gray-500">  ├─ Zoom.exe (PID 4892) — verified meeting application</p>
              <p className="text-gray-500">  ├─ chrome.exe (PID 7213) — 3 tabs, no AI tools detected</p>
              <p className="text-red-400">  └─ ⚠ cluely.exe (PID 9841) — AI COPILOT DETECTED [confidence: 99.7%]</p>
              <p className="text-red-400">     SHA256: a3f2...8d1c matches known signature "Cluely v2.4"</p>
              <p className="text-yellow-400">▲ Overlay window detected — transparent, always-on-top, 340x720px</p>
              <p className="text-red-400">  └─ ⚠ Screen region capture active — reading interview panel</p>
            </div>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {cap.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                {cap.description}
              </p>
              <p className="text-xs font-mono text-accent-light/70">
                {cap.technical}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Drishty Desktop requires candidate consent before installation. All monitoring is
            limited to interview session windows only. No keylogging, no screen recording, no
            personal data collection. SOC 2 Type II certified. ISO 27001 compliant.
          </p>
        </div>
      </div>
    </section>
  );
}
