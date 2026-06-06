# SKILL: Options & Derivatives Intelligence

**Agent:** HERD (primary) / VEIL (tail risk context)  
**Domain:** Options flow, implied volatility, Greeks, positioning signals

---

## 1. Options Basics for Stock Analysis

Options give the right (not obligation) to buy (call) or sell (put) shares at a specified price (strike) by a specified date (expiry).

**Why options matter for stock analysis:**
- They reveal what the "smart money" is paying to position for
- Implied volatility tells you what move the market expects
- Unusual flow often precedes major moves by days or weeks
- Put/call ratio is a sentiment thermometer

---

## 2. Put/Call Ratio (PCR) Interpretation

```
PCR = Total Put Volume ÷ Total Call Volume
```

| PCR Level | Interpretation | Contrarian Signal? |
|-----------|---------------|-------------------|
| < 0.5 | Extreme bullish speculation | ⚠️ Often near tops |
| 0.5–0.7 | Moderately bullish | Neutral |
| 0.7–1.0 | Balanced / slight caution | Neutral |
| 1.0–1.5 | Elevated hedging | Mild contrarian bullish |
| > 1.5 | Fear/panic hedging | ✅ Often near bottoms |

**PCR as contrarian tool:** Extreme readings in either direction tend to precede reversals because positioning has become one-sided.

---

## 3. Implied Volatility (IV) Analysis

**Implied Volatility (IV):**
IV is the market's forecast of future price movement embedded in options prices.

```
Expected Move = Stock Price × IV × √(Days/365)
Example: $100 stock, IV=40%, 30 days → Expected move = $100 × 0.40 × √(30/365) ≈ ±$11.5
```

**IV Rank (IVR) and IV Percentile:**
- IVR > 50: IV is elevated vs. historical range → options are expensive → favor selling premium
- IVR < 30: IV is compressed → options are cheap → favor buying premium for events

**IV before earnings:**
- IV always rises into earnings (uncertainty premium)
- IV collapses after earnings regardless of direction (IV crush)
- The implied move = what the market expects; actual move vs. implied = the trade

---

## 4. The Greeks (for Risk Context)

| Greek | Meaning | Portfolio Implication |
|-------|---------|----------------------|
| Delta | Rate of change vs. stock price | Call delta = 0.5 means option gains $0.50 per $1 stock move |
| Gamma | Rate of change of delta | High gamma near expiry = explosive moves |
| Theta | Time decay | Options lose value daily; sellers collect it |
| Vega | Sensitivity to IV | High vega = value changes a lot when IV changes |

**For stock analysis:** Focus on delta (directional positioning) and vega (IV regime).

---

## 5. Unusual Options Activity (UOA)

**What qualifies as "unusual":**
- Volume > 3x average daily options volume
- Large block trades (>500 contracts) in single transaction
- Far out-of-the-money strikes with significant premium paid
- Activity concentrated in near-term expiry (speculative) vs. LEAPS (hedging)

**Bullish UOA signals:**
- Large call sweeps above the ask price (aggressive buying)
- OTM calls with large premium, weeks before earnings
- Significant call buying with stock flat or down (buying the dip via options)

**Bearish UOA signals:**
- Large put sweeps below bid price (aggressive selling pressure)
- Unusual put buying when stock is at highs
- Rolling protective puts to higher strikes (insiders hedging)

**Where to find UOA:** Unusual Whales, Market Chameleon, Barchart unusual activity screeners

---

## 6. Options Market Structure

**Term structure of volatility:**
- Normal (contango): Near-term IV < Long-term IV (calm markets)
- Backwardation: Near-term IV > Long-term IV (market expects near-term event)
- Steep backwardation before earnings = market pricing in very large move

**Skew:**
- **Downside skew** (puts more expensive than calls at same distance from ATM): Market hedging downside, bearish lean
- **Upside skew** (calls more expensive): Market pricing in squeeze or runaway upside
- Flat skew: Market sees equal probability of up/down moves

---

## 7. Short Interest Integration with Options

**Classic short squeeze setup checklist:**
- [ ] Short interest > 15% of float
- [ ] Days to cover > 5
- [ ] Rising IV (options getting expensive = positioning for move)
- [ ] PCR declining (more calls = traders betting on squeeze)
- [ ] Positive catalyst upcoming
- [ ] Stock near technical breakout level

**Not a squeeze setup:**
- Low short interest + high call volume = regular bullish positioning
- High short interest + high put volume = shorts adding via options (adding to the short thesis)

---

## 8. Output Integration for HERD Reports

When incorporating options data:

```
"The options market is pricing an implied move of ±X% for the upcoming 
earnings — suggesting the market expects a significant reaction. Put/call 
ratio at Y implies [bullish speculation / defensive hedging / fear]. 
Notable: [any unusual activity worth flagging]."
```

**Sources:**
- `finance.yahoo.com` (options chain)
- `finviz.com` (short interest, basic options data)
- Unusual Whales, Market Chameleon (UOA — free tiers available)
