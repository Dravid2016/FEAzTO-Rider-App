import { create } from 'zustand';
import { IncentiveCampaign } from '../types/incentive';
import { mockIncentives } from '../mocks/incentives';

interface IncentiveState {
  campaigns: IncentiveCampaign[];
  incrementProgress: (campaignId: string) => void;
  toggleRainIncentive: (active: boolean) => void;
}

export const useIncentiveStore = create<IncentiveState>((set) => ({
  campaigns: mockIncentives,

  incrementProgress: (campaignId) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) => {
        if (c.id === campaignId) {
          const next = c.currentProgress + 1;
          return {
            ...c,
            currentProgress: next,
            isCompleted: next >= c.targetCount,
          };
        }
        return c;
      }),
    })),

  toggleRainIncentive: (active) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.type === 'RAIN' ? { ...c, isCompleted: !active } : c
      ),
    })),
}));
