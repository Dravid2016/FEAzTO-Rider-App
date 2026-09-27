import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { Navigation, Bike, Zap } from 'lucide-react-native';

export default function VehicleScreen() {
  const router = useRouter();
  const { profile, updateVehicleDetails } = useRiderStore();
  const [type, setType] = useState<any>(profile.vehicle.type);
  const [regNum, setRegNum] = useState(profile.vehicle.registrationNumber);
  const [modelName, setModelName] = useState(profile.vehicle.modelName);

  const vehicleOptions = [
    { key: 'SCOOTER', label: 'Scooter', icon: Bike },
    { key: 'BIKE', label: 'Motorcycle', icon: Navigation },
    { key: 'ELECTRIC_VEHICLE', label: 'EV Electric', icon: Zap },
  ];

  const handleNext = () => {
    updateVehicleDetails({
      type,
      registrationNumber: regNum,
      modelName,
    });
    router.push('/(onboarding)/documents');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 3 OF 6</Text>
        <Text style={styles.title}>Vehicle Information</Text>
        <Text style={styles.subtitle}>Select vehicle type and enter registration details</Text>
      </View>

      <Text style={styles.sectionLabel}>Vehicle Category</Text>
      <View style={styles.typeGrid}>
        {vehicleOptions.map((opt) => {
          const active = type === opt.key;
          const Icon = opt.icon;
          return (
            <TouchableOpacity
              key={opt.key}
              activeOpacity={0.8}
              onPress={() => setType(opt.key)}
              style={[styles.typeCard, active && styles.typeCardActive]}
            >
              <Icon size={24} color={active ? Colors.yellowPrimary : Colors.textSecondary} />
              <Text style={[styles.typeLabel, active && styles.typeLabelActive]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <InputField
        label="Vehicle Registration Number"
        value={regNum}
        onChangeText={setRegNum}
        icon={<Navigation size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Make & Model Name"
        value={modelName}
        onChangeText={setModelName}
        icon={<Bike size={18} color={Colors.yellowPrimary} />}
      />

      <PrimaryButton
        title="Next: Vehicle Documents"
        onPress={handleNext}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.screenPadding,
    paddingTop: Spacing.xl * 1.5,
  },
  stepHeader: {
    marginBottom: Spacing.xl,
  },
  stepCounter: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
    marginTop: Spacing.xs,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
  },
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  typeCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  typeCardActive: {
    borderColor: Colors.yellowPrimary,
    backgroundColor: Colors.yellowSoft,
  },
  typeLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  typeLabelActive: {
    color: Colors.yellowPrimary,
  },
  button: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
});
