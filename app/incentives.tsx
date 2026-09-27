import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { useIncentiveStore } from '../src/store/incentiveStore';
import { useRouter } from 'expo-router';
import { IncentiveCard } from '../src/components/rider/IncentiveCard';
import { ChevronLeft, Gift } from 'lucide-react-native';

export default function IncentivesScreen() {
  const router = useRouter();
  const { campaigns } = useIncentiveStore();

  const totalRewardsClaimed = campaigns.filter(c => c.isCompleted).reduce((acc, c) => acc + c.rewardAmount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Incentives & Rewards</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Gift size={32} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.summaryLabel}>Total Rewards Earned This Week</Text>
            <Text style={styles.summaryVal}>₹{totalRewardsClaimed + 1450}</Text>
          </View>
        </View>

        {campaigns.map((inc) => (
          <IncentiveCard key={inc.id} incentive={inc} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl * 1.2,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl * 2,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  summaryVal: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
  },
});
