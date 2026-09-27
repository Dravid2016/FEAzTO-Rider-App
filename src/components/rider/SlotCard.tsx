import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WorkSlot } from '../../types/slot';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Clock, CheckCircle2 } from 'lucide-react-native';
import { StatusBadge } from '../common/StatusBadge';

interface SlotCardProps {
  slot: WorkSlot;
  onBook: (slotId: string) => void;
  onCancel: (slotId: string) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, onBook, onCancel }) => {
  const isFull = slot.status === 'FULL';

  return (
    <View style={[styles.card, slot.isBooked && styles.cardBooked]}>
      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Clock size={18} color={slot.isBooked ? Colors.yellowPrimary : Colors.textSecondary} />
          <Text style={styles.slotName}>{slot.name}</Text>
        </View>
        <StatusBadge
          label={slot.isBooked ? 'BOOKED' : slot.status}
          type={slot.isBooked ? 'success' : isFull ? 'error' : slot.status === 'LIMITED' ? 'warning' : 'info'}
        />
      </View>

      <Text style={styles.timeRange}>{slot.timeRange}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.demandText}>Demand: <Text style={styles.demandHighlight}>{slot.expectedDemand}</Text></Text>
        <Text style={styles.bonusText}>Extra +₹{slot.incentiveBonusPerDelivery}/del</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.capacityText}>
          {isFull ? 'No spots remaining' : `${slot.remainingCapacity} spots open`}
        </Text>
        {slot.isBooked ? (
          <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(slot.id)}>
            <Text style={styles.cancelBtnText}>Cancel Slot</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isFull}
            style={[styles.bookBtn, isFull && styles.bookBtnDisabled]}
            onPress={() => onBook(slot.id)}
          >
            <Text style={styles.bookBtnText}>{isFull ? 'Full' : 'Book Slot'}</Text>
          </TouchableOpacity>
        )}
      </View>
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
  cardBooked: {
    borderColor: Colors.yellowPrimary,
    backgroundColor: Colors.yellowSoft,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  slotName: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  timeRange: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  demandText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  demandHighlight: {
    color: Colors.yellowPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  bonusText: {
    color: Colors.success,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  capacityText: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
  },
  bookBtn: {
    backgroundColor: Colors.yellowPrimary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Spacing.borderRadiusSm,
  },
  bookBtnDisabled: {
    backgroundColor: Colors.border,
  },
  bookBtnText: {
    color: Colors.textDark,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  cancelBtn: {
    backgroundColor: Colors.elevatedSurface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Spacing.borderRadiusSm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
});
