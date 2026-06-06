import type { TickerMeta, OutlookType } from '../types.js';
import { OUTLOOK_EMOJI } from '../types.js';
import { getReportsDir } from './cache.js';

const W = 66; // inner width of boxes

function pad(s: string, width: number): string {
  if (s.length >= width) return s.slice(0, width);
  return s + ' '.repeat(width - s.length);
}

function sectionBox(icon: string, title: string, agent: string, body: string): string {
  const agentTag = agent ? `· ${agent}  │` : '│';
  const prefix = `│  ${icon}  ${title}`;
  const spacer = ' '.repeat(Math.max(0, W + 2 - prefix.length - agentTag.length));
  return [
    '┌' + '─'.repeat(W) + '┐',
    prefix + spacer + agentTag,
    '└' + '─'.repeat(W) + '┘',
    '',
    body,
  ].join('\n');
}

function parseOutlook(text: string): OutlookType {
  const m = text.match(/Outlook:\s*(Bullish|Cautiously Bullish|Neutral|Cautious|Bearish)/i);
  if (!m) return 'Neutral';
  const v = m[1] as OutlookType;
  return (['Bullish', 'Cautiously Bullish', 'Neutral', 'Cautious', 'Bearish'] as OutlookType[]).includes(v)
    ? v
    : 'Neutral';
}

function extractField(text: string, label: string): string {
  const m = text.match(new RegExp(`${label}:?\\s*(.+?)(?:\\n|$)`, 'i'));
  return m ? m[1].trim() : 'N/A';
}

interface Sections {
  situation: string;
  businessHealth: string;
  chartAnalysis: string;
  catalysts: string;
  sentiment: string;
  risks: string;
  verdictBody: string;
}

const SECTION_MARKERS = [
  ['THE SITUATION',       'situation'],
  ['BUSINESS HEALTH',     'businessHealth'],
  ['WHAT THE CHART SAYS', 'chartAnalysis'],
  ["WHAT'S COMING",       'catalysts'],
  ['WHAT THE MARKET THINKS', 'sentiment'],
  ['WHAT COULD GO WRONG', 'risks'],
  ["ZEPHYR'S VERDICT",    'verdictBody'],
] as const;

function parseSections(text: string): Sections {
  const result: Sections = {
    situation: '', businessHealth: '', chartAnalysis: '',
    catalysts: '', sentiment: '', risks: '', verdictBody: '',
  };

  for (let i = 0; i < SECTION_MARKERS.length; i++) {
    const [marker, key] = SECTION_MARKERS[i];
    const next = SECTION_MARKERS[i + 1]?.[0];
    const start = text.indexOf(marker);
    if (start === -1) continue;
    const contentStart = start + marker.length;
    const end = next ? text.indexOf(next, contentStart) : text.length;
    let content = text.slice(contentStart, end === -1 ? text.length : end).replace(/^[\s\n─═]+/, '').trim();

    // Strip verdict structured fields from body
    if (key === 'verdictBody') {
      const cutAt = content.search(/\nOutlook:/i);
      if (cutAt !== -1) content = content.slice(0, cutAt).trim();
    }
    (result as Record<string, string>)[key] = content;
  }

  if (!result.situation && !result.businessHealth) {
    result.situation = text;
  }
  return result;
}

