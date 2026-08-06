export { createGitHubClient } from './client';
export type { GitHubClient, GitHubClientConfig } from './client';
export { GitHubApiError, GitHubAuthRequiredError } from './client';
export {
  fetchRepo,
  fetchPinnedRepos,
  fetchContributionCalendar,
} from './queries';
export {
  mapRestRepoToStats,
  mapGraphQLPinnedToDomain,
  mapGraphQLContributionsToCalendar,
} from './mappers';
export { memoize, writeSnapshot } from './cache';

import type { GitHubClient } from './client';
import type { RepoStats, PinnedRepo, ContributionCalendar } from '@/types/github';
import { fetchRepo, fetchPinnedRepos, fetchContributionCalendar } from './queries';
import {
  mapRestRepoToStats,
  mapGraphQLPinnedToDomain,
  mapGraphQLContributionsToCalendar,
} from './mappers';
import { memoize } from './cache';

const memoGetRepo = memoize(fetchRepo);
const memoGetPinned = memoize(fetchPinnedRepos);
const memoGetContributions = memoize(fetchContributionCalendar);

export async function getRepoStats(
  client: GitHubClient,
  owner: string,
  repo: string,
): Promise<RepoStats> {
  const raw = await memoGetRepo(client, owner, repo);
  return mapRestRepoToStats(raw);
}

export async function getPinnedRepos(
  client: GitHubClient,
  username: string,
  first = 6,
): Promise<PinnedRepo[]> {
  const raw = await memoGetPinned(client, username, first);
  return mapGraphQLPinnedToDomain(raw);
}

export async function getContributionCalendar(
  client: GitHubClient,
  username: string,
  from?: string,
  to?: string,
): Promise<ContributionCalendar> {
  const raw = await memoGetContributions(client, username, from, to);
  return mapGraphQLContributionsToCalendar(raw);
}
