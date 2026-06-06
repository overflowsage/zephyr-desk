import type { AgentInput, AgentName } from '../types.js';
import { C } from '../types.js';
import { resolveTicker } from '../utils/resolver.js';
import { cacheGet, cacheSet } from '../utils/cache.js';
import { formatAgentReport } from '../utils/formatter.js';
import * as kova  from '../agents/kova.js';
import * as raze  from '../agents/raze.js';
import * as flare from '../agents/flare.js';
import * as herd  from '../agents/herd.js';
import * as veil  from '../agents/veil.js';

const AGENT_RUNNERS: Record<AgentName, typeof kova.run> = {
  KOVA:  kova.run,
  RAZE:  raze.run,
  FLARE: flare.run,
  HERD:  herd.run,
  VEIL:  veil.run,
};

export async function zephyrAgent(input: AgentInput): Promise<string> {
  const ticker = input.ticker.toUpperCase().trim();
  const agentName = input.agent.toUpperCase() as AgentName;

  if (!AGENT_RUNNERS[agentName]) {
    throw new Error(`Unknown agent: ${agentName}. Valid agents: KOVA, RAZE, FLARE, HERD, VEIL`);
  }

  const cached = await cacheGet(ticker, 'agent', agentName);
  if (cached) {
    process.stderr.write(`${C.DIM}[CACHE] Returning cached ${agentName} report for ${ticker}${C.RESET}\n`);
    return cached;
  }

  const meta = await resolveTicker(ticker);
  const runner = AGENT_RUNNERS[agentName];
  const result = await runner(meta);

  if (!result.success) {
    throw new Error(`${agentName} analysis failed: ${result.error}`);
  }

  const report = formatAgentReport(result, meta);
  await cacheSet(ticker, 'agent', report, meta, agentName);

  return report;
}
