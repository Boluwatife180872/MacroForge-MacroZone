import DailyPersonality from '@/components/DailyPersonality';
import ForgeScoreCard from '@/components/ForgeScoreCard';
import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { getMeals, Meal } from '@/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <View style={globalStyles.container}>
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ForgeScoreCard meals={meals} />
        <DailyPersonality meals={meals} />

        <Text style={globalStyles.sectionTitle}>Today&apos;s Macros</Text>
        <MacroGrid meals={meals} />

        <Text style={globalStyles.sectionTitle}>Recent Meals</Text>
        <RecentMeals meals={meals} onDelete={loadMeals} />
      </ScrollView>
    </View>
  );
}
