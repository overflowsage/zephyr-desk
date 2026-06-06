import type { QuickInput } from '../types.js';
import { C } from '../types.js';
import { resolveTicker } from '../utils/resolver.js';
import { cacheGet, cacheSet } from '../utils/cache.js';
import { formatQuickReport } from '../utils/formatter.js';
import { quickAnalysis } from '../agents/zephyr.js';

export async function zephyrQuick(input: QuickInput): Promise<string> {
  const ticker = input.ticker.toUpperCase().trim();
  const question = input.question?.trim();

  // Cache check (no cache when a specific question is asked)
  if (!question) {
    const cached = await cacheGet(ticker, 'quick');
    if (cached) {
      process.stderr.write(`${C.DIM}[CACHE] Returning cached quick take for ${ticker}${C.RESET}\n`);
      return cached;
    }
  }

  const meta = await resolveTicker(ticker);
  const result = await quickAnalysis(meta, question);

  if (!result.success) {
    throw new Error(`Quick analysis failed: ${result.error}`);
  }

  const report = formatQuickReport(result.content, meta);

  if (!question) {
    await cacheSet(ticker, 'quick', report, meta);
  }

  return report;
}
