import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Navigation, MapPin, Compass } from 'lucide-react-native';

interface MapCardProps {
  originName: string;
  destinationName: string;
  distanceKm: number;
  estimatedMins: number;
  currentStepInstruction?: string;
  onOpenExternalMap?: () => void;
}

export const MapCard: React.FC<MapCardProps> = ({
  originName,
  destinationName,
  distanceKm,
  estimatedMins,
  currentStepInstruction = 'Head North on Main Road towards Nungambakkam High Rd',
  onOpenExternalMap,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mapVisualPlaceholder}>
        {/* Decorative Grid Lines & Route Simulation */}
        <View style={styles.routeOverlay}>
          <View style={styles.originMarker}>
            <View style={styles.dotInner} />
          </View>
          <View style={styles.routeLine} />
          <View style={styles.destMarker}>
            <MapPin size={16} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.navHeaderBadge}>
          <Compass size={16} color={Colors.yellowPrimary} />
          <Text style={styles.navHeaderText}>LIVE NAVIGATION MAP</Text>
        </View>

        {onOpenExternalMap && (
          <TouchableOpacity style={styles.openMapBtn} onPress={onOpenExternalMap}>
            <Navigation size={14} color={Colors.textDark} />
            <Text style={styles.openMapText}>Open Maps</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.navigationFooter}>
        <View style={styles.instructionRow}>
          <Navigation size={20} color={Colors.yellowPrimary} style={styles.turnIcon} />
          <View style={styles.textCol}>
            <Text style={styles.instructionText}>{currentStepInstruction}</Text>
            <Text style={styles.distanceEtaText}>
              {distanceKm} km remaining • ~{estimatedMins} mins ETA
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusLg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginVertical: Spacing.xs,
  },
  mapVisualPlaceholder: {
    height: 180,
    backgroundColor: '#121921',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    justifyContent: 'space-between',
  },
  originMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.yellowSoft,
    borderWidth: 2,
    borderColor: Colors.yellowPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.yellowPrimary,
  },
  routeLine: {
    flex: 1,
    height: 3,
    backgroundColor: Colors.yellowPrimary,
    marginHorizontal: 8,
    borderStyle: 'dashed',
  },
  destMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navHeaderBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: 'rgba(11, 11, 11, 0.85)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Spacing.borderRadiusSm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navHeaderText: {
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  openMapBtn: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.yellowPrimary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Spacing.borderRadiusSm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openMapText: {
    color: Colors.textDark,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  navigationFooter: {
    padding: Spacing.cardPadding,
    backgroundColor: Colors.elevatedSurface,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  turnIcon: {
    transform: [{ rotate: '45deg' }],
  },
  textCol: {
    flex: 1,
  },
  instructionText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  distanceEtaText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
});
