export interface TickerMeta {
  ticker: string;
  company: string;
  exchange: string;
  sector: string;
  marketCap: string;
  resolvedAt: number;
}

export type AgentName = 'KOVA' | 'RAZE' | 'FLARE' | 'HERD' | 'VEIL';
export type AllAgentName = AgentName | 'ZEPHYR';
export type AnalysisType = 'full' | 'quick' | 'agent';
export type OutlookType =
  | 'Bullish'
  | 'Cautiously Bullish'
  | 'Neutral'
  | 'Cautious'
  | 'Bearish';

export interface AgentResult {
  agentName: AllAgentName;
  content: string;
  durationMs: number;
  success: boolean;
  error?: string;
}

export interface TeamReport {
  kova: AgentResult;
  raze: AgentResult;
  flare: AgentResult;
  herd: AgentResult;
  veil: AgentResult;
}

export interface CacheEntry {
  ticker: string;
  type: AnalysisType;
  agentName?: AgentName;
  content: string;
  createdAt: number;
  expiresAt: number;
  meta: TickerMeta;
}

export interface AnalyzeInput {
  ticker: string;
  force_refresh?: boolean;
}

export interface QuickInput {
  ticker: string;
  question?: string;
}

export interface AgentInput {
  ticker: string;
  agent: AgentName;
}

export interface CacheClearInput {
  ticker?: string;
  all?: boolean;
}

// ANSI color codes for terminal output
export const C = {
  ZEPHYR: '\x1b[38;5;220m\x1b[1m', // Bold Gold
  KOVA:   '\x1b[38;5;51m',          // Cyan
  RAZE:   '\x1b[38;5;82m',          // Bright Green
  FLARE:  '\x1b[38;5;208m',         // Orange
  HERD:   '\x1b[38;5;171m',         // Purple/Lavender
  VEIL:   '\x1b[38;5;196m',         // Red
  DIM:    '\x1b[2m',
  BOLD:   '\x1b[1m',
  RESET:  '\x1b[0m',
  TICK:   '\x1b[32m✓\x1b[0m',
  CROSS:  '\x1b[31m✗\x1b[0m',
} as const;

export const AGENT_ICONS: Record<AllAgentName, string> = {
  ZEPHYR: '⚡',
  KOVA:   '💼',
  RAZE:   '📈',
  FLARE:  '🔥',
  HERD:   '🧠',
  VEIL:   '⚠️ ',
};

export const MODELS = {
  ZEPHYR: 'claude-opus-4-8',
  KOVA:   'claude-sonnet-4-6',
  RAZE:   'claude-sonnet-4-6',
  FLARE:  'claude-sonnet-4-6',
  HERD:   'claude-sonnet-4-6',
  VEIL:   'claude-sonnet-4-6',
} as const;

export const CACHE_TTL = {
  full:  4 * 60 * 60 * 1000,
  quick: 1 * 60 * 60 * 1000,
  agent: 2 * 60 * 60 * 1000,
} as const;

export const OUTLOOK_EMOJI: Record<OutlookType, string> = {
  'Bullish':            '🟢',
  'Cautiously Bullish': '🟡',
  'Neutral':            '⚪',
  'Cautious':           '🟠',
  'Bearish':            '🔴',
};
