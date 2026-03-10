# Drishty AI — Full Implementation Plan

## Product Vision
Drishty AI is a B2B AI interview cheating detection platform for HR teams and recruiting firms. It detects candidates using AI copilots (Chiku AI, FinalRound, Cluely, Parakeet, Interview Coder, ChatGPT voice mode, etc.) during live interviews through a combination of:
1. **Desktop proctoring agent** — installed on candidate's machine for foolproof detection
2. **Web dashboard** — real-time monitoring for HR teams + standalone detection mode

---

## CRITICAL RULES

### Reference Architecture
- **ALWAYS refer to ChikuAI for architectural patterns and guidance:**
  - Web app: `C:\Users\Admin\Projects\MyPersonalProjects\Chiku_root\ChikuAI\` (Next.js, MongoDB, Deepgram, auth, payments)
  - Desktop app: `C:\Users\Admin\Projects\MyPersonalProjects\Chiku_root\ChikuAIDesktop_v3\` (Electron, native hooks, audio capture, overlay detection)
- **NEVER modify any ChikuAI files.** Not even a single character. ChikuAI is a production system with paying users. Read-only reference.
- **NEVER hardcode detection for ChikuAI specifically.** Detection must be generic — behavioral patterns, heuristics, signatures. If it only catches ChikuAI but misses a new copilot, it's useless.
- **Detection philosophy:** Detect the *behavior* of cheating tools (overlay windows, hidden processes, AI-generated speech patterns, clipboard injection, network calls to AI APIs) — not specific product names or hardcoded signatures.

### Project Structure
All Drishty AI code lives in: `C:\Users\Admin\Projects\MyPersonalProjects\DrishtyAI\`
```
DrishtyAI/
├── landing-page/          # Marketing site (already built, deployed for ads)
├── webapp/                # Next.js web application (HR dashboard + standalone mode)
├── desktop-agent/         # Electron proctoring agent (candidate-side)
└── IMPLEMENTATION_PLAN.md # This file
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        HR TEAM (Web Dashboard)                       │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Create       │  │ Live Monitor │  │ Post-Interview Reports    │  │
│  │ Interview    │──│ Dashboard    │──│ Trust scores, flags,      │  │
│  │ Session      │  │ (Real-time)  │  │ evidence, PDF export      │  │
│  └──────────────┘  └──────┬───────┘  └───────────────────────────┘  │
│                           │                                          │
└───────────────────────────┼──────────────────────────────────────────┘
                            │ WebSocket (wss://)
                            │
┌───────────────────────────┼──────────────────────────────────────────┐
│                    DRISHTY BACKEND (Render)                           │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Auth Service │  │ WebSocket    │  │ Analysis Engine           │  │
│  │ (NextAuth)   │  │ Hub (ws)     │  │ - Voice forensics        │  │
│  │              │  │ Agent↔HR     │  │ - Linguistic analysis     │  │
│  ├──────────────┤  │ relay        │  │ - Process risk scoring    │  │
│  │ Session Mgmt │  ├──────────────┤  │ - Report generation       │  │
│  │ (MongoDB)    │  │ Deepgram     │  │                           │  │
│  │              │  │ Proxy (ws)   │  │                           │  │
│  ├──────────────┤  │              │  ├───────────────────────────┤  │
│  │ Razorpay     │  │              │  │ Signature DB              │  │
│  │ Payments     │  │              │  │ (process hashes,          │  │
│  │              │  │              │  │  network endpoints,       │  │
│  └──────────────┘  └──────┬───────┘  │  behavioral patterns)     │  │
│                           │          └───────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────────────┘
                            │ WebSocket (wss://)
                            │
┌───────────────────────────┼──────────────────────────────────────────┐
│              CANDIDATE'S MACHINE (Desktop Agent)                      │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Process      │  │ Audio        │  │ Window & Display          │  │
│  │ Monitor      │  │ Capture      │  │ Monitor                   │  │
│  │ - Enumerate  │  │ - System     │  │ - Z-order stack           │  │
│  │ - Fingerprint│  │   audio      │  │ - Overlay detection       │  │
│  │ - Behavioral │  │ - Mic input  │  │ - Content protection      │  │
│  │   analysis   │  │ - Deepgram   │  │ - Screen region capture   │  │
│  ├──────────────┤  │   STT        │  ├───────────────────────────┤  │
│  │ Network      │  ├──────────────┤  │ Clipboard & Input         │  │
│  │ Monitor      │  │ File System  │  │ Monitor                   │  │
│  │ - DNS/SNI    │  │ Scanner      │  │ - Paste detection         │  │
│  │ - AI API     │  │ - App dirs   │  │ - Keystroke dynamics      │  │
│  │   endpoints  │  │ - Config     │  │ - Typing cadence          │  │
│  │              │  │   files      │  │                           │  │
│  └──────────────┘  └──────────────┘  └───────────────────────────┘  │
│                                                                      │
│  All data streamed to backend via WebSocket in real-time             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Component | Technology | Reference |
|-----------|-----------|-----------|
| **Web App** | Next.js 16 + TypeScript + Tailwind v4 + App Router | ChikuAI webapp |
| **Desktop Agent** | Electron v39 + TypeScript + Native Addons (C++ N-API) | ChikuAIDesktop_v3 |
| **Database** | MongoDB Atlas (Mongoose ODM) | ChikuAI |
| **Auth** | NextAuth.js (Google OAuth + email/password) | ChikuAI |
| **Real-time** | WebSocket (ws library on server, native in Electron) | ChikuAI Deepgram proxy pattern |
| **Speech-to-Text** | Deepgram (WebSocket streaming, PCM16 16kHz) | ChikuAI useDeepgram.ts |
| **AI Analysis** | OpenAI GPT-4o-mini (linguistic analysis, report generation) | ChikuAI /api/chat |
| **Payments** | Razorpay (INR) | ChikuAI |
| **Hosting** | Render (Standard tier, long-running instances) | ChikuAI |
| **Audio Processing** | Web Audio API + AudioWorklet (PCM16 processor) | ChikuAI pcm16-processor.js |
| **Native Hooks (Win)** | C++ N-API addon (window enumeration, process monitoring) | ChikuAIDesktop_v3 win32-overlay-hook |
| **Native Hooks (Mac)** | Objective-C++ N-API addon (NSWorkspace, CGWindow) | New — no ChikuAI reference |

---

## Phase Breakdown

---

### PHASE 1: Foundation (Web App + Auth + Database)
**Goal:** Working web app with auth, sessions, and basic dashboard

#### 1.1 Project Setup
- [ ] Rename `DrishtyAI/drishtyai` → `DrishtyAI/landing-page`
- [ ] Copy landing-page into `DrishtyAI/webapp` and extend it into the full app
- [ ] Set up MongoDB Atlas cluster for Drishty AI (separate from ChikuAI)
- [ ] Set up Render service for webapp
- [ ] Configure environment variables (.env.local)

**Refer to:** `ChikuAI/.env.example`, `ChikuAI/src/lib/mongodb.ts`

#### 1.2 Database Schema (MongoDB)
```
Collections:
├── users              # HR team members
│   ├── name, email, hashedPassword
│   ├── googleId (OAuth)
│   ├── organization (company name)
│   ├── tier (free | starter | pro | enterprise)
│   ├── interviewsRemaining
│   └── createdAt, updatedAt
│
├── organizations      # Company/team accounts
│   ├── name, domain
│   ├── members[] (user refs)
│   ├── settings (default detection sensitivity, etc.)
│   └── subscription (tier, razorpaySubId, validUntil)
│
├── interviews         # Interview sessions
│   ├── organizationId, createdBy (HR user)
│   ├── candidateName, candidateEmail
│   ├── position, company
│   ├── status (pending | active | completed | cancelled)
│   ├── agentConnected (boolean — desktop agent linked?)
│   ├── agentId (unique agent session ID)
│   ├── startedAt, endedAt, duration
│   ├── accessCode (6-digit code candidate enters in agent)
│   └── settings (sensitivity, features enabled)
│
├── transcripts        # Real-time transcription data
│   ├── interviewId
│   ├── segments[] { text, timestamp, speaker, isFinal }
│   ├── flags[] { timestamp, type, confidence, evidence }
│   └── rawAudioUrl (optional — stored audio for review)
│
├── detections         # Individual detection events
│   ├── interviewId
│   ├── timestamp
│   ├── source (process_monitor | window_monitor | voice_analysis | network_monitor | clipboard_monitor)
│   ├── type (ai_tool_detected | overlay_window | suspicious_process | ai_speech_pattern | clipboard_paste | ai_api_connection)
│   ├── severity (low | medium | high | critical)
│   ├── confidence (0-100)
│   ├── evidence {} (process name, SHA256, window info, API endpoint, etc.)
│   └── acknowledged (boolean — HR reviewed this flag)
│
├── reports            # Post-interview reports
│   ├── interviewId
│   ├── trustScore (0-100)
│   ├── summary (AI-generated)
│   ├── detectionBreakdown {} (counts by category)
│   ├── flaggedResponses[] { question, answer, flags, trustScore }
│   ├── voiceAnalysis {} (MFCC stats, latency analysis, prosody)
│   ├── processAnalysis {} (suspicious processes found)
│   ├── recommendations[]
│   └── pdfUrl (generated PDF)
│
└── signature_db       # Known AI tool signatures (updatable)
    ├── type (process | network_endpoint | window_class | behavioral)
    ├── name (human-readable, e.g., "Generic AI Overlay Tool")
    ├── patterns[] (regex patterns, hashes, endpoint URLs)
    ├── severity (how suspicious)
    ├── addedAt, source (manual | community | auto-detected)
    └── isActive
```

**IMPORTANT:** The signature_db stores patterns generically. Examples:
- Process pattern: `{ regex: ".*overlay.*|.*copilot.*|.*assist.*", type: "process_name" }` — NOT `"cluely.exe"`
- Network endpoint: `{ pattern: "api.openai.com|api.anthropic.com|api.deepgram.com", type: "ai_api" }` — catches ANY tool using these APIs
- Window behavior: `{ pattern: "transparent+always_on_top+no_taskbar+small_bounds", type: "overlay_heuristic" }` — behavioral detection
- Specific known hashes are a SUPPLEMENT, not the primary detection method

#### 1.3 Authentication
- [ ] NextAuth.js setup (Google OAuth + credentials provider)
- [ ] Registration flow: email → verify → create org → invite team
- [ ] Login flow: email/password or Google
- [ ] JWT tokens for API auth
- [ ] Role-based access: admin (manages org), member (creates interviews)

**Refer to:** `ChikuAI/src/app/api/auth/[...nextauth]/route.ts`

#### 1.4 HR Dashboard Pages
```
/                       → Landing page (marketing)
/login                  → Login
/register               → Registration
/dashboard              → Interview list, stats, quick actions
/dashboard/interviews   → All interviews (filterable, searchable)
/dashboard/interview/new → Create new interview session
/dashboard/interview/[id] → Interview detail (live monitor OR report)
/dashboard/interview/[id]/live → Live monitoring view
/dashboard/interview/[id]/report → Post-interview report
/dashboard/settings     → Org settings, detection sensitivity
/dashboard/billing      → Subscription, invoices
/dashboard/signatures   → Custom signature management (enterprise)
/pricing                → Pricing page
```

#### 1.5 Interview Session Flow
1. HR logs in → Dashboard
2. HR clicks "New Interview" → enters candidate name, email, position
3. System generates a **6-digit access code** + unique session URL
4. HR shares access code with candidate (email or verbal)
5. Candidate enters code in Desktop Agent (or opens web link for standalone mode)
6. Agent/web connects to backend via WebSocket
7. HR sees live monitoring dashboard
8. Interview happens on Zoom/Meet/Teams separately
9. Drishty monitors in parallel
10. After interview ends → report generated automatically

---

### PHASE 2: Real-Time Communication Layer
**Goal:** WebSocket infrastructure for agent↔backend↔dashboard communication

#### 2.1 WebSocket Hub (Backend)
A central WebSocket server that:
- Accepts connections from Desktop Agents (candidate-side)
- Accepts connections from HR Dashboards (interviewer-side)
- Routes data between them in real-time
- Also handles Deepgram proxy (audio → transcription)

```
WebSocket Routes:
/ws/agent         → Desktop agent connects here (sends process data, audio, detections)
/ws/dashboard     → HR dashboard connects here (receives real-time updates)
/ws/deepgram      → Deepgram STT proxy (same pattern as ChikuAI)
```

**Message Protocol (Agent → Backend):**
```typescript
// Agent sends these message types:
{ type: "agent_hello", interviewId, accessCode, agentVersion, os }
{ type: "process_snapshot", processes: [...], timestamp }
{ type: "window_snapshot", windows: [...], timestamp }
{ type: "detection_alert", detection: { type, severity, confidence, evidence } }
{ type: "network_snapshot", connections: [...], timestamp }
{ type: "clipboard_event", content_hash, length, timestamp }
{ type: "audio_chunk", data: ArrayBuffer }  // Binary PCM16
{ type: "heartbeat", timestamp, metrics: { cpu, memory } }
```

**Message Protocol (Backend → HR Dashboard):**
```typescript
// Dashboard receives these message types:
{ type: "agent_connected", agentInfo: { os, version } }
{ type: "transcript_update", segment: { text, timestamp, speaker, isFinal } }
{ type: "detection_alert", detection: { ... } }  // Forwarded from agent
{ type: "voice_analysis_update", metrics: { trustScore, flags } }
{ type: "process_list_update", processes: [...], flagged: [...] }
{ type: "interview_ended", summary: { ... } }
```

**Refer to:** `ChikuAI/src/app/ws/deepgram/` for WebSocket proxy pattern

#### 2.2 Deepgram Integration
- Same proxy pattern as ChikuAI: client → backend WS → Deepgram WS
- PCM16, 16kHz, mono
- Both interim and final transcripts
- UtteranceEnd for silence detection
- Language: English (expandable to Hindi and other Indian languages)

**Refer to:** `ChikuAI/src/hooks/useDeepgram.ts`, `ChikuAI/server.js` (custom server with WS proxy)

#### 2.3 Custom Next.js Server
ChikuAI uses a custom `server.js` to handle WebSocket upgrades alongside Next.js. Drishty needs the same pattern:
- Express/Node HTTP server
- WebSocket upgrade handling for /ws/* routes
- Next.js request handler for everything else
- Render deployment as a web service (not serverless)

**Refer to:** `ChikuAI/server.js`

---

### PHASE 3: Desktop Proctoring Agent (Electron)
**Goal:** Cross-platform desktop agent that monitors candidate's machine

#### 3.1 Project Setup
- [ ] Electron v39 + TypeScript + Webpack (same as ChikuAIDesktop_v3)
- [ ] Native addon build system (node-gyp, cmake-js)
- [ ] Auto-updater (electron-updater)
- [ ] Code signing (Windows + macOS)
- [ ] Installer (NSIS for Windows, DMG for macOS)

**Refer to:** `ChikuAIDesktop_v3/package.json`, `ChikuAIDesktop_v3/forge.config.ts`

#### 3.2 Agent UI Flow
1. Candidate downloads and installs Drishty Agent
2. Opens agent → sees clean, branded window
3. Enters **6-digit access code** (provided by HR)
4. Agent validates code with backend → connects WebSocket
5. Agent requests permissions: microphone, screen share (system audio)
6. Shows "Monitoring Active" status with a minimal, visible indicator
7. **Agent is NOT invisible** — it's legitimate proctoring software. Candidate knows it's running.
8. After interview → shows "Session Complete" → can be closed

**IMPORTANT DISTINCTION from ChikuAI:**
- ChikuAI's desktop app is designed to be INVISIBLE (it helps candidates cheat)
- Drishty's desktop agent is designed to be VISIBLE and LEGITIMATE (it's proctoring software)
- But it needs to detect INVISIBLE tools running alongside it

#### 3.3 Process Monitor Module
The most critical detection module. Must detect disguised processes.

```typescript
// Detection approach (generic, not hardcoded):

// Layer 1: Known signature matching
// - SHA-256 hash of executable → check against signature_db
// - This catches known tools even if renamed

// Layer 2: Behavioral analysis (catches unknown tools)
// - Process spawns a transparent, always-on-top, no-taskbar window? → suspicious
// - Process establishes WebSocket to known AI API domains? → suspicious
// - Process registers global keyboard hooks (WH_KEYBOARD_LL)? → suspicious
// - Process uses SetWindowsHookEx? → flag it
// - Process has no visible window but high CPU/network usage? → suspicious
// - Process was installed recently (within 24 hours of interview)? → flag it

// Layer 3: Heuristic scoring
// - Each suspicious behavior adds points
// - Threshold determines alert level
// - Multiple low-severity signals can trigger a high-severity alert
// Example:
//   transparent_window: +20 points
//   always_on_top: +15 points
//   no_taskbar: +15 points
//   keyboard_hook: +25 points
//   ai_api_connection: +30 points
//   recently_installed: +10 points
//   TOTAL: 115 → CRITICAL ALERT
```

**Windows Implementation:**
```
- CreateToolhelp32Snapshot() → enumerate all processes
- QueryFullProcessImageName() → get full exe path
- GetModuleFileNameEx() → module info
- NtQuerySystemInformation() → detailed process info
- Calculate SHA-256 of each executable
- Check digital signatures (is it signed? By whom?)
- Check parent process chain (who spawned this?)
- Check loaded DLLs (suspicious injections?)
```

**macOS Implementation:**
```
- NSWorkspace.runningApplications → process list
- proc_pidinfo() → detailed process info
- Code signature verification (codesign -v)
- Activity Monitor equivalent APIs
```

**Refer to:** ChikuAIDesktop_v3's process masking (COM surrogate pattern) — this is exactly what we need to DETECT

#### 3.4 Window Monitor Module
Detects overlay windows that AI copilots use to display answers.

```typescript
// Detection approach:

// Enumerate ALL windows (including invisible ones)
// For each window, check:
// 1. Is it transparent? (layered window with alpha)
// 2. Is it always-on-top? (WS_EX_TOPMOST)
// 3. Is it hidden from taskbar? (WS_EX_TOOLWINDOW)
// 4. Does it have WS_EX_NOACTIVATE? (can't be focused — classic copilot pattern)
// 5. Is content protection enabled? (DWM composition attribute)
// 6. What are its dimensions? (small overlay = suspicious)
// 7. Is it click-through? (WS_EX_TRANSPARENT)
// 8. Does it belong to a known/signed application?

// Scoring:
// transparent + always_on_top + no_taskbar = VERY suspicious
// transparent + always_on_top + no_taskbar + content_protection = CRITICAL
// Any window with WS_EX_NOACTIVATE that isn't a system component = suspicious
```

**Windows Implementation:**
```
- EnumWindows() + EnumDesktopWindows() → window list
- GetWindowLongPtr(GWL_EXSTYLE) → extended style flags
- DwmGetWindowAttribute(DWMWA_CLOAKED) → cloaked state
- GetWindowRect() → dimensions/position
- GetWindowThreadProcessId() → owning process
- IsWindowVisible() → visibility state
- GetLayeredWindowAttributes() → transparency info
```

**macOS Implementation:**
```
- CGWindowListCopyWindowInfo() → all windows including offscreen
- kCGWindowLayer → z-order
- kCGWindowAlpha → transparency
- kCGWindowBounds → dimensions
- kCGWindowOwnerPID → owning process
```

**Refer to:** ChikuAIDesktop_v3's `setAlwaysOnTop(true, 'screen-saver')`, `setContentProtection(true)`, `WS_EX_NOACTIVATE` — these are the exact patterns to detect

#### 3.5 Network Monitor Module
Detects connections to AI API endpoints.

```typescript
// Monitor outbound connections during interview:

// Method 1: DNS cache inspection
// - Enumerate DNS cache (Windows: DnsQuery, GetAdaptersAddresses)
// - Flag any resolution of known AI domains
// - ai_domains = ["api.openai.com", "api.anthropic.com", "api.deepgram.com",
//                 "api.together.ai", "api.groq.com", "generativelanguage.googleapis.com",
//                 "api.cohere.ai", "api.mistral.ai", ...]
// - Also flag WebSocket connections (wss://) to unknown endpoints

// Method 2: Active connection enumeration
// - Windows: GetExtendedTcpTable() → all TCP connections with PIDs
// - Map PID → process name → if process is suspicious + connecting to AI API = CRITICAL
// - macOS: lsof -i or proc_pidinfo with PROC_PIDFDTCP

// Method 3: DNS query hooking (advanced)
// - Hook DNS resolution to catch queries in real-time
// - More reliable than cache inspection

// IMPORTANT: We DON'T decrypt TLS traffic. We only check:
// 1. DNS queries (domain names)
// 2. TLS SNI headers (server name in ClientHello — sent in plaintext)
// 3. IP addresses resolved (match against known AI API IPs)
// This is privacy-preserving — no content inspection.
```

#### 3.6 Audio Capture & Forwarding
Captures system audio + microphone for voice analysis.

```typescript
// Same approach as ChikuAI but for monitoring (not cheating):

// Microphone capture:
// navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 } })

// System audio capture:
// Windows: navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//          → extract audio tracks, discard video
// macOS: AudioTee (Core Audio Taps) — same as ChikuAI

// Audio processing:
// AudioContext → PCM16 AudioWorklet → binary frames → WebSocket → backend → Deepgram

// Backend receives audio and:
// 1. Forwards to Deepgram for transcription
// 2. Runs voice analysis (MFCC, prosody, latency)
// 3. Sends results to HR dashboard
```

**Refer to:** `ChikuAI/src/renderer/js/transcription.js`, `ChikuAI/public/worklets/pcm16-processor.js`

#### 3.7 Clipboard & Input Monitor
Detects paste operations and keystroke injection.

```typescript
// Clipboard monitoring:
// - Watch clipboard chain for paste events during interview
// - Log: content length, content hash (NOT content itself — privacy), timestamp, source window
// - Flag: large text paste during interview (candidate might be pasting AI answers)
// - Flag: rapid sequence of paste operations

// Keystroke dynamics (advanced):
// - NOT a keylogger — we don't log what keys are pressed
// - We analyze TIMING patterns:
//   - Key-down to key-up duration (dwell time)
//   - Time between keystrokes (flight time)
//   - Typing cadence (words per minute, variance)
// - AI copilot "chat mode" (like ChikuAI V3) captures keystrokes globally
//   and injects them — this creates ZERO flight time from the OS perspective
//   because the real keystrokes are blocked and synthetic ones are sent
// - Flag: unnaturally consistent typing cadence or zero flight-time patterns
```

#### 3.8 File System Scanner
Quick scan for installed AI tools.

```typescript
// Scan common installation directories:
// Windows: Program Files, AppData/Local, AppData/Roaming, Desktop
// macOS: /Applications, ~/Applications, ~/Library/Application Support

// Look for:
// - Electron app directories (resources/app.asar — sign of Electron-based tools)
// - Recently installed applications (modified in last 7 days)
// - Known config directories (e.g., ~/.cluely, ~/.finalround, etc.)
// - Browser extensions directories for AI-related extensions

// Score based on findings, don't auto-flag everything
// An Electron app alone isn't suspicious (VS Code is Electron)
// But Electron app + no digital signature + installed yesterday + tiny size = suspicious
```

---

### PHASE 4: Voice & Linguistic Analysis Engine
**Goal:** Server-side AI analysis of transcribed speech

#### 4.1 Voice Analysis Pipeline (Backend)
Runs on transcription data received from Deepgram.

```typescript
// Analysis runs on the backend, not the desktop agent
// Desktop agent only captures and forwards audio
// Backend receives transcription + audio features from Deepgram

// Layer 1: Response Latency Analysis
// - Measure time between interviewer question end and candidate answer start
// - Human pattern: complex question = longer pause, simple = shorter
// - AI-assisted pattern: relatively flat latency regardless of complexity
// - Calculate: latency variance coefficient across all responses
// - Flag: variance < threshold (too consistent = suspicious)

// Layer 2: Linguistic Analysis (GPT-4o-mini)
// - For each candidate response, analyze:
//   - Flesch-Kincaid readability score (AI text tends to be higher/more formal)
//   - Vocabulary entropy (AI uses more diverse vocabulary than average humans)
//   - Hedging phrases ("It's important to note that...", "Essentially...", "In the context of...")
//   - Sentence structure (AI tends toward compound-complex sentences)
//   - Compare each response against candidate's BASELINE (first 2-3 responses)
//   - Sudden jump in sophistication = flag

// Layer 3: Prosodic Analysis (from audio features)
// - Deepgram provides word-level timestamps
// - Calculate speech rate variability (words per minute per segment)
// - Detect "reading cadence" — unnaturally even pacing
// - Detect missing hesitation markers (um, uh, well, so, like)
// - Flag: high speech quality + low hesitation = potential reading

// Layer 4: Confidence Trajectory
// - Split each answer into 3-second segments
// - Track fluency/confidence over time within each answer
// - Human pattern: builds confidence as they recall
// - AI-assisted pattern: hesitant start (waiting for AI output) → sudden fluency spike
// - Flag: steep confidence gradient

// Layer 5: Cross-Response Consistency
// - Compare linguistic fingerprint across all answers
// - Genuine candidate: consistent style, vocabulary, complexity
// - AI-assisted candidate: style varies wildly (some answers AI, some genuine)
// - Flag: high inter-response variance in linguistic metrics
```

#### 4.2 Trust Score Computation
```typescript
// Composite trust score: 0-100 (higher = more trustworthy)

// Scoring weights:
const weights = {
  process_monitor: 0.25,      // Process/window detection (if agent installed)
  network_monitor: 0.15,      // Network analysis (if agent installed)
  voice_analysis: 0.25,       // Voice forensics
  linguistic_analysis: 0.25,  // NLP analysis
  behavioral_signals: 0.10,   // Clipboard, timing, etc.
};

// Each category produces a sub-score 0-100
// Detections reduce the score
// No detections = 100 (fully trusted)

// Final score = weighted average of sub-scores
// If desktop agent NOT installed, process/network weights redistribute to voice/linguistic

// Score interpretation:
// 80-100: Low risk (green)
// 60-79:  Medium risk (yellow) — some signals but inconclusive
// 40-59:  High risk (orange) — multiple signals detected
// 0-39:   Critical risk (red) — strong evidence of AI assistance
```

#### 4.3 Report Generation
```typescript
// After interview ends, generate comprehensive report:

// 1. Executive Summary (AI-generated by GPT-4o-mini)
//    - 3-4 sentences summarizing findings
//    - Overall trust score with explanation
//    - Recommendation (proceed/caution/reject)

// 2. Detection Timeline
//    - Chronological list of all detections
//    - Timestamp, type, severity, evidence

// 3. Voice Analysis Summary
//    - Latency analysis chart
//    - Linguistic complexity scores per response
//    - Flagged responses with specific indicators

// 4. Process & System Analysis (if agent installed)
//    - Suspicious processes found
//    - Network connections to AI APIs
//    - Window overlay detections
//    - Clipboard events

// 5. Transcript with Annotations
//    - Full interview transcript
//    - Flagged segments highlighted with reasons

// 6. PDF Export
//    - Branded PDF for compliance/audit
//    - Includes all above sections
```

---

### PHASE 5: Webapp Standalone Mode
**Goal:** Detection without desktop agent (web-only, limited features)

When a candidate doesn't have the desktop agent installed, the HR team can still get partial detection through the webapp. The candidate joins via a web link.

#### 5.1 Standalone Web Flow
1. HR creates interview → gets a web link (in addition to access code)
2. Candidate opens link in browser
3. Browser requests: microphone permission + screen share
4. Audio is captured and sent to backend for analysis
5. Screen share is captured and analyzed for suspicious content

#### 5.2 Standalone Capabilities (Limited)
```
What web-only CAN detect:
✓ Voice/linguistic analysis (same as with agent)
✓ Response latency patterns
✓ Tab switching frequency (Page Visibility API)
✓ Screen share analysis (if candidate shares their screen)
✓ Browser-based AI tools (if visible in shared screen)

What web-only CANNOT detect:
✗ Desktop processes (no OS-level access from browser)
✗ Invisible overlay windows
✗ System-level keyboard hooks
✗ Network connections to AI APIs
✗ Clipboard monitoring
✗ Content-protected windows

HR is warned: "Desktop agent not installed. Detection is limited to voice and behavioral analysis. Trust scores may be less reliable."
```

#### 5.3 Screen Share Analysis
```typescript
// If candidate shares their screen via getDisplayMedia:
// - Capture frames periodically (every 5-10 seconds)
// - Send to GPT-4 Vision for analysis
// - Detect: visible AI tools, ChatGPT tabs, copilot overlays
// - This is limited because content-protected windows won't appear in screen share

// Refer to: ChikuAI /api/analyze-screen/route.ts for GPT-4 Vision pattern
```

---

### PHASE 6: Payments & Subscriptions
**Goal:** Razorpay integration for subscription billing

#### 6.1 Pricing Model
```
| Tier        | Price (INR)   | Price (USD) | Interviews/mo | Features                                    |
|-------------|---------------|-------------|---------------|---------------------------------------------|
| Free        | ₹0            | $0          | 5             | Web-only detection, basic reports            |
| Starter     | ₹2,999/mo     | $35/mo      | 50            | Desktop agent, full detection, PDF reports   |
| Professional| ₹4,999/mo     | $59/mo      | 200           | Everything + API access, team members        |
| Enterprise  | Custom        | Custom      | Unlimited     | On-premise option, dedicated support, SLA    |
```

#### 6.2 Razorpay Integration
- Subscription-based (recurring monthly/annual)
- GST handling for Indian customers
- Invoice generation
- Usage tracking (interviews used/remaining)

**Refer to:** ChikuAI's Razorpay integration patterns

---

### PHASE 7: Polish, Testing & Launch
**Goal:** Production-ready quality

#### 7.1 Desktop Agent
- [ ] Auto-updater (Electron autoUpdater)
- [ ] Crash reporting (Sentry or custom)
- [ ] Code signing (EV cert for Windows, Apple Developer for macOS)
- [ ] Installer polish (branded NSIS/DMG)
- [ ] Offline handling (queue detections, send when reconnected)

#### 7.2 Web Dashboard
- [ ] Responsive design (mobile-friendly for on-the-go checks)
- [ ] Email notifications (interview started, high-risk alert, report ready)
- [ ] Team collaboration (multiple HR members can view same interview)
- [ ] Interview history and search
- [ ] Analytics (detection rate trends, common tools detected)

#### 7.3 Security
- [ ] All communication over TLS/WSS
- [ ] JWT tokens with expiration
- [ ] Rate limiting on all API routes
- [ ] Input validation (zod schemas)
- [ ] CORS configuration
- [ ] Content Security Policy headers

---

## Implementation Order (Recommended)

```
Phase 1 (Foundation)     ████████░░░░  ~2-3 weeks
Phase 2 (WebSocket)      ████████░░░░  ~1-2 weeks
Phase 3 (Desktop Agent)  ████████████  ~3-4 weeks (largest effort)
Phase 4 (Voice Analysis) ████████░░░░  ~1-2 weeks
Phase 5 (Standalone Web) ██████░░░░░░  ~1 week
Phase 6 (Payments)       ████░░░░░░░░  ~1 week
Phase 7 (Polish)         ████████░░░░  ~1-2 weeks
```

**Start with:** Phase 1 + 2 in parallel → then Phase 3 (the hard part) → then 4, 5, 6, 7.

---

## Key Detection Heuristics (Generic, Not Hardcoded)

### Process Detection Heuristics
| Signal | Points | Reason |
|--------|--------|--------|
| Unsigned executable | +10 | Legitimate software is usually signed |
| Electron app without known publisher | +15 | Many copilots are Electron-based |
| Process registers global keyboard hook | +25 | Used by copilots for "chat mode" |
| Process creates transparent always-on-top window | +30 | Classic overlay pattern |
| Process connects to AI API endpoint | +35 | Direct evidence of AI usage |
| Process enables content protection on its windows | +25 | Hiding from screen capture |
| Process installed in last 24 hours | +10 | Candidate may have installed just for interview |
| Process name is generic/disguised (e.g., "uihost", "svchost") | +20 | Hiding real identity |
| Process has no visible window but uses >5% CPU | +15 | Background AI processing |
| Multiple suspicious signals from same process | 2x multiplier | Compound evidence |

### Voice Detection Heuristics
| Signal | Points | Reason |
|--------|--------|--------|
| Response latency variance < 0.3 | +20 | Too consistent timing |
| Flesch-Kincaid score jumps >4 points from baseline | +15 | Sudden sophistication increase |
| Hedging phrases ("It's important to note...") | +10 | Classic AI phrasing |
| Zero hesitation markers in technical answer | +15 | Humans pause when thinking |
| Confidence cliff pattern detected | +20 | Hesitant start → sudden fluency |
| Vocabulary entropy 2x above baseline | +15 | AI uses richer vocabulary |
| Reading cadence detected (even pacing) | +15 | Reading vs speaking from memory |

---

## File Structure (Final)

```
DrishtyAI/
├── landing-page/              # Marketing site (already built)
│   ├── src/
│   │   ├── app/               # Next.js pages
│   │   └── components/        # Landing page components
│   └── package.json
│
├── webapp/                    # Main web application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/   # Landing pages (copied from landing-page)
│   │   │   ├── (auth)/        # Login, register
│   │   │   ├── dashboard/     # HR dashboard
│   │   │   ├── monitor/       # Standalone monitoring (candidate web link)
│   │   │   └── api/
│   │   │       ├── auth/      # NextAuth routes
│   │   │       ├── interviews/# CRUD + session management
│   │   │       ├── detections/# Detection events API
│   │   │       ├── reports/   # Report generation
│   │   │       ├── signatures/# Signature DB management
│   │   │       ├── payments/  # Razorpay webhooks
│   │   │       └── ws/        # WebSocket handlers
│   │   ├── components/
│   │   │   ├── dashboard/     # Dashboard UI components
│   │   │   ├── monitor/       # Live monitoring components
│   │   │   └── shared/        # Shared components
│   │   ├── hooks/
│   │   │   ├── useDeepgram.ts
│   │   │   ├── useWebSocket.ts
│   │   │   └── useAudioCapture.ts
│   │   ├── lib/
│   │   │   ├── mongodb.ts
│   │   │   ├── auth.ts
│   │   │   ├── analysis/      # Voice + linguistic analysis
│   │   │   └── scoring.ts     # Trust score computation
│   │   └── models/            # Mongoose models
│   ├── server.js              # Custom server (WebSocket support)
│   └── package.json
│
├── desktop-agent/             # Electron proctoring agent
│   ├── src/
│   │   ├── main.ts            # Main process
│   │   ├── preload.ts         # IPC bridge
│   │   ├── renderer/          # UI (React or vanilla)
│   │   ├── monitors/
│   │   │   ├── process-monitor.ts
│   │   │   ├── window-monitor.ts
│   │   │   ├── network-monitor.ts
│   │   │   ├── clipboard-monitor.ts
│   │   │   ├── audio-capture.ts
│   │   │   └── filesystem-scanner.ts
│   │   ├── native/
│   │   │   ├── win32/         # Windows C++ N-API addons
│   │   │   └── darwin/        # macOS Obj-C++ N-API addons
│   │   ├── analysis/
│   │   │   └── heuristic-scorer.ts  # Local heuristic scoring
│   │   └── comms/
│   │       └── websocket-client.ts  # Backend connection
│   ├── forge.config.ts        # Electron Forge config
│   └── package.json
│
├── IMPLEMENTATION_PLAN.md     # This file
└── CLAUDE.md                  # Instructions for AI assistants
```

---

## CLAUDE.md for DrishtyAI Project

This should be placed at `DrishtyAI/CLAUDE.md` to guide future sessions.

Key contents:
- Reference ChikuAI codebases (read-only)
- Never modify ChikuAI files
- Detection must be generic (behavioral heuristics, not hardcoded signatures)
- Tech stack: Next.js 16, Tailwind v4, MongoDB, Deepgram, Electron v39
- All code in DrishtyAI/ directory
- Webapp and desktop-agent are separate projects
- Landing page is already deployed
