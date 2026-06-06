# ⚡ Zephyr Analyst Desk

> Six AI analysts. One verdict. Live data. No fluff.

`ZEPHYR` · `KOVA` · `RAZE` · `FLARE` · `HERD` · `VEIL`

---

## What Is This

Zephyr Analyst Desk is a multi-agent stock analysis MCP plugin for Claude. Ask it about any stock and six specialized AI analysts run in parallel — each searching live web data in their domain — then a senior lead synthesizes their findings into a structured, opinionated research report with a clear verdict.

The core idea is specialization plus parallel execution. A single model asked "analyze NVDA" produces one perspective. Zephyr runs five distinct analysts simultaneously — fundamentals, technical, news, sentiment, and risk — each with a dedicated job, a defined methodology, and specific live sources to search. The team lead (ZEPHYR, powered by Opus 4.8) reads all five reports and does something harder than aggregation: it finds where they agree, surfaces where they contradict, and writes an editorial synthesis with a position. Contradictions between analysts are often the most important insight, not a problem to smooth over.

This produces analysis that would take a human analyst hours to assemble — in under two minutes, with live data, at every step.

---

## The Team

| Agent | Role | Model | Searches | Depth |
|-------|------|-------|----------|-------|
| ⚡ **ZEPHYR** | Team Lead & Synthesizer | Opus 4.8 | Team reports | Editorial synthesis, verdict, 20yr PM judgment |
| 💼 **KOVA** | Fundamentals | Sonnet 4.6 | Yahoo Finance, StockAnalysis, Macrotrends, SEC EDGAR | Revenue, margins, FCF, ROIC, valuation, earnings quality |
| 📈 **RAZE** | Technical | Sonnet 4.6 | Finviz, Yahoo Finance, StockAnalysis | Multi-timeframe trend, support/resistance, momentum, volume, relative strength |
| 🔥 **FLARE** | News & Catalysts | Sonnet 4.6 | Yahoo News, EarningsWhispers, SeekingAlpha, Reuters | Upcoming events, probability scenarios, analyst actions, management tone |
| 🧠 **HERD** | Sentiment & Positioning | Sonnet 4.6 | StockTwits, MarketBeat, Finviz, 13F filings, Options | Consensus, institutional vs retail divergence, options flow, short interest |
| ⚠️ **VEIL** | Risk | Sonnet 4.6 | SEC EDGAR, Reuters, FT, Court records, Finviz | 3 company-specific risks, historical analogues, thesis-breaker scenario |

---

## How It Works

```
You: "Analyze TSLA"
        │
        ▼
┌───────────────────────────────────────────────────┐
│  ZEPHYR resolves ticker metadata                  │
│  Briefs the team — parallel execution begins      │
└───────────────────────────────────────────────────┘
        │
        ├──── 💼 KOVA  → searches financials live
        ├──── 📈 RAZE  → searches price/chart live
        ├──── 🔥 FLARE → searches news/events live      (all 5 at once)
        ├──── 🧠 HERD  → searches sentiment live
        └──── ⚠️  VEIL  → searches risk factors live
        │
        ▼
┌───────────────────────────────────────────────────┐
│  ⚡ ZEPHYR reads all 5 reports                    │
│  Finds agreements → conviction signals            │
│  Surfaces contradictions → most important insight │
│  Writes editorial synthesis + structured verdict  │
└───────────────────────────────────────────────────┘
        │
        ▼
  Full formatted report · Saved to ~/.zephyr/reports/
  Cached 4 hours · Not financial advice
```

---

## What You Get

