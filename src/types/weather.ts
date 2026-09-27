export type WeatherCondition =
  | 'NORMAL'
  | 'RAIN'
  | 'HEAVY_RAIN'
  | 'HEAT'
  | 'STORM_ALERT';

export interface WeatherData {
  condition: WeatherCondition;
  temperatureCelsius: number;
  humidityPercentage: number;
  description: string;
  rainBonusActive: boolean;
  rainBonusPerDelivery: number;
  raincoatRecommended: boolean;
  alertMessage?: string;
  updatedAt: string;
}
