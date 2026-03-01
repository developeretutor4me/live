import { useMemo } from "react";
import {
  LEVELS,
  Level,
  ProgressResult,
} from "@/app/etutor/profile/components/Data";

const getCurrentLevel = (etokis: number): Level => {
  if (etokis < 0) throw new Error(`ETokis cannot be negative: ${etokis}`);
  return (
    [...LEVELS].reverse().find((lvl) => etokis >= lvl.etokisRequired) ||
    LEVELS[0]
  );
};

const getNextLevel = (currentLevel: Level): Level | null => {
  const idx = LEVELS.findIndex((lvl) => lvl.level === currentLevel.level);
  return LEVELS[idx + 1] ?? null;
};

const calculateProgress = (
  etokis: number,
  current: Level,
  next: Level | null
): number => {
  if (!next) return 100;
  const earned = etokis - current.etokisRequired;
  const needed = next.etokisRequired - current.etokisRequired;
  return Math.min(100, Math.max(0, (earned / needed) * 100));
};

export const useEtokisProgress = (etokis: number): ProgressResult => {
  return useMemo(() => {
    const current = getCurrentLevel(etokis);
    const next = getNextLevel(current);
    return {
      currentLevel: current.level,
      nextLevel: next?.level ?? null,
      progressPercentage: calculateProgress(etokis, current, next),
      etokisToNextLevel: next ? next.etokisRequired - etokis : 0,
      isMaxLevel: !next,
    };
  }, [etokis]);
};
