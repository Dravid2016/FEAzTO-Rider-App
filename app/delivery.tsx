import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { useOrderStore } from '../src/store/orderStore';
import { useRiderStore } from '../src/store/riderStore';
import { useRouter } from 'expo-router';
import { MapCard } from '../src/components/delivery/MapCard';
import { StatusBadge } from '../src/components/common/StatusBadge';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { InputField } from '../src/components/common/InputField';
import { EmptyState } from '../src/components/common/EmptyState';
import { Store, MapPin, Phone, ShieldCheck, CheckCircle2, ChevronLeft, AlertTriangle } from 'lucide-react-native';

export default function DeliveryScreen() {
  const router = useRouter();
  const {
    activeOrder,
    confirmKitchenArrival,
    confirmOrderPickup,
    confirmCustomerArrival,
    verifyCustomerOtp,
    completeDelivery,
    error,
    clearError,
  } = useOrderStore();

  const [customerOtpInput, setCustomerOtpInput] = useState('');

  if (!activeOrder) {
    return (
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Delivery Tracker</Text>
        </View>
        <EmptyState
          title="No active delivery"
          description="You do not have an in-progress delivery order at the moment."
          actionTitle="Back to Rider Home"
          onAction={() => router.replace('/(tabs)')}
        />
      </View>
    );
  }

  const { state, kitchen, customer, items, earnings } = activeOrder;

  const handleStepAction = () => {
    clearError();
    switch (state) {
      case 'RIDER_ASSIGNED':
      case 'RIDER_ACCEPTED':
        confirmKitchenArrival();
        break;
      case 'RIDER_AT_KITCHEN':
        confirmOrderPickup();
        break;
      case 'OUT_FOR_DELIVERY':
        confirmCustomerArrival();
        break;
      case 'RIDER_AT_CUSTOMER':
        const ok = verifyCustomerOtp(customerOtpInput);
        if (ok) {
          // verified
        }
        break;
      case 'DELIVERY_VERIFIED':
        completeDelivery();
        router.replace('/(tabs)');
        break;
    }
  };

  const getStepButtonTitle = () => {
    switch (state) {
      case 'RIDER_ASSIGNED':
      case 'RIDER_ACCEPTED':
        return 'ARRIVED AT KITCHEN';
      case 'RIDER_AT_KITCHEN':
        return 'CONFIRM ORDER PICKUP';
      case 'OUT_FOR_DELIVERY':
        return 'ARRIVED AT CUSTOMER LOCATION';
      case 'RIDER_AT_CUSTOMER':
        return 'VERIFY CUSTOMER OTP';
      case 'DELIVERY_VERIFIED':
        return 'COMPLETE DELIVERY & CLAIM PAYOUT';
      default:
        return 'BACK TO HOME';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.titleCol}>
          <Text style={styles.topTitle}>Order {activeOrder.id}</Text>
          <Text style={styles.topSub}>Canonical Ecosystem ID</Text>
        </View>
        <StatusBadge label={state.replace(/_/g, ' ')} type="warning" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Navigation Map Card */}
        <MapCard
          originName={state === 'OUT_FOR_DELIVERY' || state === 'RIDER_AT_CUSTOMER' ? kitchen.name : 'Your Location'}
          destinationName={state === 'OUT_FOR_DELIVERY' || state === 'RIDER_AT_CUSTOMER' ? customer.name : kitchen.name}
          distanceKm={state === 'OUT_FOR_DELIVERY' || state === 'RIDER_AT_CUSTOMER' ? activeOrder.deliveryDistanceKm : activeOrder.pickupDistanceKm}
          estimatedMins={activeOrder.estimatedTimeMinutes}
          currentStepInstruction={
            state === 'RIDER_AT_KITCHEN'
              ? 'At Kitchen • Wait for food bag at Counter 2'
              : state === 'OUT_FOR_DELIVERY'
              ? 'Riding to Customer • Head South on Anna Salai'
              : state === 'RIDER_AT_CUSTOMER'
              ? 'Arrived at Customer • Ask customer for 4-digit OTP'
              : 'Head North towards FEAzTO Kitchen #04'
          }
        />

        {/* Step 1: Kitchen Details */}
        <View style={[styles.stepBox, (state === 'RIDER_ACCEPTED' || state === 'RIDER_AT_KITCHEN') && styles.stepBoxActive]}>
          <View style={styles.stepHeaderRow}>
            <Store size={20} color={Colors.yellowPrimary} />
            <Text style={styles.stepTitle}>1. Kitchen Pickup</Text>
            {state !== 'RIDER_ASSIGNED' && state !== 'RIDER_ACCEPTED' && (
              <CheckCircle2 size={18} color={Colors.success} style={{ marginLeft: 'auto' }} />
            )}
          </View>
          <Text style={styles.locationName}>{kitchen.name}</Text>
          <Text style={styles.locationSub}>{kitchen.address}</Text>
          {kitchen.instructions && (
            <Text style={styles.instructionsText}>Note: {kitchen.instructions}</Text>
          )}
        </View>

        {/* Step 2: Customer Details */}
        <View style={[styles.stepBox, (state === 'OUT_FOR_DELIVERY' || state === 'RIDER_AT_CUSTOMER') && styles.stepBoxActive]}>
          <View style={styles.stepHeaderRow}>
            <MapPin size={20} color={Colors.success} />
            <Text style={styles.stepTitle}>2. Customer Dropoff</Text>
            {state === 'DELIVERY_VERIFIED' && (
              <CheckCircle2 size={18} color={Colors.success} style={{ marginLeft: 'auto' }} />
            )}
          </View>
          <Text style={styles.locationName}>{customer.name}</Text>
          <Text style={styles.locationSub}>{customer.address}</Text>
          <Text style={styles.phoneText}>Phone: {customer.phone}</Text>

          {state === 'RIDER_AT_CUSTOMER' && (
            <View style={styles.otpInputContainer}>
              <Text style={styles.otpLabel}>Ask customer for Delivery OTP Code (Demo OTP: <Text style={{ fontWeight: 'bold' }}>{customer.deliveryOtp}</Text>)</Text>
              <InputField
                placeholder="Enter 4-digit OTP"
                keyboardType="number-pad"
                maxLength={4}
                value={customerOtpInput}
                onChangeText={setCustomerOtpInput}
                error={error}
              />
            </View>
          )}
        </View>

        {/* Order Items & Payout Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Items & Payout</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.payoutRow}>
            <Text style={styles.payoutLabel}>Total Payout for Delivery</Text>
            <Text style={styles.payoutVal}>₹{earnings.totalEarnings}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action CTA Bar */}
      <View style={styles.ctaBar}>
        <PrimaryButton
          title={getStepButtonTitle()}
          onPress={handleStepAction}
          variant={state === 'DELIVERY_VERIFIED' ? 'success' : 'yellow'}
        />
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl * 1.2,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleCol: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  topTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  topSub: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 100,
  },
  stepBox: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  stepBoxActive: {
    borderColor: Colors.yellowPrimary,
    backgroundColor: Colors.yellowSoft,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  stepTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  locationName: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  locationSub: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  instructionsText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  phoneText: {
    color: Colors.info,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
  },
  otpInputContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  otpLabel: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    marginBottom: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  itemPrice: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  payoutVal: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.heavy,
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.screenPadding,
  },
});
