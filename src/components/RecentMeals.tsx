import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/storage/meals';
import MealItem from './MealItem';

type RecentMealsProps = {
  meals: Meal[];
  onDelete: () => void;
};

export default function RecentMeals({ meals, onDelete }: RecentMealsProps) {
  return (
    <View style={{ marginTop: 4 }}>
      {meals.length === 0 ? (
        <Text style={styles.empty}>No meals logged yet. Tap the + to start.</Text>
      ) : (
        meals
          .slice(0, 5)
          .map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              mealType={meal.mealType}
              mood={meal.mood}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    color: '#555577',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});
