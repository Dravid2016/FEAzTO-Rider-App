import { create } from 'zustand';
import { WeatherData } from '../types/weather';
import { mockNormalWeather, mockRainWeather } from '../mocks/weather';

interface UiState {
  weather: WeatherData;
  isDemoDrawerOpen: boolean;
  activeTab: string;
  toastMessage: string | null;

  // Actions
  setWeather: (weather: WeatherData) => void;
  toggleRainMode: () => void;
  setDemoDrawerOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  weather: mockRainWeather, // Default to rain active so rain incentives & raincoat warnings can be tested out-of-the-box!
  isDemoDrawerOpen: false,
  activeTab: 'index',
  toastMessage: null,

  setWeather: (weather) => set({ weather }),

  toggleRainMode: () => {
    const current = get().weather;
    if (current.condition === 'RAIN') {
      set({ weather: mockNormalWeather });
    } else {
      set({ weather: mockRainWeather });
    }
  },

  setDemoDrawerOpen: (open) => set({ isDemoDrawerOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3500);
  },

  hideToast: () => set({ toastMessage: null }),
}));
