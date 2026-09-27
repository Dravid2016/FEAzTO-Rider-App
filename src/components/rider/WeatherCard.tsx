import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherData } from '../../types/weather';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { CloudRain, Sun, AlertTriangle } from 'lucide-react-native';
import { StatusBadge } from '../common/StatusBadge';

interface WeatherCardProps {
  weather: WeatherData;
  onToggleRainMode?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onToggleRainMode }) => {
  const isRain = weather.condition === 'RAIN' || weather.condition === 'HEAVY_RAIN';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggleRainMode}
      style={[
        styles.card,
        isRain ? styles.rainBorder : styles.normalBorder,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconTitleRow}>
          {isRain ? (
            <CloudRain size={24} color={Colors.info} />
          ) : (
            <Sun size={24} color={Colors.warning} />
          )}
          <View style={styles.titleCol}>
            <Text style={styles.tempText}>{weather.temperatureCelsius}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>
          </View>
        </View>
        {isRain && <StatusBadge label="+₹30 RAIN SURGE" type="success" />}
      </View>

      {weather.alertMessage && (
        <View style={styles.alertBox}>
          <AlertTriangle size={16} color={Colors.yellowPrimary} style={styles.alertIcon} />
          <Text style={styles.alertText}>{weather.alertMessage}</Text>
        </View>
      )}

      {onToggleRainMode && (
        <Text style={styles.toggleHint}>Tap to simulate Weather Change (Demo Mode)</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    marginVertical: Spacing.xs,
  },
  rainBorder: {
    borderColor: Colors.info,
    backgroundColor: '#0F1E2E',
  },
  normalBorder: {
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  titleCol: {
    justifyContent: 'center',
  },
  tempText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.yellowSoft,
    borderColor: Colors.yellowPrimary,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  alertIcon: {
    marginRight: Spacing.xs,
  },
  alertText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    flex: 1,
  },
  toggleHint: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
});
