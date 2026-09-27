export type NotificationType =
  | 'NEW_DELIVERY'
  | 'ORDER_UPDATE'
  | 'KITCHEN_READY'
  | 'CUSTOMER_UPDATE'
  | 'INCENTIVE'
  | 'WEATHER_ALERT'
  | 'SAFETY_ALERT'
  | 'EARNINGS'
  | 'SYSTEM';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  orderId?: string;
}
