import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="personal-details" />
      <Stack.Screen name="licence" />
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="documents" />
      <Stack.Screen name="bank-upi" />
      <Stack.Screen name="review" />
    </Stack>
  );
}
