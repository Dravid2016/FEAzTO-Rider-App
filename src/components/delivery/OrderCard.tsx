import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../../types/order';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { MapPin, Store, Navigation, Phone, ChevronRight } from 'lucide-react-native';
import { StatusBadge } from '../common/StatusBadge';

interface OrderCardProps {
  order: Order;
  onPressAction?: () => void;
  actionTitle?: string;
  onPressDetails?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPressAction,
  actionTitle,
  onPressDetails,
}) => {
  const getBadgeType = () => {
    switch (order.state) {
      case 'DELIVERED':
        return 'success';
      case 'OUT_FOR_DELIVERY':
      case 'RIDER_AT_CUSTOMER':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={onPressDetails ? 0.85 : 1}
      onPress={onPressDetails}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.idRow}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.itemCount}>{order.items.length} Items</Text>
        </View>
        <StatusBadge label={order.state.replace(/_/g, ' ')} type={getBadgeType()} />
      </View>

      <View style={styles.sectionDivider} />

      {/* Kitchen Pickup Section */}
      <View style={styles.locationRow}>
        <View style={styles.iconCol}>
          <Store size={18} color={Colors.yellowPrimary} />
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.locationLabel}>PICKUP FROM KITCHEN</Text>
          <Text style={styles.locationName}>{order.kitchen.name}</Text>
          <Text style={styles.locationAddress} numberOfLines={1}>
            {order.kitchen.address} ({order.pickupDistanceKm} km)
          </Text>
        </View>
      </View>

      {/* Customer Drop Section */}
      <View style={styles.locationRow}>
        <View style={styles.iconCol}>
          <MapPin size={18} color={Colors.success} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.locationLabel}>DELIVER TO CUSTOMER</Text>
          <Text style={styles.locationName}>{order.customer.name}</Text>
          <Text style={styles.locationAddress} numberOfLines={1}>
            {order.customer.address} ({order.deliveryDistanceKm} km)
          </Text>
        </View>
      </View>

      <View style={styles.payoutFooter}>
        <View>
          <Text style={styles.payoutLabel}>Total Earnings</Text>
          <Text style={styles.payoutValue}>₹{order.earnings.totalEarnings}</Text>
        </View>

        {onPressAction && actionTitle && (
          <TouchableOpacity style={styles.actionBtn} onPress={onPressAction}>
            <Text style={styles.actionBtnText}>{actionTitle}</Text>
            <ChevronRight size={16} color={Colors.textDark} />
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  orderId: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: 0.5,
  },
  itemCount: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  iconCol: {
    alignItems: 'center',
    width: 24,
    marginRight: Spacing.sm,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  textCol: {
    flex: 1,
  },
  locationLabel: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs - 1,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  locationName: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    marginTop: 1,
  },
  locationAddress: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  payoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  payoutLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  payoutValue: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.heavy,
  },
  actionBtn: {
    backgroundColor: Colors.yellowPrimary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Spacing.borderRadiusSm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtnText: {
    color: Colors.textDark,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
});
