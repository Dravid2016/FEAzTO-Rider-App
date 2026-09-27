import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface StatusBadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  type = 'info',
  size = 'md',
}) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'success':
        return { bg: Colors.successSoft, border: Colors.success, text: Colors.success };
      case 'warning':
        return { bg: Colors.warningSoft, border: Colors.warning, text: Colors.warning };
      case 'error':
        return { bg: Colors.errorSoft, border: Colors.error, text: Colors.error };
      case 'neutral':
        return { bg: Colors.surface, border: Colors.border, text: Colors.textSecondary };
      default:
        return { bg: Colors.infoSoft, border: Colors.info, text: Colors.info };
    }
  };

  const colors = getBadgeStyle();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: isSm ? Spacing.xs : Spacing.sm,
          paddingVertical: isSm ? 2 : 4,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSm ? Typography.fontSize.xs - 1 : Typography.fontSize.xs,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
