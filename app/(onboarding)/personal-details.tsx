import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useRouter } from 'expo-router';
import { User, Phone, MapPin, Shield } from 'lucide-react-native';

export default function PersonalDetailsScreen() {
  const router = useRouter();
  const { profile, updateProfileDetails } = useRiderStore();
  const [fullName, setFullName] = useState(profile.personalDetails.fullName);
  const [phone, setPhone] = useState(profile.personalDetails.phone);
  const [address, setAddress] = useState(profile.personalDetails.address);
  const [emergencyName, setEmergencyName] = useState(profile.personalDetails.emergencyContactName);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.personalDetails.emergencyContactPhone);

  const handleNext = () => {
    updateProfileDetails({
      fullName,
      phone,
      address,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
    });
    router.push('/(onboarding)/licence');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>STEP 1 OF 6</Text>
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.subtitle}>Enter your contact & emergency info for rider onboarding</Text>
      </View>

      <InputField
        label="Full Name (as on Govt ID)"
        value={fullName}
        onChangeText={setFullName}
        icon={<User size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Mobile Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        icon={<Phone size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Current Residential Address"
        value={address}
        onChangeText={setAddress}
        multiline
        numberOfLines={3}
        icon={<MapPin size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Emergency Contact Person & Relation"
        value={emergencyName}
        onChangeText={setEmergencyName}
        icon={<Shield size={18} color={Colors.yellowPrimary} />}
      />

      <InputField
        label="Emergency Contact Phone"
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        keyboardType="phone-pad"
        icon={<Phone size={18} color={Colors.yellowPrimary} />}
      />

      <PrimaryButton
        title="Next: Driving Licence"
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
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});
