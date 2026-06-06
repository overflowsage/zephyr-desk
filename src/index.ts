#!/usr/bin/env node
import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { zephyrAnalyze } from './tools/analyze.js';
import { zephyrQuick }   from './tools/quick.js';
import { zephyrAgent }   from './tools/agent.js';
import { zephyrCacheClear, zephyrCacheStatus } from './tools/cache.js';
import type { AnalyzeInput, QuickInput, AgentInput, CacheClearInput } from './types.js';

const VERSION = '1.0.0';

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(`zephyr-mcp v${VERSION}`);
  process.exit(0);
}

const server = new Server(
  { name: 'zephyr-analyst-desk', version: VERSION },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'zephyr_analyze',
      description:
        'Full team analysis: 5 specialist agents (KOVA, RAZE, FLARE, HERD, VEIL) run in parallel, then ZEPHYR synthesizes into a comprehensive report with verdict.',
      inputSchema: {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            description: 'Stock ticker symbol (e.g. "NVDA", "AAPL", "TSLA")',
          },
          force_refresh: {
            type: 'boolean',
            description: 'Bypass the 4-hour cache and run fresh analysis. Default false.',
          },
        },
        required: ['ticker'],
      },
    },
    {
      name: 'zephyr_quick',
      description:
        'Quick take from ZEPHYR only — fast single-model analysis. Good for a rapid sanity check or focused question.',
      inputSchema: {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            description: 'Stock ticker symbol',
          },
          question: {
            type: 'string',
            description: 'Optional focused question (e.g. "Is the valuation justified?")',
          },
        },
        required: ['ticker'],
      },
    },
    {
      name: 'zephyr_agent',
      description:
        'Run a single analyst agent. KOVA=Fundamentals, RAZE=Technical, FLARE=News, HERD=Sentiment, VEIL=Risk.',
      inputSchema: {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            description: 'Stock ticker symbol',
          },
          agent: {
            type: 'string',
            enum: ['KOVA', 'RAZE', 'FLARE', 'HERD', 'VEIL'],
            description: 'Which analyst to run',
          },
        },
        required: ['ticker', 'agent'],
      },
    },
    {
      name: 'zephyr_cache_clear',
      description: 'Clear cached analysis. Specify ticker to clear one stock, or all:true to wipe everything.',
      inputSchema: {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            description: 'Specific ticker to clear (optional)',
          },
          all: {
            type: 'boolean',
            description: 'Clear all cached entries',
          },
        },
      },
    },
    {
      name: 'zephyr_cache_status',
      description: 'Show all cached analyses: tickers, types, expiry times, and sizes.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case 'zephyr_analyze':
        result = await zephyrAnalyze(args as unknown as AnalyzeInput);
        break;

      case 'zephyr_quick':
        result = await zephyrQuick(args as unknown as QuickInput);
        break;

      case 'zephyr_agent':
        result = await zephyrAgent(args as unknown as AgentInput);
        break;

      case 'zephyr_cache_clear':
        result = await zephyrCacheClear((args ?? {}) as unknown as CacheClearInput);
        break;

      case 'zephyr_cache_status':
        result = await zephyrCacheStatus();
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: 'text', text: result }],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write('⚡ Zephyr Analyst Desk MCP server running\n');
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${String(err)}\n`);
  process.exit(1);
});
