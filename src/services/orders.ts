import { Order, OrderLifecycleState } from '../types/order';
import { mockCanonicalOrder } from '../mocks/orders';

export interface IOrderService {
  getActiveOrder: () => Promise<Order | null>;
  acceptOrder: (orderId: string) => Promise<boolean>;
  declineOrder: (orderId: string) => Promise<boolean>;
  updateOrderState: (orderId: string, state: OrderLifecycleState) => Promise<boolean>;
  verifyCustomerOtp: (orderId: string, otp: string) => Promise<boolean>;
}

export class MockOrderService implements IOrderService {
  async getActiveOrder() {
    await new Promise((r) => setTimeout(r, 400));
    return mockCanonicalOrder;
  }

  async acceptOrder(orderId: string) {
    await new Promise((r) => setTimeout(r, 400));
    return true;
  }

  async declineOrder(orderId: string) {
    await new Promise((r) => setTimeout(r, 300));
    return true;
  }

  async updateOrderState(orderId: string, state: OrderLifecycleState) {
    await new Promise((r) => setTimeout(r, 400));
    return true;
  }

  async verifyCustomerOtp(orderId: string, otp: string) {
    await new Promise((r) => setTimeout(r, 500));
    return otp === '4829' || otp === '1234' || otp === mockCanonicalOrder.customer.deliveryOtp;
  }
}

export const orderService = new MockOrderService();
