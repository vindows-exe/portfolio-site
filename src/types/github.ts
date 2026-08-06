export interface RepoStats {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  topics: string[];
  updatedAt: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionCalendar {
  totalContributions: number;
  totalCommitContributions: number;
  weeks: { days: ContributionDay[] }[];
}

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: { name: string; color: string | null } | null;
}

export interface GitHubStatsSnapshot {
  source: 'github' | 'fallback';
  fetchedAt: string;
  pinnedRepos: PinnedRepo[];
  contributionCalendar: ContributionCalendar | null;
  repoStats: RepoStats[];
}
