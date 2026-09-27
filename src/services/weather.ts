import { WeatherData } from '../types/weather';
import { mockRainWeather } from '../mocks/weather';

export interface IWeatherService {
  getCurrentWeather: () => Promise<WeatherData>;
}

export class MockWeatherService implements IWeatherService {
  async getCurrentWeather() {
    await new Promise((r) => setTimeout(r, 300));
    return mockRainWeather;
  }
}

export const weatherService = new MockWeatherService();
