# SKILL: Risk Assessment & Stress Testing

**Agent:** VEIL — Risk Analyst  
**Model:** claude-sonnet-4-6  
**Domain:** Downside scenarios, company-specific threats, thesis-breaker identification

---

## 1. Risk Specificity Requirement

**The cardinal rule:** Every risk must be specific to this company at this moment.

| Generic (REJECT) | Specific (ACCEPT) |
|------------------|-------------------|
| "Competition risk" | "Microsoft bundling equivalent features into Azure at zero marginal cost, targeting TICKER's enterprise customer base directly" |
| "Regulatory risk" | "FTC antitrust investigation into TICKER's acquisition of CompanyX — potential forced divestiture of the segment generating 40% of revenue" |
| "Economic slowdown risk" | "TICKER's 73% revenue exposure to SMB segment, which historically cuts software spend first in recessions — enterprise-mix shift won't happen fast enough to cushion it" |
| "Key person risk" | "CEO announced retirement with no obvious internal successor; the street is pricing in his continued strategy execution through 2027" |

---

## 2. Risk Probability & Impact Matrix

**Probability:**
- **Low:** < 20% chance of materializing in next 12-24 months
- **Medium:** 20–50% chance — elevated but uncertain
- **High:** > 50% chance — likely unless company takes action

**Impact:**
- **Low:** < 10% stock impact, manageable, short-term
- **Medium:** 10–30% stock impact, multi-quarter recovery needed
- **High:** > 30% stock impact, thesis-level damage, potentially irreversible

**Matrix priority:**
```
          LOW Impact | MED Impact | HIGH Impact
LOW Prob  | Monitor  | Watch      | Tail risk
MED Prob  | Watch    | Flag       | MAJOR FLAG
HIGH Prob | Flag     | MAJOR FLAG | Thesis breaker
```

---

## 3. Risk Categories to Evaluate

**Competitive threats:**
- Specific competitor with named product/service eating into market share
- Pricing pressure mechanism (who is cutting prices and why)
- Technology disruption (AI replacing product, cloud commoditizing on-premise)

**Financial risks:**
- Debt maturity wall: when does the debt come due, at what rate can they refinance?
- Customer concentration: if top 3 customers = >30% of revenue, that's fragile
- Covenant breach risk: if EBITDA declines X%, what covenants trip?
- Dilution risk: if FCF negative, when do they need to raise and at what discount?

**Regulatory/Legal risks:**
- Active investigations (search SEC enforcement actions)
- Pending litigation with >$100M exposure
- Regulatory rule changes that increase compliance costs significantly
- Export control restrictions (especially semiconductor/defense tech)

**Operational risks:**
- Supply chain single-source dependencies
- Key facilities (one factory = one fire = catastrophe)
- Talent concentration: if 3 engineers leave, does the product ship?
- Cybersecurity: recent breach history, data handling at scale

**Macro/Structural risks:**
- Customer segment cyclicality (SMB vs. enterprise, consumer vs. corporate)
- Geographic revenue concentration (e.g., 60% China exposure for US company)
- Secular headwinds (print advertising, physical retail, fossil fuel infrastructure)

---

## 4. Leading Indicators System

For each risk, identify one measurable signal that it's getting worse:

| Risk Type | Leading Indicator |
|-----------|-------------------|
| Competitive | Customer win/loss ratio disclosed in earnings |
| Financial | Accounts payable days stretching (paying suppliers later) |
| Regulatory | DOJ/FTC subpoenas, comment letters, HSR filing scrutiny |
| Operational | Employee satisfaction (Glassdoor trends), voluntary attrition |
| Customer | Net Revenue Retention declining, churn % disclosed |
| Macro | PMI for customer industry, credit spreads for leveraged balance sheets |

---

## 5. Thesis-Breaker Identification

**The thesis-breaker question:**
*"What would need to happen for this stock to be worth half its current price in 24 months?"*

This forces specificity. A 50% decline requires:
- Revenue growth reversing to decline, OR
- Multiple compression from 40x to 15x earnings, OR
- Balance sheet event (covenant breach, forced equity raise at distress prices), OR
- Competitive displacement of core revenue stream

**Answer the question literally.** State the scenario with dollar magnitude:
- "If AWS enters this market at cost, TICKER loses its 35% gross margin advantage. At current revenue, that's $2B of gross profit gone, pushing EBITDA negative, collapsing the multiple from 25x to 8x, implying ~$45/share vs. current ~$90."

---

## 6. SEC Filing Research Protocol

**Key documents:**
- 10-K: Annual report — "Risk Factors" section is legally required to be comprehensive
- 10-Q: Quarterly — check for new risk disclosures, legal proceedings
- 8-K: Current reports — material events (lawsuits, executive changes, guidance updates)
- Form 4: Insider transactions (heavy selling = watch closely)

**Search:** `sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={TICKER}&type=10-K`

**What to look for in Risk Factors:**
- Risks added since the prior 10-K (new = management identified something new)
- Risks that expanded significantly (lengthening = more concerned)
- Order of risks (most material typically listed first)

---

## 7. Output Format for VEIL Reports

```
RISK 1: [Specific descriptive name]
Why it matters: [Exact mechanism of damage]
Probability: [Low/Med/High] — [one sentence why]
Impact: [Low/Med/High] — [what damage looks like in dollar/% terms]
Watch for: [one leading indicator]

RISK 2: [Specific descriptive name]
[same structure]

RISK 3: [Specific descriptive name]
[same structure]

THESIS-BREAKER: [What would make this stock worth half in 24 months — specific scenario]
```

**Sources to search:**
- `sec.gov` (EDGAR) — latest 10-K Risk Factors
- `reuters.com` — search company name + "risk" or "lawsuit"
- `ft.com` — financial and regulatory threats
- `finviz.com` — debt levels, short interest
