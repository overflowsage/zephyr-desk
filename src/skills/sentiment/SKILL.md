# SKILL: Market Sentiment & Positioning Analysis

**Agent:** HERD — Sentiment Analyst  
**Model:** claude-sonnet-4-6  
**Domain:** Consensus, institutional flows, retail mood, options, short interest

---

## 1. Wall Street Consensus

**What to find:**
- Total analyst count with Buy / Hold / Sell ratings (absolute numbers, not just %)
- Average price target and % upside/downside from current price
- Consensus direction over 3 months: rising, flat, or drifting down

**Interpretation:**
- 90% Buy ratings = expectations already high; stock must beat to move
- Quietly falling consensus PT over 3 months = institutional caution not visible in headlines
- Low analyst coverage = less efficient pricing, more opportunity for surprise
- New coverage initiations = often precede institutional buying programs

**Contrarian signal:**
When 85%+ of analysts rate Buy and the stock is near the average price target, there's no buying power left from this group. Any disappointment = sharp sell-off.

---

## 2. Institutional Positioning (13F Analysis)

**The 13F filing system:**
- Institutional investors (>$100M AUM) must file 13F quarterly
- Filed 45 days after quarter end — always delayed data, but structural signal
- Look for: net new positions, increased stakes, closed positions

**Key divergences to flag:**
| Institutional Behavior | Analyst Rating | Signal |
|------------------------|----------------|--------|
| Quietly selling | Buy rated | Bearish divergence — most actionable |
| Quietly buying | Neutral/Sell | Bullish divergence — most actionable |
| Holding stable | Any | Neutral, confirms conviction |
| Multiple closing | Buy rated | Serious warning |

**High-conviction signals:**
- Hedge fund with strong track record opens new position = meaningful
- Index fund buying = mechanical, not signal
- Concentrated positions (>5% of portfolio) = very high conviction

---

## 3. Retail Sentiment

**StockTwits signals:**
- Bullish % > 75%: retail euphoria — historically contrarian bearish signal near tops
- Bullish % < 25%: retail capitulation — often near bottoms
- Spike in post volume: event-driven attention, not usually durable
- Persistent bullish retail + institutional selling = classic distribution

**Reddit/Social media signals:**
- Meme stock dynamics: can produce violent short-term squeezes
- Retail momentum follows news, rarely leads it
- Useful for: understanding retail positioning vs. institutional

**Retail vs. institutional divergence:**
- Retail bullish + institutional selling = distribution happening
- Retail bearish + institutional buying = accumulation happening
- Both aligned = trend continuation likely

---

## 4. Options Market Signals

**Put/Call Ratio:**
- PCR > 1.0 = more puts than calls = hedging or bearish speculation
- PCR < 0.7 = more calls = bullish speculation
- Extreme low PCR (< 0.5) = euphoria, often contrarian warning
- PCR spike to > 2.0 = capitulation fear, often near bottoms

**Implied Volatility (IV):**
- High IV = options are expensive; premium sellers have edge
- Low IV = options are cheap; directional buyers have edge
- IV crush post-earnings: options lose value rapidly after binary event

**Unusual options activity:**
- Large block trades far out-of-the-money = someone positioning for big move
- Call sweeps (aggressive buying across multiple exchanges) = bullish signal
- Put sweeps with large premium = protective hedging or directional bet

**Skew:**
- Upside skew (calls more expensive than puts) = market pricing in upside surprise
- Downside skew (puts more expensive) = market hedging against downside

---

## 5. Short Interest Analysis

**Key metrics:**
- Short interest % of float: what % of available shares are sold short
- Days to cover (short ratio): Short Interest ÷ Average Daily Volume
  - >10 days = significant squeeze risk if stock rises
  - <3 days = easy to cover, less squeeze potential

**Interpreting short interest:**
| Short Interest | Direction | Interpretation |
|----------------|-----------|----------------|
| >20% of float | Rising | Strong bearish conviction, high squeeze potential |
| >20% of float | Falling | Shorts covering = bearish thesis failing |
| <5% of float | Any | Low conviction either direction |
| High + positive catalyst | Coming | Classic short squeeze setup |

**Short squeeze conditions:**
1. High short interest (>15% of float)
2. Low days-to-cover float
3. Positive catalyst approaching
4. Retail momentum building

---

## 6. Positioning Story Integration

**Build the complete picture:**
1. Wall Street bullish consensus → already priced in or still room to run?
2. Institutions buying or selling on that consensus?
3. Retail aligned or divergent from institutions?
4. Options confirming or contradicting the consensus?
5. Short interest as headwind (bearish overhang) or coiled spring (squeeze fuel)?

**The most actionable signals are always divergences.** When multiple data sources agree, you're late. When they disagree, there's an edge.

---

## 7. Output Format for HERD Reports

```
[Wall Street: X Buy / Y Hold / Z Sell — avg PT $XX (+/-Y% from current) — consensus trending up/flat/down]
[Institutional: net buyers/sellers — key divergence if any between ratings and actual flows]
[Retail: StockTwits mood — aligned with or diverging from institutional?]
[Options: PCR at X — bullish/bearish/neutral signal — any unusual activity?]
[Short interest: X% of float — rising/falling — squeeze risk or clean headwind?]
[Key divergence flagged: ...]
```

**Sources to search:**
- `stockanalysis.com/stocks/{TICKER}/forecast/`
- `marketbeat.com/stocks/{EXCHANGE}/{TICKER}/forecast/`
- `finviz.com/quote.ashx?t={TICKER}`
- `stocktwits.com/symbol/{TICKER}`
- `finance.yahoo.com` (options tab)
