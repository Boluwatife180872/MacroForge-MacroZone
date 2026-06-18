import { Meal } from '@/storage/meals';

export type MealTag =
  | 'Protein Powerhouse'
  | 'Lean Machine'
  | 'Carb Loader'
  | 'Fat Fuel'
  | 'Balanced Bite'
  | 'Light Fuel'
  | 'Protein Punch';

export type DailyPersonality =
  | 'The Bodybuilder'
  | 'The Endurance Athlete'
  | 'The Keto King'
  | 'The Balanced Beast'
  | 'The Light Grazer'
  | 'The Feast Master'
  | 'The Protein Seeker'
  | 'The Macro Mixologist'
  | 'The Enigma';

export function tagMeal(meal: Meal): MealTag {
  const { calories, protein, carbs, fat } = meal;
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fat * 9;
  const total = pCal + cCal + fCal || 1;

  const pRatio = pCal / total;
  const cRatio = cCal / total;
  const fRatio = fCal / total;

  if (protein >= 40 && pRatio > 0.4) return 'Protein Powerhouse';
  if (calories < 300 && protein > 20) return 'Lean Machine';
  if (cRatio > 0.5) return 'Carb Loader';
  if (fRatio > 0.4) return 'Fat Fuel';
  if (pRatio > 0.3 && cRatio > 0.3 && fRatio > 0.2) return 'Balanced Bite';
  if (calories < 300) return 'Light Fuel';
  if (pRatio > 0.35) return 'Protein Punch';
  return 'Balanced Bite';
}

export function dailyPersonality(meals: Meal[]): {
  name: DailyPersonality;
  description: string;
} {
  if (meals.length === 0) {
    return {
      name: 'The Enigma',
      description: 'No meals logged yet. Your diet remains a mystery.',
    };
  }

  const totalCals = meals.reduce((s, m) => s + m.calories, 0);
  const totalP = meals.reduce((s, m) => s + m.protein, 0);
  const totalC = meals.reduce((s, m) => s + m.carbs, 0);
  const totalF = meals.reduce((s, m) => s + m.fat, 0);

  const pCal = totalP * 4;
  const cCal = totalC * 4;
  const fCal = totalF * 9;
  const total = pCal + cCal + fCal || 1;

  const pRatio = pCal / total;
  const cRatio = cCal / total;
  const fRatio = fCal / total;

  const hasBreakfast = meals.some((m) => m.mealType === 'breakfast');
  const hasLunch = meals.some((m) => m.mealType === 'lunch');
  const hasDinner = meals.some((m) => m.mealType === 'dinner');
  const mealsCount = meals.length;

  if (pRatio > 0.35 && totalCals > 1500) {
    return {
      name: 'The Bodybuilder',
      description: 'High protein intake — gains incoming!',
    };
  }
  if (cRatio > 0.5 && totalCals > 1500) {
    return {
      name: 'The Endurance Athlete',
      description: 'Carbs for days — you run on fuel!',
    };
  }
  if (fRatio > 0.45 && cRatio < 0.2) {
    return {
      name: 'The Keto King',
      description: 'Low carb, high fat — in the zone.',
    };
  }
  if (pRatio > 0.25 && cRatio > 0.35 && fRatio > 0.2 && mealsCount >= 3) {
    return {
      name: 'The Balanced Beast',
      description: 'Perfectly balanced, as all things should be.',
    };
  }
  if (totalCals < 1000) {
    return {
      name: 'The Light Grazer',
      description: 'Keeping it light today.',
    };
  }
  if (totalCals > 3000) {
    return {
      name: 'The Feast Master',
      description: 'Feasting like a king today!',
    };
  }
  if (pRatio > 0.3) {
    return {
      name: 'The Protein Seeker',
      description: 'Hunting down that protein.',
    };
  }
  if (hasBreakfast && hasLunch && hasDinner) {
    return {
      name: 'The Macro Mixologist',
      description: 'Three meals — structured and on point.',
    };
  }

  return {
    name: 'The Balanced Beast',
    description: 'Solid mix — keep it up!',
  };
}
