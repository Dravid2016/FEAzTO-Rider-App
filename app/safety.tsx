import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { useRiderStore } from '../src/store/riderStore';
import { useRouter } from 'expo-router';
import { SafetyCard } from '../src/components/rider/SafetyCard';
import { ChevronLeft, ShieldCheck, AlertOctagon, Phone } from 'lucide-react-native';

export default function SafetyScreen() {
  const router = useRouter();
  const {
    helmetVerified,
    raincoatVerified,
    vehicleReadyVerified,
    toggleHelmetCheck,
    toggleRaincoatCheck,
    toggleVehicleCheck,
    shiftMinutesCount,
    startBreak,
    triggerSos,
    profile,
  } = useRiderStore();

  const handleConfirmSos = () => {
    Alert.alert(
      'Trigger Emergency SOS?',
      'This will alert FEAzTO Dispatch Safety Team & your emergency contact Suresh Kumar (+91 98765 00000).',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'ACTIVATE SOS',
          style: 'destructive',
          onPress: () => {
            triggerSos();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Rider Safety & Emergency</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SafetyCard
          helmetVerified={helmetVerified}
          raincoatVerified={raincoatVerified}
          vehicleVerified={vehicleReadyVerified}
          shiftMinutesCount={shiftMinutesCount}
          onToggleHelmet={toggleHelmetCheck}
          onToggleRaincoat={toggleRaincoatCheck}
          onToggleVehicle={toggleVehicleCheck}
          onTakeBreak={startBreak}
          onTriggerSos={handleConfirmSos}
        />

        <View style={styles.contactCard}>
          <ShieldCheck size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.contactTitle}>Emergency Contact Person</Text>
            <Text style={styles.contactName}>{profile.personalDetails.emergencyContactName}</Text>
            <Text style={styles.contactPhone}>{profile.personalDetails.emergencyContactPhone}</Text>
          </View>
        </View>
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
  contactCard: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  contactTitle: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
  },
  contactName: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    marginTop: 2,
  },
  contactPhone: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
});
