export interface GitHubClientConfig {
  token?: string;
  userAgent?: string;
}

export interface GitHubClient {
  rest<T>(path: string, init?: RequestInit): Promise<T>;
  graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T>;
}

export class GitHubApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`GitHub API error ${status}`);
    this.name = 'GitHubApiError';
  }
}

export class GitHubAuthRequiredError extends Error {
  constructor() {
    super('GitHub authentication required for GraphQL queries');
    this.name = 'GitHubAuthRequiredError';
  }
}

const BASE_URL = 'https://api.github.com';
const GRAPHQL_URL = `${BASE_URL}/graphql`;

export function createGitHubClient(config: GitHubClientConfig): GitHubClient {
  const userAgent = config.userAgent ?? 'portfolio-site/0.1.0';

  async function rest<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'User-Agent': userAgent,
      Accept: 'application/vnd.github.v3+json',
    };

    if (config.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, { ...init, headers });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new GitHubApiError(response.status, body);
    }

    const remaining = response.headers.get('x-ratelimit-remaining');
    if (remaining !== null) {
      console.debug(`[GitHub REST] ${response.status} ${path} — rate-limit remaining: ${remaining}`);
    }

    return response.json() as Promise<T>;
  }

  async function graphql<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    if (!config.token) {
      throw new GitHubAuthRequiredError();
    }

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'User-Agent': userAgent,
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new GitHubApiError(response.status, body);
    }

    const remaining = response.headers.get('x-ratelimit-remaining');
    if (remaining !== null) {
      console.debug(`[GitHub GraphQL] 200 — rate-limit remaining: ${remaining}`);
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      throw new GitHubApiError(200, json.errors);
    }

    return json.data as T;
  }

  return { rest, graphql };
}
