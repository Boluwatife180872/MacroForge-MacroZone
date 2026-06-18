import { addMeal, type MealType, type Mood } from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import { tagMeal } from "@/utils/mealPersonality";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as Haptics from "expo-haptics";

const MEAL_TYPES: { key: MealType; label: string; icon: string }[] = [
  { key: "breakfast", label: "Breakfast", icon: "🌅" },
  { key: "lunch", label: "Lunch", icon: "☀️" },
  { key: "dinner", label: "Dinner", icon: "🌙" },
  { key: "snack", label: "Snack", icon: "🍿" },
];

const MOODS: { key: Mood; emoji: string; label: string }[] = [
  { key: "fire", emoji: "🔥", label: "Amazing" },
  { key: "good", emoji: "👍", label: "Good" },
  { key: "meh", emoji: "😐", label: "Meh" },
  { key: "bad", emoji: "👎", label: "Bad" },
];

function getTimeBasedMealType(): MealType {
  const h = new Date().getHours();
  if (h >= 5 && h < 10) return "breakfast";
  if (h >= 11 && h < 15) return "lunch";
  if (h >= 16 && h < 21) return "dinner";
  return "snack";
}

export default function AddMealScreen() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState<MealType>(getTimeBasedMealType());
  const [mood, setMood] = useState<Mood>(null);

  const mealTag =
    name && (Number(calories) > 0 || Number(protein) > 0)
      ? tagMeal({
          id: "",
          name,
          calories: Number(calories) || 0,
          protein: Number(protein) || 0,
          carbs: Number(carbs) || 0,
          fat: Number(fat) || 0,
          createdAt: "",
          mealType,
          mood: null,
        })
      : null;

  const handleAddMeal = async () => {
    if (!name || !calories) {
      Alert.alert("Error", "Please enter a meal name and calories.");
      return;
    }

    await addMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      mealType,
      mood,
    });

    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setMood(null);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.push("/");
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={globalStyles.title}>Log a Meal</Text>

        <Text style={styles.label}>Meal Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Chicken Salad"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />

        {mealTag && (
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>
              {mealTag === "Balanced Bite"
                ? "⚖️"
                : mealTag === "Protein Powerhouse"
                  ? "💪"
                  : mealTag === "Lean Machine"
                    ? "🏃"
                    : mealTag === "Carb Loader"
                      ? "🍞"
                      : mealTag === "Fat Fuel"
                        ? "🥑"
                        : mealTag === "Light Fuel"
                          ? "🥗"
                          : "🍽️"}{" "}
              {mealTag}
            </Text>
          </View>
        )}

        <Text style={styles.label}>When did you eat?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          <View style={styles.chipRow}>
            {MEAL_TYPES.map((mt) => (
              <TouchableOpacity
                key={mt.key}
                style={[
                  styles.chip,
                  mealType === mt.key && styles.chipActive,
                ]}
                onPress={() => setMealType(mt.key)}
              >
                <Text style={styles.chipIcon}>{mt.icon}</Text>
                <Text
                  style={[
                    styles.chipLabel,
                    mealType === mt.key && styles.chipLabelActive,
                  ]}
                >
                  {mt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>How do you feel after eating?</Text>
        <View style={styles.chipRow}>
          {MOODS.map((m) => (
            <TouchableOpacity
              key={m.key}
              style={[
                styles.moodChip,
                mood === m.key && styles.moodChipActive,
              ]}
              onPress={() => setMood(mood === m.key ? null : m.key)}
            >
              <Text style={styles.moodEmoji}>{m.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Calories</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 450"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />

        <View style={styles.macroRow}>
          <View style={styles.macroField}>
            <Text style={styles.macroLabel}>Protein (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={protein}
              onChangeText={setProtein}
            />
          </View>
          <View style={styles.macroField}>
            <Text style={styles.macroLabel}>Carbs (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={carbs}
              onChangeText={setCarbs}
            />
          </View>
          <View style={styles.macroField}>
            <Text style={styles.macroLabel}>Fat (g)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={fat}
              onChangeText={setFat}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
          <Text style={styles.buttonText}>Forge Meal</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tagPill: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  tagText: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: "600",
  },
  chipScroll: {
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "18",
  },
  chipIcon: {
    fontSize: 14,
  },
  chipLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  chipLabelActive: {
    color: colors.primaryLight,
  },
  moodChip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  moodChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + "18",
  },
  moodEmoji: {
    fontSize: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginTop: 20,
  },
  macroRow: {
    flexDirection: "row",
    gap: 10,
  },
  macroField: {
    flex: 1,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
