import { StyleSheet, View } from 'react-native';
import { Meal } from '@/storage/meals';
import { calcTotals } from '@/utils/forgeScore';
import MacroCard from './MacroCard';
import { colors } from '@/styles/global';

type MacroGridProps = {
  meals: Meal[];
};

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = calcTotals(meals);

  return (
    <View style={styles.grid}>
      <MacroCard
        label='Calories'
        value={`${totals.calories}`}
        goal='2,000'
        color={colors.calories}
      />
      <MacroCard
        label='Protein'
        value={`${totals.protein}g`}
        goal='150g'
        color={colors.protein}
      />
      <MacroCard
        label='Carbs'
        value={`${totals.carbs}g`}
        goal='250g'
        color={colors.carbs}
      />
      <MacroCard
        label='Fat'
        value={`${totals.fat}g`}
        goal='65g'
        color={colors.fat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});