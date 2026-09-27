import { WeatherData } from '../types/weather';

export const mockNormalWeather: WeatherData = {
  condition: 'NORMAL',
  temperatureCelsius: 29,
  humidityPercentage: 65,
  description: 'Partly Cloudy • Good Riding Conditions',
  rainBonusActive: false,
  rainBonusPerDelivery: 0,
  raincoatRecommended: false,
  updatedAt: new Date().toISOString(),
};

export const mockRainWeather: WeatherData = {
  condition: 'RAIN',
  temperatureCelsius: 24,
  humidityPercentage: 88,
  description: 'Moderate Rain • High Order Demand',
  rainBonusActive: true,
  rainBonusPerDelivery: 30,
  raincoatRecommended: true,
  alertMessage: 'Rain bonus +₹30 active on all deliveries! Wear your raincoat and ride carefully.',
  updatedAt: new Date().toISOString(),
};
