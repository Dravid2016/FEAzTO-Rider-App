import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { InputField } from '../../src/components/common/InputField';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { KeyRound } from 'lucide-react-native';

export default function OtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState('1234');
  const { verifyOtp, phoneNumber, isLoading, error, clearError } = useAuthStore();

  const handleVerify = async () => {
    clearError();
    const success = await verifyOtp(otp);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP Code</Text>
        <Text style={styles.subtitle}>
          4-digit verification code sent to <Text style={styles.phoneText}>{phoneNumber}</Text>
        </Text>

        <InputField
          label="4-Digit OTP"
          placeholder="1234"
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={(text) => {
            setOtp(text);
            if (error) clearError();
          }}
          error={error}
          icon={<KeyRound size={20} color={Colors.yellowPrimary} />}
        />

        <Text style={styles.resendText}>Didn't receive code? Resend in 24s</Text>

        <PrimaryButton
          title="Verify & Continue"
          onPress={handleVerify}
          loading={isLoading}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  content: {
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
  phoneText: {
    color: Colors.yellowPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  resendText: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.xs,
  },
});
