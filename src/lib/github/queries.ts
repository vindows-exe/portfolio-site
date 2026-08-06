import type { GitHubClient } from './client';

export const PINNED_REPOS_QUERY = `query($login: String!, $first: Int!) {
  user(login: $login) {
    pinnedItems(first: $first, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}`;

export const CONTRIBUTIONS_QUERY = `query($login: String!, $from: DateTime, $to: DateTime) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
    }
  }
}`;

export async function fetchRepo(
  client: GitHubClient,
  owner: string,
  repo: string,
): Promise<unknown> {
  return client.rest<unknown>(`/repos/${owner}/${repo}`);
}

export async function fetchPinnedRepos(
  client: GitHubClient,
  username: string,
  first = 6,
): Promise<unknown> {
  const data = await client.graphql<{
    user: { pinnedItems: { nodes: unknown[] } };
  }>(PINNED_REPOS_QUERY, { login: username, first });

  return data.user.pinnedItems.nodes;
}

export async function fetchContributionCalendar(
  client: GitHubClient,
  username: string,
  from?: string,
  to?: string,
): Promise<unknown> {
  const variables: Record<string, unknown> = { login: username };
  if (from) variables.from = from;
  if (to) variables.to = to;

  const data = await client.graphql<{
    user: { contributionsCollection: unknown };
  }>(CONTRIBUTIONS_QUERY, variables);

  return data.user.contributionsCollection;
}
