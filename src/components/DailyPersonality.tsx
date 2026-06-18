import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';
import { dailyPersonality } from '@/utils/mealPersonality';
import { StyleSheet, Text, View } from 'react-native';

type Props = { meals: Meal[] };

export default function DailyPersonality({ meals }: Props) {
  if (meals.length === 0) return null;

  const { name: personalityName, description } = dailyPersonality(meals);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Today&apos;s Food Personality</Text>
      <Text style={styles.name}>{personalityName}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryLight,
    marginTop: 6,
  },
  desc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
