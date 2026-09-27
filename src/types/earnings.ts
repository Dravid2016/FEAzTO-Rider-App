export interface EarningTransaction {
  id: string;
  orderId: string;
  timestamp: string;
  baseAmount: number;
  rainBonus: number;
  peakBonus: number;
  incentiveBonus: number;
  tipAmount: number;
  totalAmount: number;
  distanceKm: number;
}

export interface EarningsSummary {
  todayTotal: number;
  todayDeliveriesCount: number;
  todayOnlineMinutes: number;
  thisWeekTotal: number;
  thisMonthTotal: number;
  baseEarnings: number;
  bonusEarnings: number;
  tipsTotal: number;
  payoutHistory: {
    id: string;
    date: string;
    amount: number;
    status: 'TRANSFERRED' | 'PROCESSING' | 'PENDING';
    referenceId: string;
  }[];
  recentTransactions: EarningTransaction[];
}
