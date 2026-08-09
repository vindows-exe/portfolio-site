#!/usr/bin/env tsx
import { resolve, dirname } from 'node:path';
import { readFileSync, copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { createGitHubClient } from '@/lib/github/client';
import { getPinnedRepos, getContributionCalendar, getRepoStats } from '@/lib/github/index';
import { writeSnapshot } from '@/lib/github/cache';
import { GITHUB_USERNAME } from '@/config/constants';
import type { GitHubStatsSnapshot } from '@/types/github';

// Load .env.local manually since this script runs outside Astro's env loading
const envPath = resolve(__dirname, '..', '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const GENERATED_PATH = resolve(
  __dirname,
  '..',
  'src/data/generated/github-stats.json',
);

const SAMPLE_PATH = resolve(
  __dirname,
  '..',
  'src/data/generated/github-stats.sample.json',
);

async function main(): Promise<void> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('[fetch-github-data] No GITHUB_TOKEN found in environment.');
    console.warn('[fetch-github-data] Copying sample fallback data.');
    copyFileSync(SAMPLE_PATH, GENERATED_PATH);
    console.log('[fetch-github-data] Done (fallback).');
    process.exit(0);
  }

  const client = createGitHubClient({ token });
  const fetchedAt = new Date().toISOString();

  const snapshot: GitHubStatsSnapshot = {
    source: 'github',
    fetchedAt,
    pinnedRepos: [],
    contributionCalendar: null,
    repoStats: [],
  };

  // Fetch pinned repos
  let pinnedRepos: Awaited<ReturnType<typeof getPinnedRepos>> = [];
  try {
    pinnedRepos = await getPinnedRepos(client, GITHUB_USERNAME);
    snapshot.pinnedRepos = pinnedRepos;
    console.log(`[fetch-github-data] Fetched ${pinnedRepos.length} pinned repos.`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[fetch-github-data] Failed to fetch pinned repos: ${msg}`);
  }

  // Fetch contribution calendar
  try {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const calendar = await getContributionCalendar(
      client,
      GITHUB_USERNAME,
      oneYearAgo.toISOString(),
      now.toISOString(),
    );
    snapshot.contributionCalendar = calendar;
    console.log(
      `[fetch-github-data] Fetched contribution calendar: ${calendar.totalContributions} total contributions.`,
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[fetch-github-data] Failed to fetch contributions: ${msg}`);
  }

  // Fetch repo stats for pinned repos — extract owner/name from URL
  const repoEntries = pinnedRepos
    .map((r) => {
      const match = r.url.match(/github\.com\/([^/]+)\/([^/]+)/);
      return match ? { owner: match[1], name: match[2] } : null;
    })
    .filter((e): e is { owner: string; name: string } => e !== null);

  const repoResults = await Promise.allSettled(
    repoEntries.map((r) => getRepoStats(client, r.owner, r.name)),
  );

  for (let i = 0; i < repoResults.length; i++) {
    const result = repoResults[i];
    const repo = repoEntries[i];
    if (result.status === 'fulfilled') {
      snapshot.repoStats.push(result.value);
      console.log(`[fetch-github-data] Fetched stats for ${repo.owner}/${repo.name}.`);
    } else {
      const msg = result.reason instanceof Error ? result.reason.message : String(result.reason);
      console.error(`[fetch-github-data] Failed to fetch ${repo.owner}/${repo.name}: ${msg}`);
    }
  }

  writeSnapshot(GENERATED_PATH, snapshot);
  console.log('[fetch-github-data] Done.');
}

main().catch((error) => {
  const msg = error instanceof Error ? error.message : String(error);
  console.error(`[fetch-github-data] Fatal error: ${msg}`);

  // Ensure fallback file exists on fatal error
  try {
    readFileSync(GENERATED_PATH);
  } catch {
    copyFileSync(SAMPLE_PATH, GENERATED_PATH);
    console.log('[fetch-github-data] Copied fallback after fatal error.');
  }

  process.exit(0);
});
