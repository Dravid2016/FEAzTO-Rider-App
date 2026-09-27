import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppNotification } from '../../types/notification';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Bell, ShoppingBag, CloudRain, ShieldAlert } from 'lucide-react-native';

interface NotificationCardProps {
  notification: AppNotification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'NEW_DELIVERY':
        return <ShoppingBag size={18} color={Colors.yellowPrimary} />;
      case 'WEATHER_ALERT':
        return <CloudRain size={18} color={Colors.info} />;
      case 'SAFETY_ALERT':
        return <ShieldAlert size={18} color={Colors.warning} />;
      default:
        return <Bell size={18} color={Colors.textSecondary} />;
    }
  };

  return (
    <View style={[styles.card, !notification.isRead && styles.cardUnread]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {getIcon()}
          <Text style={styles.title}>{notification.title}</Text>
        </View>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
      <Text style={styles.message}>{notification.message}</Text>
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
  cardUnread: {
    borderColor: Colors.yellowPrimary,
    backgroundColor: Colors.yellowSoft,
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
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  timestamp: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs - 1,
  },
  message: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
  },
});
