# Drishty AI — Project Instructions

## What is Drishty AI?
B2B AI interview cheating detection platform. Detects candidates using AI copilots during live interviews. Two components:
1. **Desktop Agent** — proctoring software installed on candidate's machine (foolproof detection)
2. **Web Dashboard** — HR team's real-time monitoring dashboard + standalone web-only detection mode

## CRITICAL RULES — READ FIRST

### 1. Reference Architecture (READ-ONLY)
Use these ChikuAI codebases for architectural guidance:
- **Web app:** `C:\Users\Admin\Projects\MyPersonalProjects\Chiku_root\ChikuAI\` — Next.js, MongoDB, Deepgram, auth, payments, WebSocket proxy
- **Desktop app:** `C:\Users\Admin\Projects\MyPersonalProjects\Chiku_root\ChikuAIDesktop_v3\` — Electron, native C++ hooks, audio capture, window management
- **NEVER modify ANY ChikuAI file.** It is a production system with paying customers. Read-only reference. Not even one character.

### 2. Generic Detection — NEVER Hardcode
- Detection must be **behavioral and heuristic-based**, NOT hardcoded to specific products
- WRONG: `if (processName === "cluely.exe") flag()` or `if (sha256 === "a3f2...") flag()`
- RIGHT: `if (process.hasTransparentOverlay && process.hasGlobalKeyboardHook && process.connectsToAIAPI) flag()`
- The signature database supplements heuristics — it doesn't replace them
- A new copilot released tomorrow should still be detectable by behavioral patterns
- Take inspiration from how ChikuAI works to understand what patterns to look for, but detect the behavior, not the specific implementation

### 3. What to Look for When Studying ChikuAI
When reading ChikuAI code for reference, focus on:
- **Stealth patterns to detect:** `setContentProtection`, `setAlwaysOnTop('screen-saver')`, `setSkipTaskbar`, `WS_EX_NOACTIVATE`, COM surrogate masking, `setFocusable(false)`
- **Audio capture patterns:** Deepgram WebSocket proxy, PCM16 AudioWorklet, `getDisplayMedia` for system audio
- **Architecture patterns:** Custom Next.js server for WebSocket, MongoDB schema design, NextAuth setup, Razorpay integration
- **Desktop app patterns:** Electron main/preload/renderer split, native addon builds, auto-updater

## Project Structure
```
DrishtyAI/
├── landing-page/          # Marketing site (already built and deployed)
├── webapp/                # Next.js web application (HR dashboard + standalone mode)
├── desktop-agent/         # Electron proctoring agent (candidate-side)
├── IMPLEMENTATION_PLAN.md # Full implementation plan with all phases
└── CLAUDE.md              # This file
```

## Tech Stack
- **Web:** Next.js 16 + TypeScript + Tailwind CSS v4 + App Router
- **Desktop:** Electron v39 + TypeScript + C++ N-API native addons
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Auth:** NextAuth.js (Google OAuth + email/password)
- **STT:** Deepgram (WebSocket streaming, PCM16 16kHz mono)
- **AI:** OpenAI GPT-4o-mini (linguistic analysis, reports)
- **Payments:** Razorpay (INR subscriptions)
- **Hosting:** Render (Standard tier, long-running instances)

## Detection Philosophy
Drishty detects cheating through multiple independent signal layers:
1. **Process monitoring** — detect suspicious running processes via behavioral analysis (not just name matching)
2. **Window monitoring** — detect transparent/overlay/always-on-top/no-taskbar windows
3. **Network monitoring** — detect connections to known AI API endpoints (DNS/SNI inspection, no content decryption)
4. **Voice forensics** — analyze speech patterns (latency, prosody, MFCC, confidence trajectories)
5. **Linguistic analysis** — analyze transcribed text (complexity scores, hedging phrases, vocabulary entropy)
6. **Clipboard/input monitoring** — detect paste operations and keystroke injection patterns

Each layer produces a sub-score. Combined = overall trust score (0-100).

## Interview Flow
1. HR creates interview session in dashboard → gets 6-digit access code
2. Candidate installs Desktop Agent and enters access code (or opens web link for standalone mode)
3. Agent connects to backend via WebSocket → HR sees "Agent Connected" on dashboard
4. Interview happens on Zoom/Meet/Teams separately — Drishty monitors in parallel
5. Real-time: transcription, detections, and flags appear on HR's dashboard
6. After interview: comprehensive report with trust score, evidence, and recommendations

## Key Architectural Decisions
- WebSocket hub pattern: Agent → Backend → Dashboard (real-time relay)
- Deepgram proxy on backend (same pattern as ChikuAI's /ws/deepgram)
- Custom Next.js server (server.js) for WebSocket upgrade handling
- Desktop agent is VISIBLE to candidate (legitimate proctoring, not hidden)
- Detection scoring is additive (multiple low signals can trigger high alert)
- Signature DB supplements behavioral detection (not replaces)

## Current State (as of March 10, 2026)
- Landing page: BUILT and deployed (DrishtyAI/landing-page/)
- GitHub repo: https://github.com/Ashutoshmitra/DrishtyAI
- Webapp: Not started
- Desktop agent: Not started
- Implementation plan: Written (IMPLEMENTATION_PLAN.md)
