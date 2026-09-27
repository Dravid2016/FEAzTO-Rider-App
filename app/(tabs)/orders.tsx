import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SectionHeader } from '../../src/components/common/SectionHeader';
import { OrderCard } from '../../src/components/delivery/OrderCard';
import { Pill } from '../../src/components/common/Pill';
import { EmptyState } from '../../src/components/common/EmptyState';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useOrderStore } from '../../src/store/orderStore';
import { Order } from '../../src/types/order';
import { useRouter } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';

export default function OrdersScreen() {
  const router = useRouter();
  const { activeOrder, orderHistory } = useOrderStore();
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const filteredHistory = orderHistory.filter((order) => {
    if (filter === 'COMPLETED') return order.state === 'DELIVERED';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Delivery History</Text>
        <Text style={styles.subtitle}>Canonical Order Tracking Ecosystem</Text>
      </View>

      <View style={styles.filterRow}>
        <Pill label="All Orders" active={filter === 'ALL'} onPress={() => setFilter('ALL')} />
        <Pill label="Active" active={filter === 'ACTIVE'} onPress={() => setFilter('ACTIVE')} />
        <Pill label="Completed" active={filter === 'COMPLETED'} onPress={() => setFilter('COMPLETED')} />
      </View>

      <FlatList
        data={filter === 'ACTIVE' ? (activeOrder ? [activeOrder] : []) : filteredHistory}
        keyExtractor={(item: Order) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          activeOrder && filter !== 'COMPLETED' ? (
            <View style={styles.activeSection}>
              <SectionHeader title="Active Order In-Progress" />
              <OrderCard
                order={activeOrder}
                actionTitle="Open Live Delivery Flow"
                onPressAction={() => router.push('/delivery')}
                onPressDetails={() => router.push('/delivery')}
              />
            </View>
          ) : null
        }
        renderItem={({ item }: { item: Order }) => (
          <OrderCard
            order={item}
            onPressDetails={() => {
              // History view
            }}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No orders found"
            description="You don't have any past or active orders in this filter."
            icon={<ShoppingBag size={40} color={Colors.textMuted} />}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xxl * 2,
  },
  activeSection: {
    marginBottom: Spacing.md,
  },
});
