import type { CacheClearInput } from '../types.js';
import { cacheClear, cacheStatus, getCacheDir } from '../utils/cache.js';

export async function zephyrCacheClear(input: CacheClearInput): Promise<string> {
  if (input.all) {
    const count = await cacheClear();
    return `Cleared ${count} cache entries from ${getCacheDir()}`;
  }
  if (input.ticker) {
    const ticker = input.ticker.toUpperCase().trim();
    const count = await cacheClear(ticker);
    return count > 0
      ? `Cleared ${count} cache entries for ${ticker}`
      : `No cache entries found for ${ticker}`;
  }
  return 'Specify ticker or all:true to clear cache';
}

export async function zephyrCacheStatus(): Promise<string> {
  const status = await cacheStatus();

  if (status.totalEntries === 0) {
    return `Cache is empty.\nCache directory: ${status.cacheDir}`;
  }

  const lines = [
    `Cache directory: ${status.cacheDir}`,
    `Total entries: ${status.totalEntries}`,
    '',
    '  KEY                          TYPE    AGENT    EXPIRES    SIZE',
    '  ' + '─'.repeat(62),
  ];

  for (const e of status.entries) {
    const key    = e.key.padEnd(30);
    const type   = e.type.padEnd(7);
    const agent  = (e.agentName ?? '—').padEnd(8);
    const expiry = e.expiresIn.padEnd(10);
    lines.push(`  ${key} ${type} ${agent} ${expiry} ${e.sizeKB}`);
  }

  return lines.join('\n');
}
