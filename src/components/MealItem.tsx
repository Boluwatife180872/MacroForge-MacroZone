import { deleteMeal, type MealType, type Mood } from "@/storage/meals";
import { colors } from "@/styles/global";
import { tagMeal } from "@/utils/mealPersonality";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  mood: Mood;
  onDelete: () => void;
};

const MEAL_ICONS: Record<MealType, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "🍿",
};

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const MOOD_EMOJI: Record<string, string> = {
  fire: "🔥",
  good: "👍",
  meh: "😐",
  bad: "👎",
};

const MOOD_LABEL: Record<string, string> = {
  fire: "Amazing",
  good: "Good",
  meh: "Meh",
  bad: "Bad",
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  mealType,
  mood,
  onDelete,
}: MealItemProps) {
  const [showDetail, setShowDetail] = useState(false);
  const tag = tagMeal({ id, name, calories, protein, carbs, fat, createdAt: "", mealType, mood: null });

  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Remove "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowDetail(true)}
        onLongPress={handleLongPress}
      >
        <View style={styles.left}>
          <Text style={styles.typeIcon}>{MEAL_ICONS[mealType]}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.macros}>
              {calories} cal &middot; {protein}g P &middot; {carbs}g C &middot; {fat}g F
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          {mood && <Text style={styles.mood}>{MOOD_EMOJI[mood]}</Text>}
          <Text style={styles.tag}>{tag}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={showDetail}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetail(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowDetail(false)}>
          <Pressable style={styles.modalCard}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>{name}</Text>

            <View style={styles.modalTagRow}>
              <Text style={styles.modalTag}>{MEAL_ICONS[mealType]} {MEAL_LABELS[mealType]}</Text>
              {mood && (
                <Text style={styles.modalTag}>{MOOD_EMOJI[mood]} {MOOD_LABEL[mood]}</Text>
              )}
            </View>

            <View style={styles.modalDivider} />

            <Text style={styles.modalPersonality}>{tag}</Text>

            <View style={styles.modalMacroGrid}>
              <DetailRow label="Calories" value={`${calories}`} color={colors.calories} />
              <DetailRow label="Protein" value={`${protein}g`} color={colors.protein} />
              <DetailRow label="Carbs" value={`${carbs}g`} color={colors.carbs} />
              <DetailRow label="Fat" value={`${fat}g`} color={colors.fat} />
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetail(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function DetailRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  macros: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  mood: {
    fontSize: 16,
  },
  tag: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  modalTagRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  modalTag: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    color: colors.textSecondary,
    overflow: "hidden",
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 16,
  },
  modalPersonality: {
    fontSize: 14,
    color: colors.primaryLight,
    fontWeight: "600",
    marginBottom: 16,
  },
  modalMacroGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
  },
  detailLabel: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
  },
});
