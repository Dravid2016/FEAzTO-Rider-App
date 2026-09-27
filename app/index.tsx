import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FEAztoLogo } from '../src/components/brand/FEAztoLogo';
import { Colors } from '../src/constants/colors';
import { useAuthStore } from '../src/store/authStore';
import { useRiderStore } from '../src/store/riderStore';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const verificationStatus = useRiderStore((s) => s.profile.verificationStatus);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/(auth)/sign-in');
      } else if (verificationStatus === 'PENDING' || verificationStatus === 'NEEDS_CORRECTION') {
        router.replace('/(auth)/verification-status');
      } else {
        router.replace('/(tabs)');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, verificationStatus]);

  return (
    <View style={styles.container}>
      <FEAztoLogo size="lg" showSubtitle={true} />
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="small" color={Colors.yellowPrimary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingWrapper: {
    position: 'absolute',
    bottom: 80,
  },
});
