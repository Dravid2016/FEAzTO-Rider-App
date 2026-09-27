import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { User, FileText, Navigation, Landmark, ShieldCheck } from 'lucide-react-native';

export default function ReviewScreen() {
  const router = useRouter();
  const { profile, setVerificationStatus } = useRiderStore();

  const handleSubmit = () => {
    setVerificationStatus('PENDING');
    router.replace('/(auth)/verification-status');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 6 OF 6</Text>
        <Text style={styles.title}>Review Application</Text>
        <Text style={styles.subtitle}>Verify all details before submitting to FEAzTO Onboarding Team</Text>
      </View>

      {/* Personal Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <User size={18} color={Colors.yellowPrimary} />
          <Text style={styles.cardTitle}>Personal Details</Text>
        </View>
        <Text style={styles.itemText}>Name: {profile.personalDetails.fullName}</Text>
        <Text style={styles.itemText}>Phone: {profile.personalDetails.phone}</Text>
        <Text style={styles.itemText}>Address: {profile.personalDetails.address}</Text>
        <Text style={styles.itemText}>Emergency: {profile.personalDetails.emergencyContactName} ({profile.personalDetails.emergencyContactPhone})</Text>
      </View>

      {/* Licence Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FileText size={18} color={Colors.yellowPrimary} />
          <Text style={styles.cardTitle}>Driving Licence</Text>
        </View>
        <Text style={styles.itemText}>Licence No: {profile.licence.licenceNumber}</Text>
        <Text style={styles.itemText}>Expiry Date: {profile.licence.expiryDate}</Text>
        <StatusBadge label={profile.licence.status} type="success" />
      </View>

      {/* Vehicle Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Navigation size={18} color={Colors.yellowPrimary} />
          <Text style={styles.cardTitle}>Vehicle Information</Text>
        </View>
        <Text style={styles.itemText}>Type: {profile.vehicle.type}</Text>
        <Text style={styles.itemText}>Reg Number: {profile.vehicle.registrationNumber}</Text>
        <Text style={styles.itemText}>Model: {profile.vehicle.modelName}</Text>
      </View>

      {/* Bank Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Landmark size={18} color={Colors.yellowPrimary} />
          <Text style={styles.cardTitle}>Bank & UPI Account</Text>
        </View>
        <Text style={styles.itemText}>Holder: {profile.bankUpi.accountHolderName}</Text>
        <Text style={styles.itemText}>Account: {profile.bankUpi.accountNumber}</Text>
        <Text style={styles.itemText}>IFSC: {profile.bankUpi.ifscCode}</Text>
        <Text style={styles.itemText}>UPI: {profile.bankUpi.upiId}</Text>
      </View>

      <PrimaryButton
        title="Submit Application for Review"
        onPress={handleSubmit}
        style={styles.button}
      />

      <SecondaryButton
        title="Back to Personal Details"
        onPress={() => router.push('/(onboarding)/personal-details')}
        style={styles.secButton}
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  itemText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  button: {
    marginTop: Spacing.lg,
  },
  secButton: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
});
