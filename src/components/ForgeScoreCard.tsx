import { calcForgeScore, calcTotals, getForgeScoreMeta } from '@/utils/forgeScore';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';

type Props = { meals: Meal[] };

export default function ForgeScoreCard({ meals }: Props) {
  const totals = calcTotals(meals);
  const score = calcForgeScore(totals);
  const { label, emoji } = getForgeScoreMeta(score);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scaleAnim.setValue(0);
    barAnim.setValue(0);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(barAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, [score, scaleAnim, barAnim]);

  const scoreColor =
    score >= 70 ? colors.success : score >= 40 ? colors.score : colors.alert;

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${score}%`],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>Forge Score</Text>
          <Text style={styles.subtitle}>Daily macro quality</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: scoreColor + '22' }]}>
          <Text style={[styles.emoji]}>{emoji}</Text>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <Text style={[styles.scoreValue, { color: scoreColor }]}>{score}</Text>
        <View style={styles.labelColumn}>
          <Text style={[styles.rankLabel, { color: scoreColor }]}>{label}</Text>
          <Text style={styles.vsText}>out of 100</Text>
        </View>
      </View>

      <View style={styles.barTrack}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: scoreColor,
              width: barWidth,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 20,
    marginTop: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    lineHeight: 60,
  },
  labelColumn: {
    paddingBottom: 6,
  },
  rankLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  vsText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  barTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
