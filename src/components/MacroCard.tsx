import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
}: MacroCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: color }]} />
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.goal}>goal: {goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  accent: {
    width: 32,
    height: 3,
    borderRadius: 2,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  goal: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
});