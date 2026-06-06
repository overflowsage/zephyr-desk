# SKILL: Financial Fundamentals Analysis

**Agent:** KOVA — Fundamentals Analyst  
**Model:** claude-sonnet-4-6  
**Domain:** Business quality, financial health, valuation

---

## 1. Revenue Analysis

**What to measure:**
- Year-over-year (YoY) growth rate for each of the last 4 quarters
- Quarter-over-quarter (QoQ) acceleration or deceleration trend
- Revenue quality: organic vs. acquisition-driven (organic commands a premium multiple)

**Interpretation:**
- Accelerating growth + organic = strongest signal for expansion multiple
- Decelerating growth = watch for multiple compression even if absolute numbers are fine
- Revenue beats guidance consistently = management credibility premium

**Key question:** Is growth getting faster or slower, and why?

---

## 2. Profitability Metrics

| Metric | What It Tells You | Red Flag Threshold |
|--------|-------------------|-------------------|
| Gross Margin | Pricing power and cost structure | Compression >2pp QoQ without explanation |
| Operating Margin | Operational efficiency | Negative and widening |
| Net Margin | After-tax earnings quality | One-time items > 15% of reported earnings |
| EBITDA Margin | Cash generation proxy | Diverging from FCF (potential manipulation) |

**Industry benchmarks (approximate):**
- SaaS: Gross margin 70–85%, operating margin target 20%+
- Semiconductors: Gross margin 50–65%
- Retail: Gross margin 25–45%, thin net margins
- Financials: Net interest margin 2–4%
- Biotech pre-revenue: Burn rate is the metric, not margins

---

## 3. Cash Flow Analysis

**Free Cash Flow (FCF):**
```
FCF = Operating Cash Flow − Capital Expenditures
```
- FCF > Net Income = healthy (non-cash charges doing work)
- FCF < Net Income consistently = question earnings quality
- Negative FCF = burning cash; calculate runway: Cash ÷ Monthly Burn

**Balance sheet health:**
- Net Debt = Total Debt − Cash
- Debt/EBITDA < 3x = manageable; > 5x = stress territory
- Interest coverage = EBIT ÷ Interest Expense; < 3x = watch closely

**Self-funding test:** Can the company fund growth without dilution?
- Yes + generating FCF = strong position
- No = when will they raise, and at what dilution cost?

---

## 4. Valuation Frameworks

**For profitable companies:**
- P/E ratio: compare to sector average and own 3-year history
- PEG ratio = P/E ÷ Growth Rate; < 1 = potentially undervalued
- EV/EBITDA: better than P/E for capital structure comparisons

**For unprofitable/high-growth:**
- P/S ratio: compare to peers at similar growth rates
- Rule of 40: Revenue growth rate + FCF margin; > 40 = healthy SaaS
- Burn multiple = Net Burn ÷ Net New ARR; < 1 = efficient growth

**Valuation vs. history:**
- Cheap vs. own history ≠ cheap vs. fundamentals (could be warranted)
- Always anchor: what growth rate is "priced in" at current multiple?

---

## 5. Red Flag Checklist

| Flag | Mechanism | What to Search |
|------|-----------|----------------|
| Accounts Receivable growing faster than revenue | Revenue recognition pulled forward | AR/Revenue ratio trend |
| Deferred revenue declining | Customers not renewing | YoY deferred revenue change |
| Large insider selling | Insiders know something you don't | SEC Form 4 filings |
| Guidance cuts | Management was wrong or sandbagging | Press releases, earnings calls |
| Audit firm change | Quality concern or pressure | 8-K filings |
| Related party transactions | Potential self-dealing | 10-K footnotes |
| Channel stuffing signals | Inventory buildup, AR spike | Inventory + AR vs. revenue |

---

## 6. Competitive Benchmarking

Compare on the **single most meaningful metric for that business type:**
- SaaS: Net Revenue Retention (NRR) — > 120% = compounding moat
- Consumer: Same-store sales growth
- Pharma: Pipeline value and patent cliff timeline
- Banks: Return on Equity (ROE) and efficiency ratio
- Retailers: Revenue per square foot

Never compare P/E across industries — always compare within category.

---

## 7. Output Format for KOVA Reports

```
[Revenue trend in plain English — growth rate, direction, quality]
[Margin analysis — are they expanding or compressing and why]
[Cash position — runway or FCF generation narrative]
[Valuation read — cheap/fair/expensive vs peers and history]
[One red flag if present — specific, not generic]

GREEN FLAGS: [comma-separated specific items]
CONCERNS: [comma-separated specific items]
```

**Sources to search:**
- `finance.yahoo.com/quote/{TICKER}/financials`
- `stockanalysis.com/stocks/{TICKER}/financials/`
- `macrotrends.net` for historical trends
- `SEC EDGAR` for latest 10-Q or 10-K
