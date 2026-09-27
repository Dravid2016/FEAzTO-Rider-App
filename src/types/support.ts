export type SupportCategory =
  | 'KITCHEN'
  | 'CUSTOMER'
  | 'PAYMENT'
  | 'VEHICLE'
  | 'APP'
  | 'ACTIVE_EMERGENCY';

export interface SupportTicket {
  id: string;
  category: SupportCategory;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  orderId?: string;
}
