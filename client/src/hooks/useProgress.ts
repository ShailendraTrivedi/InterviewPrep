import { useState, useCallback } from 'react';

const STORAGE_KEY = 'interviewtech-progress';

function loadViewedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function saveViewedIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [viewedIds, setViewedIds] = useState<Set<string>>(() => new Set(loadViewedIds()));

  const markViewed = useCallback((questionId: string) => {
    setViewedIds((prev) => {
      if (prev.has(questionId)) return prev;
      const next = new Set(prev);
      next.add(questionId);
      saveViewedIds([...next]);
      return next;
    });
  }, []);

  const isViewed = useCallback(
    (questionId: string) => viewedIds.has(questionId),
    [viewedIds]
  );

  /** Count how many of the given question ids have been viewed. Use with API-sourced question ids. */
  const getViewedCount = useCallback(
    (questionIds: string[]) => questionIds.filter((id) => viewedIds.has(id)).length,
    [viewedIds]
  );

  const totalViewedCount = viewedIds.size;

  return { markViewed, isViewed, getViewedCount, totalViewedCount };
}
