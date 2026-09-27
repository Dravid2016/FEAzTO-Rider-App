import { SupportCategory, SupportTicket } from '../types/support';

export interface ISupportService {
  createTicket: (category: SupportCategory, subject: string, description: string, orderId?: string) => Promise<SupportTicket>;
}

export class MockSupportService implements ISupportService {
  async createTicket(category: SupportCategory, subject: string, description: string, orderId?: string): Promise<SupportTicket> {
    await new Promise((r) => setTimeout(r, 600));
    return {
      id: 'TICK_' + Math.floor(1000 + Math.random() * 9000),
      category,
      subject,
      description,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      orderId,
    };
  }
}

export const supportService = new MockSupportService();
