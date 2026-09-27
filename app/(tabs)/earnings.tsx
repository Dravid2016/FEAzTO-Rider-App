import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Pill } from '../../src/components/common/Pill';
import { SectionHeader } from '../../src/components/common/SectionHeader';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { IndianRupee, TrendingUp, Calendar, ArrowUpRight, ShieldAlert } from 'lucide-react-native';

export default function EarningsScreen() {
  const [timeFilter, setTimeFilter] = useState<'TODAY' | 'WEEK' | 'MONTH'>('TODAY');

  const getEarningsData = () => {
    switch (timeFilter) {
      case 'WEEK':
        return { total: 8650, deliveries: 54, distance: 210, base: 5400, rain: 1200, peak: 950, tips: 1100 };
      case 'MONTH':
        return { total: 34200, deliveries: 218, distance: 890, base: 21500, rain: 4800, peak: 4100, tips: 3800 };
      default:
        return { total: 1240, deliveries: 8, distance: 34.2, base: 820, rain: 240, peak: 90, tips: 90 };
    }
  };

  const data = getEarningsData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings & Payouts</Text>
        <Text style={styles.subtitle}>Financial performance and breakdown</Text>
      </View>

      <View style={styles.filterRow}>
        <Pill label="Today" active={timeFilter === 'TODAY'} onPress={() => setTimeFilter('TODAY')} />
        <Pill label="This Week" active={timeFilter === 'WEEK'} onPress={() => setTimeFilter('WEEK')} />
        <Pill label="This Month" active={timeFilter === 'MONTH'} onPress={() => setTimeFilter('MONTH')} />
      </View>

      {/* Main Earnings Card */}
      <View style={styles.mainCard}>
        <Text style={styles.cardLabel}>TOTAL EARNINGS</Text>
        <Text style={styles.totalAmount}>₹{data.total.toLocaleString()}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaVal}>{data.deliveries}</Text>
            <Text style={styles.metaLabel}>Deliveries</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaCol}>
            <Text style={styles.metaVal}>{data.distance} km</Text>
            <Text style={styles.metaLabel}>Distance</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaCol}>
            <Text style={[styles.metaVal, { color: Colors.success }]}>₹{data.rain + data.peak}</Text>
            <Text style={styles.metaLabel}>Surge & Bonuses</Text>
          </View>
        </View>
      </View>

      {/* Breakdown List */}
      <SectionHeader title="Earnings Breakdown" />
      <View style={styles.breakdownCard}>
        <View style={styles.breakdownRow}>
          <Text style={styles.rowLabel}>Base Delivery Earnings</Text>
          <Text style={styles.rowVal}>₹{data.base}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.rowLabel}>Rain Surge Bonus</Text>
          <Text style={[styles.rowVal, { color: Colors.info }]}>+₹{data.rain}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.rowLabel}>Peak Hours Bonus</Text>
          <Text style={[styles.rowVal, { color: Colors.warning }]}>+₹{data.peak}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.rowLabel}>Customer Tips</Text>
          <Text style={[styles.rowVal, { color: Colors.success }]}>+₹{data.tips}</Text>
        </View>
      </View>

      {/* Prototype Disclaimer */}
      <View style={styles.noticeBox}>
        <ShieldAlert size={16} color={Colors.yellowPrimary} style={{ marginRight: 6 }} />
        <Text style={styles.noticeText}>
          Mock Earnings System: Real bank payouts require backend integration.
        </Text>
      </View>

      {/* Payout History */}
      <SectionHeader title="Recent Bank Transfers" />
      <View style={styles.payoutCard}>
        <View style={styles.payoutHeader}>
          <View>
            <Text style={styles.payoutDate}>Weekly Payout (Sep 18 - Sep 25)</Text>
            <Text style={styles.refText}>Ref: UPI/60291048201</Text>
          </View>
          <StatusBadge label="TRANSFERRED" type="success" />
        </View>
        <Text style={styles.payoutAmount}>₹7,850.00</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl * 2,
  },
  header: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  mainCard: {
    backgroundColor: Colors.yellowSoft,
    borderColor: Colors.yellowPrimary,
    borderWidth: 1.5,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding * 1.2,
    alignItems: 'center',
  },
  cardLabel: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: 1,
  },
  totalAmount: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.heavy,
    marginVertical: Spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.yellowPrimary,
  },
  metaCol: {
    alignItems: 'center',
    flex: 1,
  },
  metaVal: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  metaLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
  },
  breakdownCard: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  rowVal: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    padding: Spacing.sm,
    marginVertical: Spacing.md,
  },
  noticeText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    flex: 1,
  },
  payoutCard: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutDate: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  refText: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  payoutAmount: {
    color: Colors.success,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.heavy,
    marginTop: Spacing.md,
  },
});