| Section | What It Covers |
|---------|---------------|
| **The Situation** | Company phase, dominant narrative, why it matters right now |
| **Business Health** | Revenue quality, margins, FCF, ROIC, valuation vs peers — KOVA's findings |
| **What the Chart Says** | Trend, support/resistance with explanations, momentum, volume, setup verdict — RAZE |
| **What's Coming** | Next 60-day catalysts with bull/bear scenarios and probability estimates — FLARE |
| **What the Market Thinks** | Wall Street consensus, institutional vs retail divergence, options, short interest — HERD |
| **What Could Go Wrong** | 3 company-specific risks with mechanism, probability, impact, leading indicators — VEIL |
| **ZEPHYR's Verdict** | Full synthesis + Outlook / Best Case / Base Case / Worst Case / Watch For |

---

## Installation

### What You Need First

- **Node.js 20+** — download at [nodejs.org](https://nodejs.org)
- **Anthropic API key** — get at [console.anthropic.com](https://console.anthropic.com)
- **Brave Search API key** — free tier at [brave.com/search/api](https://brave.com/search/api) *(needed for live web data)*

---

### Step 1 — Clone and build

```bash
git clone https://github.com/overflowsage/zephyr-desk.git
cd zephyr-desk
npm install
npm run build
```

Verify it built correctly:

```bash
node dist/index.js --version
# → zephyr-mcp v1.0.0
```

---

### Step 2 — Add to Claude

**Find your Claude config file:**

| Platform | Config file location |
|----------|---------------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Claude Code | `~/.claude.json` (user scope) or `.mcp.json` (project scope) |

**Open the config file and add this block** (replace the path and your API keys):

```json
{
  "mcpServers": {
    "zephyr-analyst-desk": {
      "command": "node",
      "args": ["/Users/YOUR_NAME/zephyr-desk/dist/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-key-here",
        "BRAVE_SEARCH_API_KEY": "BSA-your-key-here"
      }
    }
  }
}
```

> **Important:** Use the full absolute path to where you cloned the repo. Replace `YOUR_NAME` with your actual username.

---

### Step 3 — Restart Claude and verify

Restart Claude Desktop (or reload Claude Code), then type:

```
Use zephyr_cache_status
```

If you see a cache directory response — you're connected and ready.

---

## How to Use It

Once installed, just talk to Claude naturally. You don't need to remember tool names.

### Natural language — just ask

```
Analyze TSLA
```
```
Give me a full analysis of NVIDIA
```
```
What does Zephyr think about Apple right now?
```
```
Analyze MSFT — I'm considering buying
```

### Slash command — `/zephyr-desk`

```
/zephyr-desk TSLA
```
```
/zephyr-desk NVDA quick
```
```
/zephyr-desk AAPL risk
```
```
/zephyr-desk MSFT fundamentals
```
```
/zephyr-desk AMZN technical
```
```
/zephyr-desk META news
```
```
/zephyr-desk GOOGL sentiment
```

### Slash command modes

| Command | What runs | Time |
|---------|-----------|------|
| `/zephyr-desk TSLA` | Full 6-agent team analysis | 60–120s |
| `/zephyr-desk TSLA quick` | ZEPHYR only, fast take | 15–30s |
| `/zephyr-desk TSLA fundamentals` | KOVA only — deep financials | 20–40s |
| `/zephyr-desk TSLA technical` | RAZE only — chart analysis | 20–40s |
| `/zephyr-desk TSLA news` | FLARE only — catalysts & events | 20–40s |
| `/zephyr-desk TSLA sentiment` | HERD only — positioning | 20–40s |
| `/zephyr-desk TSLA risk` | VEIL only — risk stress test | 20–40s |
| `/zephyr-desk TSLA cache` | Show cached analyses | <1s |
| `/zephyr-desk TSLA clear` | Clear cache for TSLA | <1s |

### Focused questions

```
/zephyr-desk TSLA quick — is the valuation justified at this price?
```
```
Analyze RIVN — focus on whether cash runway is sufficient
```
```
Run Zephyr on BABA — I want to understand the regulatory risk specifically
```
```
Use zephyr_analyze on NVDA with force_refresh true — earnings were yesterday
```

---

## Tools Reference

Five tools are available directly if you prefer to call them explicitly:

| Tool | Description | Parameters |
|------|-------------|------------|
| `zephyr_analyze` | Full 6-agent team analysis | `ticker` (required), `force_refresh` (optional, default false) |
| `zephyr_quick` | ZEPHYR-only fast take | `ticker` (required), `question` (optional) |
| `zephyr_agent` | Single analyst | `ticker` (required), `agent`: KOVA / RAZE / FLARE / HERD / VEIL |
| `zephyr_cache_clear` | Clear cache | `ticker` (optional) or `all: true` |
| `zephyr_cache_status` | View all cached analyses | none |

---

## Cache & Reports

Every analysis is cached to avoid re-running 6 API calls for the same stock.

| Tool | Cache Duration |
|------|---------------|
| Full analysis | 4 hours |
| Quick take | 1 hour |
| Single agent | 2 hours |

Files are stored in:
```
~/.zephyr/
├── cache/      ← auto-expires (JSON)
└── reports/    ← permanent saved reports (Markdown)
```

Force fresh data anytime:
```
Use zephyr_analyze on NVDA with force_refresh true
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Tool not found after restart | Check the path in your config is the full absolute path to `dist/index.js` |
| `ANTHROPIC_API_KEY not set` | Add the key to the `env` block in your Claude config file |
| Web search returns no results | Add `BRAVE_SEARCH_API_KEY` to the env block — agents will warn if it's missing |
| Response takes 2+ minutes | Normal for full team — 5 parallel live web searches. Use `quick` mode for speed |
| Report looks outdated | Use `force_refresh: true` or run `/zephyr-desk TICKER clear` first |
| Build fails | Run `node --version` — must be 20 or higher. Then `npm install` again |

---

## Project Structure

```
zephyr-desk/
├── src/
│   ├── index.ts              ← MCP server entry, tool registration
│   ├── types.ts              ← TypeScript interfaces, agent colors, models
│   ├── agents/
│   │   ├── zephyr.ts         ← Team Lead — Opus 4.8, synthesis
│   │   ├── kova.ts           ← Fundamentals — Sonnet 4.6
│   │   ├── raze.ts           ← Technical — Sonnet 4.6
│   │   ├── flare.ts          ← News & Catalysts — Sonnet 4.6
│   │   ├── herd.ts           ← Sentiment — Sonnet 4.6
│   │   └── veil.ts           ← Risk — Sonnet 4.6
│   ├── tools/
│   │   ├── analyze.ts        ← zephyr_analyze (full team)
│   │   ├── quick.ts          ← zephyr_quick (ZEPHYR only)
│   │   ├── agent.ts          ← zephyr_agent (single analyst)
│   │   └── cache.ts          ← zephyr_cache_clear + zephyr_cache_status
│   ├── utils/
│   │   ├── cache.ts          ← file-based cache, TTL, read/write/expire
│   │   ├── formatter.ts      ← Markdown report renderer
│   │   ├── search.ts         ← web search (Brave/Tavily) + Claude tool-use loop
│   │   └── resolver.ts       ← ticker metadata lookup
│   └── skills/               ← analyst methodology reference docs
│       ├── fundamentals/SKILL.md
│       ├── technical-analysis/SKILL.md
│       ├── news-catalysts/SKILL.md
│       ├── sentiment/SKILL.md
│       ├── risk-assessment/SKILL.md
│       ├── macro-environment/SKILL.md
│       └── options-derivatives/SKILL.md
├── .claude/commands/
│   └── zephyr-desk.md        ← /zephyr-desk slash command
├── .mcp.json                 ← Claude Code auto-registration config
├── manifest.json             ← Plugin metadata
├── .env.example              ← Environment variable template
├── package.json
└── tsconfig.json
```

---

## License

MIT — [github.com/overflowsage/zephyr-desk](https://github.com/overflowsage/zephyr-desk)

**Not financial advice. This is a research tool. Always do your own due diligence before making any investment decision.**
