import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react-native';

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { profile, setVerificationStatus } = useRiderStore();
  const status = profile.verificationStatus;

  const renderContent = () => {
    switch (status) {
      case 'APPROVED':
      case 'VERIFIED':
        return {
          icon: <ShieldCheck size={56} color={Colors.success} />,
          title: 'Verification Approved!',
          description: 'Your rider profile and background checks are fully verified. You can go online and accept delivery orders now.',
          badgeType: 'success' as const,
        };
      case 'NEEDS_CORRECTION':
        return {
          icon: <AlertTriangle size={56} color={Colors.error} />,
          title: 'Correction Required',
          description: 'Your Driving Licence or RC photo was blurry. Please re-upload clear document copies to proceed.',
          badgeType: 'error' as const,
        };
      default:
        return {
          icon: <Clock size={56} color={Colors.yellowPrimary} />,
          title: 'Application Under Review',
          description: 'Our onboarding team is reviewing your uploaded documents. Verification usually takes 2-4 hours.',
          badgeType: 'warning' as const,
        };
    }
  };

  const content = renderContent();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>{content.icon}</View>
        <StatusBadge label={status} type={content.badgeType} />
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.description}>{content.description}</Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailRow}>Rider Code: <Text style={styles.bold}>{profile.riderCode}</Text></Text>
          <Text style={styles.detailRow}>Submitted On: <Text style={styles.bold}>{profile.joinedDate}</Text></Text>
        </View>

        {status === 'APPROVED' || status === 'VERIFIED' ? (
          <PrimaryButton
            title="Go to Rider Home"
            onPress={() => router.replace('/(tabs)')}
            style={styles.button}
          />
        ) : (
          <>
            <PrimaryButton
              title="Edit Submitted Documents"
              onPress={() => router.push('/(onboarding)/review')}
              style={styles.button}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding * 1.5,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeight.sm,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: Colors.elevatedSurface,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadiusSm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
    gap: Spacing.xs,
  },
  detailRow: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  bold: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  button: {
    width: '100%',
  },
  secButton: {
    width: '100%',
    marginTop: Spacing.sm,
  },
});
