import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { FileText, Calendar } from 'lucide-react-native';
import { DocumentCard } from '../../src/components/rider/DocumentCard';

export default function LicenceScreen() {
  const router = useRouter();
  const { profile, updateLicenceDetails } = useRiderStore();
  const [licenceNumber, setLicenceNumber] = useState(profile.licence.licenceNumber);
  const [expiryDate, setExpiryDate] = useState(profile.licence.expiryDate);

  const handleNext = () => {
    updateLicenceDetails({
      licenceNumber,
      expiryDate,
    });
    router.push('/(onboarding)/vehicle');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 2 OF 6</Text>
        <Text style={styles.title}>Driving Licence</Text>
        <Text style={styles.subtitle}>Provide your active commercial or transport driving licence details</Text>
      </View>

      <InputField
        label="Driving Licence Number"
        value={licenceNumber}
        onChangeText={setLicenceNumber}
        icon={<FileText size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Licence Expiry Date (YYYY-MM-DD)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        icon={<Calendar size={18} color={Colors.yellowPrimary} />}
      />

      <DocumentCard
        title="Driving Licence Front Photo"
        documentNumber={licenceNumber}
        expiryDate={expiryDate}
        status={profile.licence.status}
        onUpload={() => {}}
      />

      <DocumentCard
        title="Driving Licence Back Photo"
        status={profile.licence.status}
        onUpload={() => {}}
      />

      <PrimaryButton
        title="Next: Vehicle Details"
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
