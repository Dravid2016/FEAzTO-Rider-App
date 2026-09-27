import { IncentiveCampaign } from '../types/incentive';
import { mockIncentives } from '../mocks/incentives';

export interface IIncentiveService {
  getActiveIncentives: () => Promise<IncentiveCampaign[]>;
  calculateOrderBonus: (baseEarn: number, isRain: boolean, isPeak: boolean) => { rainBonus: number; peakBonus: number; total: number };
}

export class MockIncentiveService implements IIncentiveService {
  async getActiveIncentives() {
    await new Promise((r) => setTimeout(r, 400));
    return mockIncentives;
  }

  calculateOrderBonus(baseEarn: number, isRain: boolean, isPeak: boolean) {
    const rainBonus = isRain ? 30 : 0;
    const peakBonus = isPeak ? 20 : 0;
    return {
      rainBonus,
      peakBonus,
      total: baseEarn + rainBonus + peakBonus,
    };
  }
}

export const incentiveService = new MockIncentiveService();
