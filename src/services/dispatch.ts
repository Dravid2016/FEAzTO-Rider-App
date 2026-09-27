export interface IDispatchService {
  requestReassignment: (orderId: string, reason: string) => Promise<boolean>;
  reportKitchenDelay: (orderId: string, minutes: number) => Promise<boolean>;
  reportDeliveryDelay: (orderId: string, reason: string) => Promise<boolean>;
}

export class MockDispatchService implements IDispatchService {
  async requestReassignment(orderId: string, reason: string) {
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }

  async reportKitchenDelay(orderId: string, minutes: number) {
    await new Promise((r) => setTimeout(r, 500));
    return true;
  }

  async reportDeliveryDelay(orderId: string, reason: string) {
    await new Promise((r) => setTimeout(r, 500));
    return true;
  }
}

export const dispatchService = new MockDispatchService();
