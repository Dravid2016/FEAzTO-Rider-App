import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { useRouter } from 'expo-router';
import { InputField } from '../src/components/common/InputField';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { ChevronLeft, HelpCircle, Store, User, CreditCard, Bike, ShieldAlert } from 'lucide-react-native';

export default function SupportScreen() {
  const router = useRouter();
  const [category, setCategory] = useState<string>('KITCHEN');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  const categories = [
    { key: 'KITCHEN', label: 'Kitchen Delay', icon: Store },
    { key: 'CUSTOMER', label: 'Customer Issue', icon: User },
    { key: 'PAYMENT', label: 'Payment Query', icon: CreditCard },
    { key: 'VEHICLE', label: 'Vehicle Issue', icon: Bike },
    { key: 'ACTIVE_EMERGENCY', label: 'Active Emergency', icon: ShieldAlert },
  ];

  const handleSubmit = () => {
    setTicketCreated(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Rider Support & Help</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {ticketCreated ? (
          <View style={styles.successCard}>
            <HelpCircle size={48} color={Colors.yellowPrimary} />
            <Text style={styles.successTitle}>Support Ticket Submitted!</Text>
            <Text style={styles.successSub}>
              Ticket <Text style={{ fontWeight: 'bold', color: Colors.yellowPrimary }}>#TICK-8842</Text> created. Support team will call your registered phone within 10 minutes.
            </Text>
            <PrimaryButton
              title="Return to Home"
              onPress={() => router.replace('/(tabs)')}
              style={styles.button}
            />
          </View>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Select Issue Category</Text>
            <View style={styles.catGrid}>
              {categories.map((cat) => {
                const active = category === cat.key;
                const Icon = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    activeOpacity={0.8}
                    onPress={() => setCategory(cat.key)}
                    style={[styles.catCard, active && styles.catCardActive]}
                  >
                    <Icon size={20} color={active ? Colors.yellowPrimary : Colors.textSecondary} />
                    <Text style={[styles.catText, active && styles.catTextActive]}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <InputField
              label="Short Issue Summary"
              placeholder="e.g. Kitchen #04 order not ready after 20 mins"
              value={subject}
              onChangeText={setSubject}
            />

            <InputField
              label="Detailed Explanation"
              placeholder="Describe what happened so support team can assist..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <PrimaryButton
              title="Submit Support Ticket"
              onPress={handleSubmit}
              style={styles.button}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl * 1.2,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl * 2,
  },
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  catCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  catCardActive: {
    borderColor: Colors.yellowPrimary,
    backgroundColor: Colors.yellowSoft,
  },
  catText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  catTextActive: {
    color: Colors.yellowPrimary,
  },
  button: {
    marginTop: Spacing.lg,
  },
  successCard: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding * 1.5,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  successTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing.md,
  },
  successSub: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
});
