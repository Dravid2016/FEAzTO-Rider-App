import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FEAztoLogo } from '../../src/components/brand/FEAztoLogo';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { Phone, ShieldAlert } from 'lucide-react-native';

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('9876543210');
  const { sendOtp, isLoading, error, clearError } = useAuthStore();

  const handleSendOtp = async () => {
    clearError();
    const success = await sendOtp(phone);
    if (success) {
      router.push('/(auth)/otp');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <FEAztoLogo size="md" />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Rider Sign In</Text>
          <Text style={styles.subtitle}>Enter your registered mobile number to get started</Text>

          <InputField
            label="Mobile Number"
            placeholder="e.g. 9876543210"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (error) clearError();
            }}
            error={error}
            icon={<Phone size={20} color={Colors.yellowPrimary} />}
          />

          <View style={styles.mockNotice}>
            <ShieldAlert size={16} color={Colors.yellowPrimary} style={{ marginRight: 6 }} />
            <Text style={styles.mockNoticeText}>
              Development Mode: Mock OTP is <Text style={{ fontWeight: 'bold' }}>1234</Text>
            </Text>
          </View>

          <PrimaryButton
            title="Continue to OTP"
            onPress={handleSendOtp}
            loading={isLoading}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to FEAzTO Rider?</Text>
          <Text
            style={styles.linkText}
            onPress={() => router.push('/(onboarding)/personal-details')}
          >
            Start Partner Registration
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    marginTop: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding * 1.2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  mockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.yellowSoft,
    borderColor: Colors.yellowPrimary,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  mockNoticeText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    flex: 1,
  },
  button: {
    marginTop: Spacing.sm,
  },
  footer: {
    marginTop: Spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  linkText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing.xs,
  },
});
