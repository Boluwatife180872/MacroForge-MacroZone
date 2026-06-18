import { Meal } from '@/storage/meals';

type Macros = { calories: number; protein: number; carbs: number; fat: number };

export function calcTotals(meals: Meal[]): Macros {
  return meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function calcForgeScore(totals: Macros): number {
  if (totals.calories === 0) return 0;

  const pCal = totals.protein * 4;
  const cCal = totals.carbs * 4;
  const fCal = totals.fat * 9;
  const totalCal = pCal + cCal + fCal;
  if (totalCal === 0) return 0;

  const pRatio = pCal / totalCal;
  const cRatio = cCal / totalCal;
  const fRatio = fCal / totalCal;

  const idealP = 0.3;
  const idealC = 0.4;
  const idealF = 0.3;

  const scoreP = clamp(100 - Math.abs(pRatio - idealP) * 200, 0, 100);
  const scoreC = clamp(100 - Math.abs(cRatio - idealC) * 200, 0, 100);
  const scoreF = clamp(100 - Math.abs(fRatio - idealF) * 200, 0, 100);

  const balanceScore = (scoreP + scoreC + scoreF) / 3;

  const totalCalScore =
    totals.calories < 500
      ? 30
      : totals.calories > 5000
        ? 40
        : clamp(100 - Math.abs(totals.calories - 2000) / 30, 50, 100);

  return Math.round(balanceScore * 0.75 + totalCalScore * 0.25);
}

function scoreLabel(score: number): string {
  if (score >= 85) return 'Legendary';
  if (score >= 70) return 'Elite';
  if (score >= 55) return 'Solid';
  if (score >= 40) return 'Decent';
  if (score >= 25) return 'Rough';
  return 'Needs Work';
}

const scoreEmoji: Record<string, string> = {
  Legendary: '⚡',
  Elite: '🔥',
  Solid: '💪',
  Decent: '👍',
  Rough: '😬',
  'Needs Work': '🛑',
};

export function getForgeScoreMeta(score: number) {
  const label = scoreLabel(score);
  return { label, emoji: scoreEmoji[label] };
}
