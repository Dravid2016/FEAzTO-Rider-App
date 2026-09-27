import { AppNotification } from '../types/notification';

export interface INotificationService {
  getNotifications: () => Promise<AppNotification[]>;
  markAsRead: (id: string) => Promise<boolean>;
}

export class MockNotificationService implements INotificationService {
  async getNotifications(): Promise<AppNotification[]> {
    return [
      {
        id: 'NOTIF_1',
        type: 'RAIN_ALERT' as any,
        title: 'Rain Bonus Active (+₹30)',
        message: 'High demand area around Nungambakkam. Keep safe and stay online for extra rewards!',
        timestamp: '10 mins ago',
        isRead: false,
      },
      {
        id: 'NOTIF_2',
        type: 'NEW_DELIVERY',
        title: 'New Delivery Assigned #FA2841',
        message: 'Pickup from FEAzTO Cloud Kitchen #04. Total payout ₹162.',
        timestamp: 'Just now',
        isRead: false,
        orderId: '#FA2841',
      },
    ];
  }

  async markAsRead(id: string) {
    return true;
  }
}

export const notificationService = new MockNotificationService();
