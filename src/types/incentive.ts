export type IncentiveType = 'FESTIVAL' | 'RAIN' | 'PEAK' | 'STREAK' | 'WEEKLY';

export interface IncentiveCampaign {
  id: string;
  title: string;
  description: string;
  type: IncentiveType;
  rewardAmount: number;
  currentProgress: number;
  targetCount: number;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
  perDeliveryBonus?: number;
}
