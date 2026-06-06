<div align="center">

# ⚡ Zephyr Analyst Desk

**Six AI analysts. One verdict. Live data. No fluff.**

*The stock research plugin that thinks like a Wall Street desk — not a chatbot.*

[![Node 20+](https://img.shields.io/badge/Node-20%2B-brightgreen.svg)](https://nodejs.org)
[![MCP Plugin](https://img.shields.io/badge/MCP-Plugin-8A2BE2.svg)](https://modelcontextprotocol.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6.svg)](https://www.typescriptlang.org)

</div>

---

## What is this?

You ask: **"Analyze TSLA"**

Six AI analysts deploy in parallel. Each searches live web data in their specific domain. In under two minutes you get a research report that would take a human analyst half a day to produce — formatted, opinionated, and built on data pulled right now.

This is not a chatbot giving you a summary. **This is a research desk.**

---

## Why Zephyr is different

Most AI stock tools ask one model to do everything — one perspective, no specialization, averaged across all domains. Like asking your accountant to also do your legal work and chart your trades.

Zephyr works differently:

- **Specialization** — Each analyst has one job. KOVA only does financials. RAZE only reads charts. VEIL only hunts for what can go wrong. Focused experts beat generalists.
- **Parallel execution** — All five analysts run simultaneously. The full team completes in the same time one analyst would.
- **Contradiction surfacing** — When KOVA says the business is healthy and VEIL finds a hidden debt risk, ZEPHYR doesn't smooth it over. It flags the tension. Contradictions between analysts are often the most important insight in the entire report.
- **Editorial judgment** — ZEPHYR reads all five reports as a senior PM — with skepticism, with voice, with a position. Not a summary. A verdict.
- **Live data** — Every agent searches the web during your request. No stale training data.

---

## Meet the team

| | Analyst | Role | Background | Searches |
|--|---------|------|------------|---------|
| ⚡ | **ZEPHYR** | Team Lead | 20yr PM. Morgan Stanley sell-side → $12B long-only → long/short hedge fund. Reads all five reports, finds the signal in the noise, takes a position. | Synthesis only |
| 💼 | **KOVA** | Fundamentals | 15yr Goldman Sachs equity research → PM at $4B long/short. Knows which numbers companies bury in footnotes — and why. | Yahoo Finance · SEC EDGAR · StockAnalysis |
| 📈 | **RAZE** | Technical | 12yr prop trading desk. Treats charts as probability maps, not crystal balls. Multi-timeframe: monthly → weekly → daily. | Finviz · Yahoo Finance · Macrotrends |
| 🔥 | **FLARE** | News & Catalysts | 13yr event-driven fund. Knows the difference between a genuine catalyst and a press release dressed up as one. Assigns probability to each. | Yahoo News · EarningsWhispers · Reuters |
| 🧠 | **HERD** | Sentiment & Positioning | 14yr quantitative macro fund. What investors SAY and what they DO are often different things. The gap is where real signal lives. | 13F filings · StockTwits · Options flow |
| ⚠️ | **VEIL** | Risk | 16yr — 8yr short-seller, 8yr head of risk. Has been right on shorts before the market saw them coming. The permanent skeptic. | SEC EDGAR · Reuters · Court records · FT |

---

## What you get

```
╔══════════════════════════════════════════════════════════════════╗
║  ⚡ ZEPHYR ANALYST DESK                                          ║
║  TSLA · Tesla, Inc. · Consumer Cyclical · NASDAQ                 ║
║  2026-06-07 · 14:32 UTC · Live Data                              ║
╠══════════════════════════════════════════════════════════════════╣
║  TEAM: ZEPHYR · KOVA · RAZE · FLARE · HERD · VEIL               ║
╚══════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────┐
│  🔍  THE SITUATION                                               │
└─────────────────────────────────────────────────────────────────┘
  What phase the company is in, dominant market narrative,
  what has driven price action, and the current investment question.

┌─────────────────────────────────────────────────────────────────┐
│  💼  BUSINESS HEALTH                                    · KOVA  │
└─────────────────────────────────────────────────────────────────┘
  Revenue quality, margins vs peers, FCF, ROIC vs cost of capital,
  valuation calibration, management credibility.
  GREEN FLAGS: ...  |  CONCERNS: ...

┌─────────────────────────────────────────────────────────────────┐
│  📈  WHAT THE CHART SAYS                                · RAZE  │
└─────────────────────────────────────────────────────────────────┘
  Trend direction, key support & resistance with explanations,
  volume story, setup verdict, explicit stop level.

┌─────────────────────────────────────────────────────────────────┐
│  🔥  WHAT'S COMING                                     · FLARE  │
└─────────────────────────────────────────────────────────────────┘
  · Jun 18 — Earnings  ↑ Bull (~65%): beat + guidance raise +12%
                       ↓ Bear (~35%): miss + guidance cut  -18%
  ★ BIGGEST CATALYST: ...

┌─────────────────────────────────────────────────────────────────┐
│  🧠  WHAT THE MARKET THINKS                             · HERD  │
└─────────────────────────────────────────────────────────────────┘
  Analyst consensus, institutional 13F flows vs published ratings,
  retail sentiment as contrarian signal, short interest dynamics.

┌─────────────────────────────────────────────────────────────────┐
│  ⚠️   WHAT COULD GO WRONG                               · VEIL  │
└─────────────────────────────────────────────────────────────────┘
  3 company-specific risks — each with mechanism, historical
  analogue, probability, impact, and leading indicator.
  THESIS-BREAKER: What makes this worth half in 24 months?

╔══════════════════════════════════════════════════════════════════╗
║  🎯  ZEPHYR'S VERDICT                                           ║
╠══════════════════════════════════════════════════════════════════╣
║  Outlook      │ 🟡 Cautiously Bullish                           ║
║  Time Horizon │ Medium 3–12mo                                   ║
║  Best Case    │ [what goes right + upside %]                    ║
║  Base Case    │ [most probable path]                            ║
║  Worst Case   │ [top risk materializes + downside %]            ║
║  This Is For  │ [specific investor profile]                     ║
║  Watch For    │ [the one signal that changes everything]        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Installation

### Requirements

- [Node.js 20+](https://nodejs.org)
- [Anthropic API key](https://console.anthropic.com)
- [Brave Search API key](https://brave.com/search/api) *(free tier works)*

### Step 1 — Clone and build

```bash
git clone https://github.com/overflowsage/zephyr-desk.git
cd zephyr-desk
npm install
npm run build
```

Verify:

```bash
node dist/index.js --version
# zephyr-mcp v1.0.0
```

### Step 2 — Register in Claude

Open your Claude config file:

| Platform | Config path |
|----------|-------------|
| Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Claude Code | `~/.claude.json` |

Add this block:

```json
{
  "mcpServers": {
    "zephyr-analyst-desk": {
      "command": "node",
      "args": ["/full/path/to/zephyr-desk/dist/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-...",
        "BRAVE_SEARCH_API_KEY": "BSA-..."
      }
    }
  }
}
```

### Step 3 — Restart Claude and verify

```
Use zephyr_cache_status
```

If you see a cache directory response — the desk is open.

---

## Usage

### Natural language

```
Analyze TSLA
```
```
What does Zephyr think about NVIDIA before earnings?
```
```
Run Zephyr on MSFT — I'm considering a position
```
```
Is BABA's valuation justified at this multiple?
```

### Slash command

```
/zephyr-desk TSLA
```

### Focused modes

| Mode | Command | What runs | Time |
|------|---------|-----------|------|
| Full analysis | `/zephyr-desk TSLA` | All 6 agents | 60–120s |
| Quick take | `/zephyr-desk TSLA quick` | ZEPHYR only | 15–30s |
| Fundamentals deep dive | `/zephyr-desk TSLA fundamentals` | KOVA | 20–40s |
| Chart analysis | `/zephyr-desk TSLA technical` | RAZE | 20–40s |
| Upcoming catalysts | `/zephyr-desk TSLA news` | FLARE | 20–40s |
| Positioning breakdown | `/zephyr-desk TSLA sentiment` | HERD | 20–40s |
| Risk stress test | `/zephyr-desk TSLA risk` | VEIL | 20–40s |
| Check cache | `/zephyr-desk TSLA cache` | — | instant |
| Clear cache | `/zephyr-desk TSLA clear` | — | instant |

### Ask a specific question

```
/zephyr-desk RIVN quick — does the cash runway reach profitability?
```
```
Analyze BABA — focus on the actual regulatory risk, not the narrative
```

---

## Cache & Reports

Analyses are cached so follow-up questions don't re-run 6 API calls.

| Type | Cached for |
|------|-----------|
| Full team analysis | 4 hours |
| Quick take | 1 hour |
| Single agent | 2 hours |

Reports are permanently saved as Markdown at `~/.zephyr/reports/`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Tool not found | Use the **full absolute path** in config — not relative |
| `ANTHROPIC_API_KEY not set` | Add to the `env` block in Claude config |
| Agents report missing data | Add `BRAVE_SEARCH_API_KEY` to env — enables live web search |
| Response takes 2+ min | Normal for full team. Use `quick` mode when speed matters |
| Stale report | Add `force_refresh: true` or clear cache first |
| Build errors | Run `node --version` — must be 20+, then `npm install` again |

---

## Project structure

```
zephyr-desk/
├── src/
│   ├── index.ts                 ← MCP server entry point
│   ├── types.ts                 ← types, colors, model config
│   ├── agents/
│   │   ├── zephyr.ts            ← Team Lead (synthesis + quick analysis)
│   │   ├── kova.ts              ← Fundamentals analyst
│   │   ├── raze.ts              ← Technical analyst
│   │   ├── flare.ts             ← News & catalysts analyst
│   │   ├── herd.ts              ← Sentiment & positioning analyst
│   │   └── veil.ts              ← Risk analyst
│   ├── tools/
│   │   ├── analyze.ts           ← Full parallel team run
│   │   ├── quick.ts             ← ZEPHYR-only fast take
│   │   ├── agent.ts             ← Single analyst dispatch
│   │   └── cache.ts             ← Cache management tools
│   ├── utils/
│   │   ├── cache.ts             ← TTL cache read/write/expire
│   │   ├── formatter.ts         ← Report renderer (box-drawing ASCII)
│   │   ├── search.ts            ← Brave/Tavily + Claude tool-use loop
│   │   └── resolver.ts          ← Yahoo Finance ticker lookup
│   └── skills/                  ← Analyst methodology reference docs
│       ├── fundamentals/
│       ├── technical-analysis/
│       ├── news-catalysts/
│       ├── sentiment/
│       ├── risk-assessment/
│       ├── macro-environment/
│       └── options-derivatives/
├── .claude/commands/
│   └── zephyr-desk.md           ← /zephyr-desk slash command
├── .mcp.json                    ← Claude Code project registration
├── manifest.json                ← Plugin metadata
└── .env.example
```

---

<div align="center">

**⚡ Zephyr Analyst Desk** · Version 1.0.0 · MIT License

*Not financial advice. Research tool only. Always do your own due diligence.*

[GitHub](https://github.com/overflowsage/zephyr-desk) · [Issues](https://github.com/overflowsage/zephyr-desk/issues)

</div>
