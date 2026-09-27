import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { useSlotStore } from '../src/store/slotStore';
import { useRouter } from 'expo-router';
import { SlotCard } from '../src/components/rider/SlotCard';
import { ChevronLeft, Clock } from 'lucide-react-native';

export default function SlotsScreen() {
  const router = useRouter();
  const { slots, bookSlot, cancelSlot } = useSlotStore();

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Work Slot Booking</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Clock size={24} color={Colors.yellowPrimary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Reserve High-Demand Shift Slots</Text>
            <Text style={styles.bannerSub}>
              Booking slots guarantees high order allocation and bonus surge multipliers!
            </Text>
          </View>
        </View>

        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onBook={bookSlot}
            onCancel={cancelSlot}
          />
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
  banner: {
    backgroundColor: Colors.yellowSoft,
    borderColor: Colors.yellowPrimary,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  bannerTitle: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  bannerSub: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
});
