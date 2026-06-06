import type { TickerMeta } from '../types.js';
import { MODELS } from '../types.js';
import { callClaude } from './search.js';

const inMemory = new Map<string, { meta: TickerMeta; ts: number }>();
const META_TTL = 10 * 60 * 1000;

async function yahooSummary(ticker: string): Promise<Partial<TickerMeta>> {
  try {
    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=assetProfile,price`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return {};
    const data = (await res.json()) as Record<string, unknown>;
    const qs = data['quoteSummary'] as Record<string, unknown> | undefined;
    const result = ((qs?.['result'] as unknown[]) ?? [])[0] as Record<string, unknown> | undefined;
    if (!result) return {};

    const profile = (result['assetProfile'] ?? {}) as Record<string, unknown>;
    const price = (result['price'] ?? {}) as Record<string, unknown>;

    const rawCap = ((price['marketCap'] as Record<string, unknown>)?.['raw'] as number) ?? 0;
    let marketCap = 'N/A';
    if (rawCap >= 1e12) marketCap = `$${(rawCap / 1e12).toFixed(2)}T`;
    else if (rawCap >= 1e9) marketCap = `$${(rawCap / 1e9).toFixed(2)}B`;
    else if (rawCap >= 1e6) marketCap = `$${(rawCap / 1e6).toFixed(2)}M`;
    else if (rawCap > 0) marketCap = `$${rawCap.toLocaleString()}`;

    return {
      company: String(price['longName'] ?? price['shortName'] ?? ticker),
      exchange: String(price['exchangeName'] ?? 'N/A'),
      sector: String(profile['sector'] ?? 'Unknown'),
      marketCap,
    };
  } catch {
    return {};
  }
}

export async function resolveTicker(ticker: string): Promise<TickerMeta> {
  const upper = ticker.toUpperCase().trim();

  const cached = inMemory.get(upper);
  if (cached && Date.now() - cached.ts < META_TTL) return cached.meta;

  const yahoo = await yahooSummary(upper);

  let meta: TickerMeta = {
    ticker: upper,
    company: yahoo.company ?? upper,
    exchange: yahoo.exchange ?? 'N/A',
    sector: yahoo.sector ?? 'Unknown',
    marketCap: yahoo.marketCap ?? 'N/A',
    resolvedAt: Date.now(),
  };

  // If Yahoo gave us minimal data, enrich via Claude
  if (meta.company === upper || meta.sector === 'Unknown') {
    try {
      const raw = await callClaude({
        model: MODELS.KOVA,
        system:
          'You are a financial data assistant. Return ONLY a valid JSON object — no explanation, no markdown.',
        prompt: `Return metadata for stock ticker ${upper} as JSON:\n{"company":"...","exchange":"...","sector":"...","marketCap":"..."}`,
        maxTokens: 200,
      });
      const match = raw.match(/\{[\s\S]*?\}/);
      if (match) {
        const parsed = JSON.parse(match[0]) as Partial<TickerMeta>;
        meta = {
          ...meta,
          company: parsed.company ?? meta.company,
          exchange: parsed.exchange ?? meta.exchange,
          sector: parsed.sector ?? meta.sector,
          marketCap: parsed.marketCap ?? meta.marketCap,
        };
      }
    } catch {}
  }

  inMemory.set(upper, { meta, ts: Date.now() });
  return meta;
}