export function formatReport(zephyrOutput: string, meta: TickerMeta): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toUTCString().slice(17, 22);
  const line = '━'.repeat(W);

  const sections = parseSections(zephyrOutput);
  const outlook = parseOutlook(zephyrOutput);
  const emoji = OUTLOOK_EMOJI[outlook];

  const timeHorizon  = extractField(zephyrOutput, 'Time Horizon');
  const bestCase     = extractField(zephyrOutput, 'Best Case');
  const baseCase     = extractField(zephyrOutput, 'Base Case');
  const worstCase    = extractField(zephyrOutput, 'Worst Case');
  const thisIsFor    = extractField(zephyrOutput, 'This Is For');
  const watchFor     = extractField(zephyrOutput, 'Watch For');

  const reportsDir = getReportsDir();

  const header = [
    '╔' + '═'.repeat(W) + '╗',
    `║  ⚡ ZEPHYR ANALYST DESK${' '.repeat(W - 24)}║`,
    `║  ${pad(`${meta.ticker} · ${meta.company} · ${meta.sector}`, W - 2)}║`,
    `║  ${pad(`${meta.exchange} · Market Cap: ${meta.marketCap}`, W - 2)}║`,
    `║  ${pad(`${dateStr} · ${timeStr} UTC · Live Data`, W - 2)}║`,
    '╚' + '═'.repeat(W) + '╝',
  ].join('\n');

  const teamBanner = [
    line,
    '  TEAM ON THIS REPORT',
    '  ZEPHYR (Lead) · KOVA · RAZE · FLARE · HERD · VEIL',
    '  Models: Opus 4.8 (synthesis) · Sonnet 4.6 ×5 (analysis)',
    line,
  ].join('\n');

  const verdictSection = [
    '╔' + '═'.repeat(W) + '╗',
    `║  🎯  ZEPHYR'S VERDICT${' '.repeat(W - 21)}║`,
    '╚' + '═'.repeat(W) + '╝',
    '',
    sections.verdictBody,
    '',
    '┌' + '─'.repeat(W) + '┐',
    `│  Outlook       ${pad(`${emoji} ${outlook}`, W - 16)}│`,
    `│  Time Horizon  ${pad(timeHorizon, W - 16)}│`,
    `│  Best Case     ${pad(bestCase, W - 16)}│`,
    `│  Base Case     ${pad(baseCase, W - 16)}│`,
    `│  Worst Case    ${pad(worstCase, W - 16)}│`,
    `│  This Is For   ${pad(thisIsFor, W - 16)}│`,
    `│  Watch For     ${pad(watchFor, W - 16)}│`,
    '└' + '─'.repeat(W) + '┘',
  ].join('\n');

  const footer = [
    line,
    '  ⚡ ZEPHYR ANALYST DESK  ·  Not financial advice  ·  Research only',
    `  Saved: ${reportsDir}/${meta.ticker}_${dateStr}.md`,
    '  Cache expires: 4 hours from now',
    line,
  ].join('\n');

  return [
    header,
    '',
    teamBanner,
    '',
    '',
    sectionBox('🔍', 'THE SITUATION', '', sections.situation),
    '',
    '',
    sectionBox('💼', 'BUSINESS HEALTH', 'KOVA', sections.businessHealth),
    '',
    '',
    sectionBox('📈', 'WHAT THE CHART SAYS', 'RAZE', sections.chartAnalysis),
    '',
    '',
    sectionBox('🔥', "WHAT'S COMING", 'FLARE', sections.catalysts),
    '',
    '',
    sectionBox('🧠', 'WHAT THE MARKET THINKS', 'HERD', sections.sentiment),
    '',
    '',
    sectionBox('⚠️ ', 'WHAT COULD GO WRONG', 'VEIL', sections.risks),
    '',
    '',
    verdictSection,
    '',
    footer,
  ].join('\n');
}

export function formatQuickReport(content: string, meta: TickerMeta): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toUTCString().slice(17, 22);
  const line = '━'.repeat(W);

  return [
    '╔' + '═'.repeat(W) + '╗',
    `║  ⚡ ZEPHYR QUICK TAKE${' '.repeat(W - 21)}║`,
    `║  ${pad(`${meta.ticker} · ${meta.company}`, W - 2)}║`,
    `║  ${pad(`${dateStr} · ${timeStr} UTC`, W - 2)}║`,
    '╚' + '═'.repeat(W) + '╝',
    '',
    content,
    '',
    line,
    '  ⚡ ZEPHYR QUICK TAKE  ·  Not financial advice  ·  Research only',
    line,
  ].join('\n');
}

export function formatAgentReport(result: { agentName: string; content: string }, meta: TickerMeta): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const line = '━'.repeat(W);

  return [
    '╔' + '═'.repeat(W) + '╗',
    `║  ⚡ ${result.agentName} — ${meta.ticker} · ${meta.company}${' '.repeat(Math.max(0, W - 6 - result.agentName.length - meta.ticker.length - meta.company.length - 5))}║`,
    `║  ${pad(dateStr, W - 2)}║`,
    '╚' + '═'.repeat(W) + '╝',
    '',
    result.content,
    '',
    line,
    '  ⚡ ZEPHYR ANALYST DESK  ·  Not financial advice',
    line,
  ].join('\n');
}
