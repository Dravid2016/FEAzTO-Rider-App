import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { LayoutGrid, ShoppingBag, Calendar, Award, User } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { useOrderStore } from '../../store/orderStore';

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeOrder } = useOrderStore();

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', route: '/(tabs)', icon: LayoutGrid },
    { key: 'orders', label: 'Orders', route: '/(tabs)/orders', icon: ShoppingBag, badge: activeOrder ? 1 : 0 },
    { key: 'slots', label: 'Slots', route: '/slots', icon: Calendar },
    { key: 'incentives', label: 'Incentives', route: '/incentives', icon: Award },
    { key: 'profile', label: 'Profile', route: '/(tabs)/profile', icon: User },
  ];

  const isTabActive = (route: string) => {
    if (route === '/(tabs)') {
      return pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index';
    }
    return pathname.startsWith(route);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isTabActive(tab.route);
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => router.push(tab.route as any)}
            style={[
              styles.tabButton,
              active && styles.activeTabPill,
            ]}
          >
            <View style={styles.iconContainer}>
              <Icon
                size={active ? 18 : 20}
                color={active ? Colors.yellowPrimary : Colors.textSecondary}
              />
              {tab.badge ? (
                <View style={styles.badgeDot} />
              ) : null}
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: active ? Colors.yellowPrimary : Colors.textSecondary },
                active && styles.activeTabLabel,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#FFEAA7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTabPill: {
    flexDirection: 'row',
    backgroundColor: Colors.darkPill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderRadius: 22,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.error,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 2,
  },
  activeTabLabel: {
    fontSize: 11,
    fontWeight: Typography.fontWeight.bold,
    marginTop: 0,
    color: Colors.yellowPrimary,
  },
  demoTabBtn: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    borderRadius: 0,
    paddingLeft: 8,
  },
  demoLabel: {
    fontSize: 9,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.warning,
    marginTop: 2,
  },
});

