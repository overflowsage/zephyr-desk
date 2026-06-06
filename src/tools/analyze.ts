import type { AnalyzeInput, TeamReport } from '../types.js';
import { C, AGENT_ICONS } from '../types.js';
import { resolveTicker } from '../utils/resolver.js';
import { cacheGet, cacheSet, saveReport } from '../utils/cache.js';
import { formatReport } from '../utils/formatter.js';
import * as kova  from '../agents/kova.js';
import * as raze  from '../agents/raze.js';
import * as flare from '../agents/flare.js';
import * as herd  from '../agents/herd.js';
import * as veil  from '../agents/veil.js';
import { synthesize } from '../agents/zephyr.js';

export async function zephyrAnalyze(input: AnalyzeInput): Promise<string> {
  const ticker = input.ticker.toUpperCase().trim();
  const forceRefresh = input.force_refresh ?? false;

  // 1. Cache check
  if (!forceRefresh) {
    const cached = await cacheGet(ticker, 'full');
    if (cached) {
      process.stderr.write(`${C.DIM}[CACHE] Returning cached report for ${ticker}${C.RESET}\n`);
      return cached;
    }
  }

  // 2. Resolve ticker metadata
  process.stderr.write(`\n${C.ZEPHYR}${AGENT_ICONS.ZEPHYR} [ZEPHYR]${C.RESET} Briefing team for ${C.BOLD}${ticker}${C.RESET}...\n\n`);
  const meta = await resolveTicker(ticker);
  process.stderr.write(`${C.DIM}  Company: ${meta.company} · ${meta.sector} · ${meta.exchange} · ${meta.marketCap}${C.RESET}\n\n`);

  const teamStart = Date.now();

  // 3. ALL FIVE AGENTS RUN IN PARALLEL
  const [kovaResult, razeResult, flareResult, herdResult, veilResult] = await Promise.all([
    kova.run(meta),
    raze.run(meta),
    flare.run(meta),
    herd.run(meta),
    veil.run(meta),
  ]);

  const teamMs = Date.now() - teamStart;
  process.stderr.write(`\n${C.DIM}  Team completed in ${(teamMs / 1000).toFixed(1)}s${C.RESET}\n\n`);

  const team: TeamReport = {
    kova: kovaResult,
    raze: razeResult,
    flare: flareResult,
    herd: herdResult,
    veil: veilResult,
  };

  // 4. ZEPHYR synthesizes
  const zephyrResult = await synthesize(meta, team);
  if (!zephyrResult.success) {
    throw new Error(`ZEPHYR synthesis failed: ${zephyrResult.error}`);
  }

  // 5. Format the report
  const report = formatReport(zephyrResult.content, meta);

  // 6. Save + cache
  const savedPath = await saveReport(report, ticker);
  await cacheSet(ticker, 'full', report, meta);

  process.stderr.write(`\n${C.DIM}  Report saved to: ${savedPath}${C.RESET}\n\n`);

  return report;
}
