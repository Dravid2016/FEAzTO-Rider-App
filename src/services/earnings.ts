import { EarningsSummary } from '../types/earnings';

export interface IEarningsService {
  getEarningsSummary: () => Promise<EarningsSummary>;
}

export class MockEarningsService implements IEarningsService {
  async getEarningsSummary(): Promise<EarningsSummary> {
    await new Promise((r) => setTimeout(r, 400));
    return {
      todayTotal: 1240,
      todayDeliveriesCount: 8,
      todayOnlineMinutes: 280,
      thisWeekTotal: 8650,
      thisMonthTotal: 34200,
      baseEarnings: 820,
      bonusEarnings: 310,
      tipsTotal: 110,
      payoutHistory: [
        {
          id: 'PAY_991',
          date: '2026-09-25',
          amount: 7850,
          status: 'TRANSFERRED',
          referenceId: 'UPI/60291048201',
        },
        {
          id: 'PAY_988',
          date: '2026-09-18',
          amount: 8200,
          status: 'TRANSFERRED',
          referenceId: 'UPI/60290019284',
        },
      ],
      recentTransactions: [
        {
          id: 'TX_1001',
          orderId: '#FA2839',
          timestamp: '14:20',
          baseAmount: 45,
          rainBonus: 30,
          peakBonus: 0,
          incentiveBonus: 10,
          tipAmount: 20,
          totalAmount: 105,
          distanceKm: 3.3,
        },
        {
          id: 'TX_1000',
          orderId: '#FA2835',
          timestamp: '12:05',
          baseAmount: 80,
          rainBonus: 30,
          peakBonus: 20,
          incentiveBonus: 20,
          tipAmount: 50,
          totalAmount: 200,
          distanceKm: 9.2,
        },
      ],
    };
  }
}

export const earningsService = new MockEarningsService();
