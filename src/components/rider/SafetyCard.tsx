import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { ShieldCheck, CheckSquare, Square, AlertOctagon, Coffee } from 'lucide-react-native';

interface SafetyCardProps {
  helmetVerified: boolean;
  raincoatVerified: boolean;
  vehicleVerified: boolean;
  shiftMinutesCount: number;
  onToggleHelmet: () => void;
  onToggleRaincoat: () => void;
  onToggleVehicle: () => void;
  onTakeBreak?: () => void;
  onTriggerSos?: () => void;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({
  helmetVerified,
  raincoatVerified,
  vehicleVerified,
  shiftMinutesCount,
  onToggleHelmet,
  onToggleRaincoat,
  onToggleVehicle,
  onTakeBreak,
  onTriggerSos,
}) => {
  const hours = Math.floor(shiftMinutesCount / 60);
  const mins = shiftMinutesCount % 60;
  const isShiftLong = shiftMinutesCount >= 180; // 3 hours

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <ShieldCheck size={20} color={Colors.yellowPrimary} />
          <Text style={styles.title}>Rider Safety & Readiness</Text>
        </View>
        <Text style={styles.shiftTime}>Online: {hours}h {mins}m</Text>
      </View>

      <View style={styles.checklist}>
        <TouchableOpacity activeOpacity={0.7} style={styles.checkItem} onPress={onToggleHelmet}>
          {helmetVerified ? (
            <CheckSquare size={20} color={Colors.success} />
          ) : (
            <Square size={20} color={Colors.textMuted} />
          )}
          <Text style={[styles.checkText, helmetVerified && styles.checkTextActive]}>
            Helmet Verified & Buckled
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.checkItem} onPress={onToggleRaincoat}>
          {raincoatVerified ? (
            <CheckSquare size={20} color={Colors.success} />
          ) : (
            <Square size={20} color={Colors.textMuted} />
          )}
          <Text style={[styles.checkText, raincoatVerified && styles.checkTextActive]}>
            Raincoat & Safety Kit Ready
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.checkItem} onPress={onToggleVehicle}>
          {vehicleVerified ? (
            <CheckSquare size={20} color={Colors.success} />
          ) : (
            <Square size={20} color={Colors.textMuted} />
          )}
          <Text style={[styles.checkText, vehicleVerified && styles.checkTextActive]}>
            Vehicle Brake & Tire Readiness
          </Text>
        </TouchableOpacity>
      </View>

      {isShiftLong && onTakeBreak && (
        <View style={styles.breakBanner}>
          <Coffee size={18} color={Colors.info} />
          <View style={styles.breakTextCol}>
            <Text style={styles.breakTitle}>Recommended: Take a 15-min Break</Text>
            <Text style={styles.breakSubtitle}>You've been active for over 3 hours. Rest keeps you safe!</Text>
          </View>
          <TouchableOpacity style={styles.breakButton} onPress={onTakeBreak}>
            <Text style={styles.breakButtonText}>Take Break</Text>
          </TouchableOpacity>
        </View>
      )}

      {onTriggerSos && (
        <TouchableOpacity activeOpacity={0.8} style={styles.sosButton} onPress={onTriggerSos}>
          <AlertOctagon size={18} color="#FFFFFF" />
          <Text style={styles.sosText}>EMERGENCY SOS ASSISTANCE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  shiftTime: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  checklist: {
    gap: Spacing.sm,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  checkTextActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  breakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.infoSoft,
    borderColor: Colors.info,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    padding: Spacing.sm,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  breakTextCol: {
    flex: 1,
  },
  breakTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  breakSubtitle: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  breakButton: {
    backgroundColor: Colors.info,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Spacing.borderRadiusSm,
  },
  breakButtonText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  sosButton: {
    backgroundColor: Colors.error,
    borderRadius: Spacing.borderRadiusSm,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: 1,
  },
});
