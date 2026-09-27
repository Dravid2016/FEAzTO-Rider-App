import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IncentiveCampaign } from '../../types/incentive';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Gift, Zap, CloudRain, Award, Flame } from 'lucide-react-native';
import { ProgressBar } from '../common/ProgressBar';

interface IncentiveCardProps {
  incentive: IncentiveCampaign;
}

export const IncentiveCard: React.FC<IncentiveCardProps> = ({ incentive }) => {
  const getIcon = () => {
    switch (incentive.type) {
      case 'RAIN':
        return <CloudRain size={20} color={Colors.info} />;
      case 'PEAK':
        return <Zap size={20} color={Colors.warning} />;
      case 'STREAK':
        return <Flame size={20} color={Colors.error} />;
      case 'WEEKLY':
        return <Award size={20} color={Colors.success} />;
      default:
        return <Gift size={20} color={Colors.yellowPrimary} />;
    }
  };

  const progressFraction = incentive.targetCount > 0 ? incentive.currentProgress / incentive.targetCount : 1;
  const isPerDelivery = !!incentive.perDeliveryBonus;

  return (
    <View style={[styles.card, incentive.isCompleted && styles.cardCompleted]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {getIcon()}
          <Text style={styles.title}>{incentive.title}</Text>
        </View>
        <Text style={styles.rewardText}>
          {isPerDelivery ? `+₹${incentive.perDeliveryBonus}/del` : `₹${incentive.rewardAmount} Reward`}
        </Text>
      </View>

      <Text style={styles.description}>{incentive.description}</Text>

      {!isPerDelivery && (
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {incentive.currentProgress} / {incentive.targetCount} deliveries
            </Text>
            <Text style={styles.targetRemaining}>
              {incentive.isCompleted ? 'Completed! 🎉' : `${incentive.targetCount - incentive.currentProgress} remaining`}
            </Text>
          </View>
          <ProgressBar progress={progressFraction} color={incentive.isCompleted ? Colors.success : Colors.yellowPrimary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  cardCompleted: {
    borderColor: Colors.success,
    backgroundColor: '#062B21',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  rewardText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.heavy,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
  },
  progressContainer: {
    marginTop: Spacing.md,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  targetRemaining: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
});
