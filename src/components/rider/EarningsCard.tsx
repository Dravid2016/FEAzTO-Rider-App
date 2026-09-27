import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { IndianRupee, TrendingUp, Calendar, ChevronRight } from 'lucide-react-native';

interface EarningsCardProps {
  todayTotal: number;
  completedCount: number;
  onlineMinutes: number;
  onPressDetails?: () => void;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  todayTotal,
  completedCount,
  onlineMinutes,
  onPressDetails,
}) => {
  const hours = (onlineMinutes / 60).toFixed(1);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPressDetails}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <IndianRupee size={20} color={Colors.yellowPrimary} />
          </View>
          <View>
            <Text style={styles.label}>Today's Earnings</Text>
            <Text style={styles.amount}>₹{todayTotal}</Text>
          </View>
        </View>
        {onPressDetails && <ChevronRight size={20} color={Colors.textSecondary} />}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statValue}>{completedCount}</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statValue}>{hours} hrs</Text>
          <Text style={styles.statLabel}>Online Time</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={[styles.statValue, styles.bonusText]}>+₹310</Text>
          <Text style={styles.statLabel}>Bonuses</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.yellowSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.yellowPrimary,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  amount: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  bonusText: {
    color: Colors.success,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
});
