import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { BottomNavigation } from '../../src/components/navigation/BottomNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="earnings" />
          <Stack.Screen name="profile" />
        </Stack>
      </View>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});
