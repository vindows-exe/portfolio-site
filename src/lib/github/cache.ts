import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  const cache = new Map<string, unknown>();

  return ((...args: unknown[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export function writeSnapshot(path: string, data: unknown): void {
  const resolved = resolve(path);
  const dir = resolve(resolved, '..');

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(resolved, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[cache] Snapshot written to ${resolved}`);
}
