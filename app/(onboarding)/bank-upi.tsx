import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { CreditCard, Landmark, AtSign, User } from 'lucide-react-native';

export default function BankUpiScreen() {
  const router = useRouter();
  const { profile, updateBankDetails } = useRiderStore();
  const [holderName, setHolderName] = useState(profile.bankUpi.accountHolderName);
  const [accountNum, setAccountNum] = useState(profile.bankUpi.accountNumber);
  const [ifsc, setIfsc] = useState(profile.bankUpi.ifscCode);
  const [bankName, setBankName] = useState(profile.bankUpi.bankName);
  const [upiId, setUpiId] = useState(profile.bankUpi.upiId);

  const handleNext = () => {
    updateBankDetails({
      accountHolderName: holderName,
      accountNumber: accountNum,
      ifscCode: ifsc,
      bankName,
      upiId,
    });
    router.push('/(onboarding)/review');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 5 OF 6</Text>
        <Text style={styles.title}>Bank & UPI Payouts</Text>
        <Text style={styles.subtitle}>Enter account details for weekly direct earnings transfer</Text>
      </View>

      <InputField
        label="Account Holder Name"
        value={holderName}
        onChangeText={setHolderName}
        icon={<User size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Bank Account Number"
        value={accountNum}
        onChangeText={setAccountNum}
        keyboardType="number-pad"
        icon={<CreditCard size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="IFSC Code"
        value={ifsc}
        onChangeText={setIfsc}
        autoCapitalize="characters"
        icon={<Landmark size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Bank Name"
        value={bankName}
        onChangeText={setBankName}
        icon={<Landmark size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="UPI ID (for instant payouts)"
        value={upiId}
        onChangeText={setUpiId}
        icon={<AtSign size={18} color={Colors.yellowPrimary} />}
      />

      <PrimaryButton
        title="Next: Review Application"
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
