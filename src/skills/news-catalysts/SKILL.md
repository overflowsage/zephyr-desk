# SKILL: News & Catalyst Analysis

**Agent:** FLARE — News & Catalysts Analyst  
**Model:** claude-sonnet-4-6  
**Domain:** Event-driven analysis, upcoming catalysts, analyst actions

---

## 1. Catalyst Classification

**What counts as a genuine catalyst:**
A catalyst is an event with a defined date that has a realistic probability of moving the stock ≥5% on the day.

| Catalyst Type | Examples | Typical Move |
|---------------|----------|-------------|
| Earnings | Quarterly results vs. expectations | 5–20%+ |
| FDA decision | Drug approval/rejection | 20–80% |
| Product launch | Major new product announcement | 3–10% |
| M&A announcement | Merger, acquisition, strategic review | 15–40% |
| Analyst day | Guidance update, long-term targets | 5–15% |
| Legal ruling | Patent decision, antitrust outcome | 10–30% |
| Macro event | Fed rate decision (for rate-sensitive stocks) | 2–8% |
| Contract win/loss | Major customer announcement | 5–15% |

**What does NOT count as a catalyst:**
- Routine SEC filings (10-Q, DEF 14A) with no new information
- Conference participation without new guidance
- Generic "investor day" with no defined target announcements
- Industry conferences unless presenting materially new data

---

## 2. Earnings Analysis

**Key metrics to find:**
- Exact earnings date and time (before/after market)
- Consensus EPS and revenue estimates
- Whisper number (often more accurate than consensus)
- Historical beat/miss rate (last 8 quarters)
- Implied move from options market (check options chain)

**Earnings setup types:**
- **Beat and raise:** Beats estimates AND raises guidance = most bullish
- **Beat but maintain:** Beats but doesn't raise = muted reaction
- **Beat but lower:** Beats but cuts guidance = sells off despite beat
- **Miss:** Below estimates = usually significant downside
- **In-line:** Rarely moves much unless guidance changes

**Source:** `earningswhispers.com` for whisper numbers and date confirmations

---

## 3. Sector-Specific Catalysts

**Biotech/Pharma:**
- PDUFA dates (FDA action dates): binary events, 20–80% moves
- Phase 2/3 trial results: binary, company-specific
- NDA/BLA filings: positive signal 6-12 months before approval
- CRL (Complete Response Letter): usually -30 to -60%
- Search: `clinicaltrials.gov`, `fda.gov/patients/drug-approvals`

**Financials:**
- Fed rate decisions (FOMC meetings): impacts net interest margin
- Stress test results (DFAST): affects dividend/buyback capacity
- Credit cycle indicators: loan loss provisions signal

**Energy:**
- OPEC meeting outcomes: oil price direction
- Inventory reports (EIA weekly): short-term price moves
- rig count data: longer-term supply signal

**Technology:**
- Product launch events (Apple, Google, NVIDIA keynotes)
- Developer conferences: platform ecosystem signals
- Government contract awards: defense tech, cloud

---

## 4. Analyst Action Interpretation

**Rating changes by credibility tier:**

| Tier | Examples | Weight |
|------|----------|--------|
| Highest | Goldman Sachs, Morgan Stanley, JPMorgan | High |
| High | Bank of America, Citigroup, Wells Fargo | High |
| Medium | Raymond James, Piper Sandler, Cowen | Medium |
| Lower | Unknown boutiques, initiations from new coverage | Low |

**Price target moves:**
- PT raise without rating upgrade = mild bullish
- PT cut without downgrade = mild bearish
- Rating upgrade + PT raise = strong bullish (especially from tier-1 firm)
- Multiple firms cutting PT in same week = institutional caution signal

**Contrarian read:** When all analysts rate Buy and PT is only 5% above current price, the bullish case is already priced in.

---

## 5. News Interpretation Framework

**Evaluating news significance:**
1. **New information?** Restatement of known facts = noise
2. **Changes the thesis?** Does this alter revenue trajectory, competitive position, or risk profile?
3. **Market reaction rational?** If stock drops 10% on minor news, that's overreaction. If it barely moves on major news, something is being suppressed.

**Noise vs. signal:**
- Noise: routine partnership announcements, executive speaking engagements, minor product updates
- Signal: major customer wins/losses, CEO departure, regulatory action, accounting restatement, activist investor disclosure

---

## 6. Output Format for FLARE Reports

```
UPCOMING CATALYSTS:
· [Date] — [Event] — [Why it matters for THIS company]
  ↑ Bull: [specific outcome + stock impact]  |  ↓ Bear: [specific outcome + stock impact]

★ BIGGEST CATALYST: [the single event most likely to move this stock]

RECENT NEWS: [2-3 sentences — what happened, significant or noise, market reaction rational?]
ANALYST ACTIONS: [2-3 sentences — who changed what, credible firm?, or "none of note"]
```

**Sources to search:**
- `finance.yahoo.com/quote/{TICKER}/news`
- `earningswhispers.com`
- `seekingalpha.com`
- `globenewswire.com`
- `clinicaltrials.gov` (biotech)
- `federalreserve.gov` (financials)
