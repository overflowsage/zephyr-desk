import Anthropic from '@anthropic-ai/sdk';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchCallConfig {
  model: string;
  system: string;
  prompt: string;
  maxTokens: number;
}

let _client: Anthropic | null = null;

export function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set in environment');
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

async function braveSearch(query: string, count = 5): Promise<SearchResult[]> {
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) return [];
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}&text_decorations=false`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Subscription-Token': key,
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Record<string, unknown>;
    const webData = data['web'] as Record<string, unknown> | undefined;
    const results = (webData?.['results'] as unknown[]) ?? [];
    return results.map((r: unknown) => {
      const item = r as Record<string, unknown>;
      return {
        title: String(item['title'] ?? ''),
        url: String(item['url'] ?? ''),
        snippet: String(item['description'] ?? ''),
      };
    });
  } catch {
    return [];
  }
}

async function tavilySearch(query: string, count = 5): Promise<SearchResult[]> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key, query, max_results: count, search_depth: 'basic' }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Record<string, unknown>;
    const results = (data['results'] as unknown[]) ?? [];
    return results.map((r: unknown) => {
      const item = r as Record<string, unknown>;
      return {
        title: String(item['title'] ?? ''),
        url: String(item['url'] ?? ''),
        snippet: String(item['content'] ?? item['description'] ?? ''),
      };
    });
  } catch {
    return [];
  }
}

export async function performSearch(query: string): Promise<string> {
  const results = (await braveSearch(query)).length
    ? await braveSearch(query)
    : await tavilySearch(query);

  if (!results.length) {
    return `[No external search results available for: "${query}" — reasoning from training data]`;
  }
  return results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.snippet}`)
    .join('\n\n');
}

// Calls Claude with web_search_20250305 tool, handling the full tool-use loop.
export async function callWithSearch(cfg: SearchCallConfig): Promise<string> {
  const client = getClient();
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: cfg.prompt }];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: any[] = [{ type: 'web_search_20250305', name: 'web_search' }];

  for (let turn = 0; turn < 15; turn++) {
    const response = await client.messages.create({
      model: cfg.model,
      max_tokens: cfg.maxTokens,
      system: cfg.system,
      tools,
      messages,
    });

    const textBlocks = response.content
      .filter(b => b.type === 'text')
      .map(b => (b as Anthropic.TextBlock).text)
      .join('\n');

    if (response.stop_reason === 'end_turn') return textBlocks;

    if (response.stop_reason === 'tool_use') {
      messages.push({ role: 'assistant', content: response.content });
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type === 'tool_use' && block.name === 'web_search') {
          const query = String((block.input as Record<string, unknown>)['query'] ?? '');
          const results = await performSearch(query);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: results,
          });
        }
      }

      if (toolResults.length > 0) {
        messages.push({ role: 'user', content: toolResults });
        continue;
      }
      if (textBlocks) return textBlocks;
    }

    if (textBlocks) return textBlocks;
    break;
  }

  return '[AGENT UNAVAILABLE — exceeded maximum tool-use iterations]';
}

// Plain Claude call without web search (used by ZEPHYR synthesis).
export async function callClaude(cfg: SearchCallConfig): Promise<string> {
  const client = getClient();
  const response = await client.messages.create({
    model: cfg.model,
    max_tokens: cfg.maxTokens,
    system: cfg.system,
    messages: [{ role: 'user', content: cfg.prompt }],
  });
  return response.content
    .filter(b => b.type === 'text')
    .map(b => (b as Anthropic.TextBlock).text)
    .join('\n');
}
