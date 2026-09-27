import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SectionHeader } from '../../src/components/common/SectionHeader';
import { StatusBadge } from '../../src/components/common/StatusBadge';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { User, Phone, MapPin, Shield, FileText, Bike, Landmark, LogOut, ChevronRight, Sliders } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useRiderStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/sign-in');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Banner */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{profile.personalDetails.fullName.charAt(0)}</Text>
        </View>

        <Text style={styles.name}>{profile.personalDetails.fullName}</Text>
        <Text style={styles.riderCode}>ID: {profile.riderCode}</Text>

        <View style={styles.badgeRow}>
          <StatusBadge label={profile.verificationStatus} type="success" />
          <StatusBadge label={`★ ${profile.rating} RATING`} type="warning" />
        </View>
      </View>

      {/* Quick Action Navigation items */}
      <SectionHeader title="Account Details" />

      <TouchableOpacity style={styles.menuCard} onPress={() => router.push('/(onboarding)/personal-details')}>
        <View style={styles.menuLeft}>
          <User size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.menuTitle}>Personal & Emergency Contact</Text>
            <Text style={styles.menuSub}>{profile.personalDetails.phone}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={Colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => router.push('/(onboarding)/licence')}>
        <View style={styles.menuLeft}>
          <FileText size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.menuTitle}>Driving Licence Details</Text>
            <Text style={styles.menuSub}>{profile.licence.licenceNumber}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={Colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => router.push('/(onboarding)/vehicle')}>
        <View style={styles.menuLeft}>
          <Bike size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.menuTitle}>Vehicle Registration</Text>
            <Text style={styles.menuSub}>{profile.vehicle.registrationNumber} ({profile.vehicle.modelName})</Text>
          </View>
        </View>
        <ChevronRight size={18} color={Colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => router.push('/(onboarding)/bank-upi')}>
        <View style={styles.menuLeft}>
          <Landmark size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.menuTitle}>Bank & UPI Account</Text>
            <Text style={styles.menuSub}>{profile.bankUpi.upiId}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={Colors.textSecondary} />
      </TouchableOpacity>

      <SectionHeader title="Help & Support" />

      <TouchableOpacity style={styles.menuCard} onPress={() => router.push('/support')}>
        <View style={styles.menuLeft}>
          <Shield size={20} color={Colors.info} />
          <View>
            <Text style={styles.menuTitle}>Support & Escalations</Text>
            <Text style={styles.menuSub}>Kitchen delay, payment query, customer issues</Text>
          </View>
        </View>
        <ChevronRight size={18} color={Colors.textSecondary} />
      </TouchableOpacity>

      <SecondaryButton
        title="Sign Out of Account"
        onPress={handleLogout}
        icon={<LogOut size={18} color={Colors.error} />}
        style={styles.logoutBtn}
        textStyle={{ color: Colors.error }}
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
    paddingBottom: Spacing.xxl * 2,
  },
  profileHeader: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    padding: Spacing.cardPadding * 1.2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.yellowSoft,
    borderWidth: 2,
    borderColor: Colors.yellowPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  riderCode: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.xs,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  menuTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  menuSub: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: Spacing.xl,
    borderColor: Colors.errorSoft,
  },
});
