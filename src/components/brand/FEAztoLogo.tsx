import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface FEAztoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const FEAztoLogo: React.FC<FEAztoLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return Typography.fontSize.lg;
      case 'lg':
        return Typography.fontSize.xxxl;
      default:
        return Typography.fontSize.xxl;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <Text style={[styles.brandTextMain, { fontSize: getFontSize() }]}>
          FEA<Text style={styles.brandTextAccent}>z</Text>TO
        </Text>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>RIDER</Text>
        </View>
      </View>
      {showSubtitle && (
        <Text style={styles.subtitle}>OFFICIAL PARTNER APP</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brandTextMain: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: 1.5,
  },
  brandTextAccent: {
    color: Colors.yellowPrimary,
  },
  tagBadge: {
    backgroundColor: Colors.yellowPrimary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadiusSm,
  },
  tagText: {
    color: Colors.textDark,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
});
