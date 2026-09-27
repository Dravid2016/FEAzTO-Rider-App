import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { DocumentCard } from '../../src/components/rider/DocumentCard';

export default function DocumentsScreen() {
  const router = useRouter();
  const { profile } = useRiderStore();

  const handleNext = () => {
    router.push('/(onboarding)/bank-upi');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 4 OF 6</Text>
        <Text style={styles.title}>Vehicle Documents</Text>
        <Text style={styles.subtitle}>Upload clear photos of RC, Insurance, and Pollution certificate</Text>
      </View>

      <DocumentCard
        title="Registration Certificate (RC)"
        documentNumber={profile.vehicle.registrationNumber}
        status={profile.licence.status}
        onUpload={() => {}}
      />

      <DocumentCard
        title="Vehicle Insurance Policy"
        expiryDate="2027-08-30"
        status={profile.licence.status}
        onUpload={() => {}}
      />

      <DocumentCard
        title="Pollution Under Control (PUC)"
        expiryDate="2026-12-15"
        status={profile.licence.status}
        onUpload={() => {}}
      />

      <PrimaryButton
        title="Next: Bank & UPI Details"
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
  button: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
});
