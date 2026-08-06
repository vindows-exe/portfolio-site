import { z } from 'zod';
import type { RepoStats, PinnedRepo, ContributionCalendar, ContributionDay } from '@/types/github';

// --- Zod Schemas ---

const restRepoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  updated_at: z.string(),
});

const graphQLPinnedRepoSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    stargazerCount: z.number(),
    forkCount: z.number(),
    primaryLanguage: z
      .object({
        name: z.string(),
        color: z.string().nullable(),
      })
      .nullable(),
  }),
);

const graphQLContributionDaySchema = z.object({
  date: z.string(),
  contributionCount: z.number(),
  weekday: z.number(),
});

const graphQLWeekSchema = z.object({
  contributionDays: z.array(graphQLContributionDaySchema),
});

const graphQLContributionCollectionSchema = z.object({
  totalCommitContributions: z.number(),
  contributionCalendar: z.object({
    totalContributions: z.number(),
    weeks: z.array(graphQLWeekSchema),
  }),
});

// --- Helpers ---

function computeLevel(
  count: number,
  q1: number,
  q2: number,
  q3: number,
): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= q1) return 1;
  if (count <= q2) return 2;
  if (count <= q3) return 3;
  return 4;
}

function computeQuartiles(values: number[]): [number, number, number] {
  const sorted = [...values].filter((v) => v > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return [0, 0, 0];
  const n = sorted.length;
  const q1 = sorted[Math.floor(n * 0.25)];
  const q2 = sorted[Math.floor(n * 0.5)];
  const q3 = sorted[Math.floor(n * 0.75)];
  return [q1, q2, q3];
}

// --- Mappers ---

export function mapRestRepoToStats(input: unknown): RepoStats {
  const parsed = restRepoSchema.parse(input);
  return {
    name: parsed.name,
    fullName: parsed.full_name,
    description: parsed.description,
    url: parsed.html_url,
    stars: parsed.stargazers_count,
    forks: parsed.forks_count,
    primaryLanguage: parsed.language,
    topics: parsed.topics,
    updatedAt: parsed.updated_at,
  };
}

export function mapGraphQLPinnedToDomain(input: unknown): PinnedRepo[] {
  const nodes = graphQLPinnedRepoSchema.parse(input);
  return nodes.map((node) => ({
    name: node.name,
    description: node.description,
    url: node.url,
    stars: node.stargazerCount,
    forks: node.forkCount,
    language: node.primaryLanguage,
  }));
}

export function mapGraphQLContributionsToCalendar(
  input: unknown,
): ContributionCalendar {
  const parsed = graphQLContributionCollectionSchema.parse(input);

  const allCounts = parsed.contributionCalendar.weeks.flatMap((w) =>
    w.contributionDays.map((d) => d.contributionCount),
  );
  const [q1, q2, q3] = computeQuartiles(allCounts);

  const mappedWeeks = parsed.contributionCalendar.weeks.map((w) => ({
    days: w.contributionDays.map((d) => {
      const level = computeLevel(d.contributionCount, q1, q2, q3);
      const day: ContributionDay = {
        date: d.date,
        count: d.contributionCount,
        level,
      };
      return day;
    }),
  }));

  return {
    totalContributions: parsed.contributionCalendar.totalContributions,
    totalCommitContributions: parsed.totalCommitContributions,
    weeks: mappedWeeks,
  };
}
