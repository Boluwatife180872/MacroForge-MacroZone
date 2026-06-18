import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0f0f23',
  surface: '#1a1a3e',
  surfaceLight: '#252550',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.1)',
  primary: '#7c5cfc',
  primaryLight: '#a78bfa',
  accent: '#f472b6',
  text: '#ffffff',
  textSecondary: '#8888aa',
  textMuted: '#555577',
  alert: '#ef4444',
  success: '#34d399',
  score: '#fbbf24',
  // macro colors
  protein: '#34d399',
  carbs: '#fbbf24',
  fat: '#f472b6',
  calories: '#ef4444',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});