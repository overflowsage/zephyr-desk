import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import type { CacheEntry, AnalysisType, AgentName, TickerMeta } from '../types.js';
import { CACHE_TTL } from '../types.js';

function resolvePath(envVar: string, defaultPath: string): string {
  const raw = process.env[envVar] || defaultPath;
  return path.resolve(raw.replace(/^~/, os.homedir()));
}

export function getCacheDir(): string {
  return resolvePath('ZEPHYR_CACHE_DIR', path.join(os.homedir(), '.zephyr', 'cache'));
}

export function getReportsDir(): string {
  return resolvePath('ZEPHYR_REPORTS_DIR', path.join(os.homedir(), '.zephyr', 'reports'));
}

function cacheKey(ticker: string, type: AnalysisType, agentName?: AgentName): string {
  return [ticker.toUpperCase(), type, agentName].filter(Boolean).join('_');
}

function cachePath(ticker: string, type: AnalysisType, agentName?: AgentName): string {
  return path.join(getCacheDir(), `${cacheKey(ticker, type, agentName)}.json`);
}

async function mkdirp(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export async function cacheGet(
  ticker: string,
  type: AnalysisType,
  agentName?: AgentName,
): Promise<string | null> {
  try {
    const raw = await fs.readFile(cachePath(ticker, type, agentName), 'utf-8');
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      await fs.unlink(cachePath(ticker, type, agentName)).catch(() => {});
      return null;
    }
    return entry.content;
  } catch {
    return null;
  }
}

export async function cacheSet(
  ticker: string,
  type: AnalysisType,
  content: string,
  meta: TickerMeta,
  agentName?: AgentName,
): Promise<void> {
  await mkdirp(getCacheDir());
  const now = Date.now();
  const entry: CacheEntry = {
    ticker: ticker.toUpperCase(),
    type,
    agentName,
    content,
    createdAt: now,
    expiresAt: now + CACHE_TTL[type],
    meta,
  };
  await fs.writeFile(cachePath(ticker, type, agentName), JSON.stringify(entry, null, 2));
}

export async function cacheClear(ticker?: string): Promise<number> {
  const dir = getCacheDir();
  let cleared = 0;
  try {
    const files = await fs.readdir(dir);
    const targets = ticker
      ? files.filter(f => f.startsWith(ticker.toUpperCase() + '_') && f.endsWith('.json'))
      : files.filter(f => f.endsWith('.json'));
    await Promise.all(
      targets.map(f =>
        fs.unlink(path.join(dir, f)).then(() => { cleared++; }).catch(() => {}),
      ),
    );
  } catch {}
  return cleared;
}

export interface CacheStatusEntry {
  key: string;
  ticker: string;
  type: string;
  agentName?: string;
  expiresIn: string;
  sizeKB: string;
}

export async function cacheStatus(): Promise<{
  entries: CacheStatusEntry[];
  totalEntries: number;
  cacheDir: string;
}> {
  const dir = getCacheDir();
  const entries: CacheStatusEntry[] = [];
  try {
    const files = await fs.readdir(dir);
    for (const file of files.filter(f => f.endsWith('.json'))) {
      try {
        const fullPath = path.join(dir, file);
        const [raw, stats] = await Promise.all([
          fs.readFile(fullPath, 'utf-8'),
          fs.stat(fullPath),
        ]);
        const entry: CacheEntry = JSON.parse(raw);
        const msLeft = entry.expiresAt - Date.now();
        entries.push({
          key: file.replace('.json', ''),
          ticker: entry.ticker,
          type: entry.type,
          agentName: entry.agentName,
          expiresIn: msLeft <= 0 ? 'EXPIRED' : `${Math.round(msLeft / 60000)}m`,
          sizeKB: `${(stats.size / 1024).toFixed(1)}KB`,
        });
      } catch {}
    }
  } catch {}
  return { entries, totalEntries: entries.length, cacheDir: dir };
}

export async function saveReport(content: string, ticker: string): Promise<string> {
  const dir = getReportsDir();
  await mkdirp(dir);
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 5).replace(':', '');
  const filePath = path.join(dir, `${ticker.toUpperCase()}_${date}_${time}.md`);
  await fs.writeFile(filePath, content);
  return filePath;
}
