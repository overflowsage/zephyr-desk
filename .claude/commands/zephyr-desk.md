# /zephyr-desk

Run the full Zephyr Analyst Desk on any stock ticker.

**Usage:**
- `/zephyr-desk TSLA` — full 6-agent team analysis
- `/zephyr-desk NVDA quick` — fast ZEPHYR-only take
- `/zephyr-desk AAPL risk` — VEIL risk analyst only
- `/zephyr-desk MSFT fundamentals` — KOVA fundamentals only
- `/zephyr-desk AMZN technical` — RAZE chart analysis only
- `/zephyr-desk META news` — FLARE catalysts only
- `/zephyr-desk GOOGL sentiment` — HERD sentiment only

---

Parse the ticker and mode from the user's message (first word after the command = ticker, second word if present = mode).

**If mode is empty or "full" → call `zephyr_analyze`:**

Show this first, then call the tool:

```
⚡ ZEPHYR ANALYST DESK
Briefing team for {TICKER}...

💼 KOVA   Fundamentals  ···
📈 RAZE   Technical     ···
🔥 FLARE  News          ···
🧠 HERD   Sentiment     ···
⚠️  VEIL   Risk          ···
```

**If mode is "quick" → call `zephyr_quick`** with the ticker.

**If mode is "fundamentals" or "kova" → call `zephyr_agent`** with ticker and agent=KOVA.

**If mode is "technical" or "chart" or "raze" → call `zephyr_agent`** with ticker and agent=RAZE.

**If mode is "news" or "catalysts" or "flare" → call `zephyr_agent`** with ticker and agent=FLARE.

**If mode is "sentiment" or "herd" → call `zephyr_agent`** with ticker and agent=HERD.

**If mode is "risk" or "veil" → call `zephyr_agent`** with ticker and agent=VEIL.

**If mode is "cache" → call `zephyr_cache_status`.**

**If mode is "clear" → call `zephyr_cache_clear`** with the ticker.

Return the tool result directly. Do not add commentary — the report speaks for itself.
