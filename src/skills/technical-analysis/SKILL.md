# SKILL: Technical Analysis

**Agent:** RAZE — Technical Analyst  
**Model:** claude-sonnet-4-6  
**Domain:** Price action, chart structure, momentum, volume

---

## 1. Trend Analysis

**Defining the trend:**
- Uptrend: series of higher highs (HH) and higher lows (HL)
- Downtrend: series of lower highs (LH) and lower lows (LL)
- Sideways: price oscillating between defined range, no clear direction

**Trend strength:**
- Strong: ADX > 25, price cleanly above/below major moving averages
- Weakening: price touching moving averages more frequently, ADX declining
- Reversal warning: trend line breaks on high volume, diverging momentum

**Moving averages as trend filters:**
- 50-day MA = intermediate trend; 200-day MA = long-term trend
- Price above both = bullish structure; below both = bearish structure
- Death cross (50 crosses below 200) = bearish; Golden cross = bullish
- The cross itself is lagging — look for it as confirmation, not signal

---

## 2. Support and Resistance

**What makes a level meaningful:**
- Prior significant high or low (price memory)
- Moving average acting as dynamic support/resistance
- Round numbers ($100, $500, etc.) — psychological magnets
- Volume shelf: high-volume consolidation area provides future support
- Gap fills: gaps often attract price back to fill them

**Role reversal principle:**
- Broken support becomes resistance (and vice versa)
- The more times a level is tested, the more significant the break

**How to explain levels without jargon:**
- "Support at $142 — this is where the stock bounced sharply in August, meaning buyers stepped in at this exact price before"
- "Resistance at $167 — the stock hit this twice and was rejected both times; sellers dominated at this level"

---

## 3. Momentum Indicators

**RSI (Relative Strength Index, 0–100):**
- > 70 = overbought: price has run hard, statistically prone to pullback
- < 30 = oversold: price beaten down, statistically prone to bounce
- 50–70 = bullish momentum zone in strong uptrends
- Divergence: price makes new high but RSI does not = momentum warning

**MACD:**
- Bullish: MACD line crosses above signal line
- Bearish: MACD line crosses below signal line
- Histogram shrinking = momentum fading even if trend intact

**Stochastic:**
- > 80 = overbought territory
- < 20 = oversold territory
- Most useful in ranging (sideways) markets

**Plain English rule:** Never say "RSI is 68." Say "RSI at 68 means the stock is approaching overbought territory — it can keep running, but the odds of a near-term pause increase."

---

## 4. Volume Analysis

**Volume confirms price:**
- Rising price + rising volume = conviction move — buyers committed
- Rising price + falling volume = suspect rally — weak hands driving it
- Falling price + rising volume = distribution — smart money selling
- Falling price + falling volume = normal consolidation — sellers exhausted

**Key volume events:**
- Volume spike on breakout = legitimate move; likely to hold
- Volume spike on breakdown = serious — panic selling or institutional exit
- Climax volume (2-3x normal on reversal day) = potential exhaustion

**Where to find volume data:**
- `finviz.com/quote.ashx?t={TICKER}`
- `finance.yahoo.com/quote/{TICKER}` (chart view)

---

## 5. Chart Patterns

| Pattern | What It Signals | Confirmation |
|---------|----------------|--------------|
| Head and Shoulders | Bearish reversal | Break of neckline on volume |
| Inverse H&S | Bullish reversal | Break of neckline on volume |
| Cup and Handle | Bullish continuation | Handle breakout on rising volume |
| Ascending Triangle | Bullish (usually) | Break above flat resistance |
| Descending Triangle | Bearish (usually) | Break below flat support |
| Bull Flag | Bullish continuation | Break of flag on volume |
| Double Top | Bearish reversal | Break below valley low |
| Double Bottom | Bullish reversal | Break above peak high |

**Important:** Patterns are probabilities, not certainties. Always note the invalidation level.

---

## 6. Setup Quality Assessment

**Rate setups:**
- ✅ **Attractive entry:** Trend intact, price near support, volume confirming, momentum neutral-to-positive
- ⏳ **Wait for better level:** Trend intact but extended from support, or momentum overbought
- ⚠️ **Caution:** Broken trend structure, distribution volume, momentum diverging

**Invalidation levels are mandatory:**
- "The bullish setup is intact above $142. A close below $142 on volume would invalidate it."

---

## 7. Output Format for RAZE Reports

```
[Trend — direction, duration, momentum quality]
[Support at $X — why this price matters]
[Resistance at $Y — why this price matters]
[Momentum — what the reading implies about near-term behavior]
[Volume — confirming or warning]
[Setup quality — one plain sentence]
```

**Sources to search:**
- `finance.yahoo.com/quote/{TICKER}`
- `stockanalysis.com/stocks/{TICKER}/history/`
- `finviz.com/quote.ashx?t={TICKER}`
