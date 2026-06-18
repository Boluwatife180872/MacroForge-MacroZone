import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mood = 'fire' | 'good' | 'meh' | 'bad' | null;
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
  mealType: MealType;
  mood: Mood;
};

const MEALS_KEY = 'meals';

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (
  meal: Omit<Meal, 'id' | 'createdAt'>,
): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  return newMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};

export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
};

export const getTodayMeals = async (): Promise<Meal[]> => {
  const meals = await getMeals();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return meals.filter((m) => m.createdAt.startsWith(todayStr));
};

export const getStreak = async (): Promise<number> => {
  const meals = await getMeals();
  if (meals.length === 0) return 0;

  const dateSet = new Set<string>();
  for (const m of meals) {
    dateSet.add(m.createdAt.split('T')[0]);
  }

  const dates = Array.from(dateSet).sort().reverse();
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (dates[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};