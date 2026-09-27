export type RealtimeEventType =
  | 'ORDER_ASSIGNED'
  | 'ORDER_STATUS_CHANGED'
  | 'RIDER_STATUS_CHANGED'
  | 'KITCHEN_STATUS_CHANGED'
  | 'DELIVERY_UPDATED'
  | 'WEATHER_UPDATED'
  | 'INCENTIVE_ACTIVATED'
  | 'INCENTIVE_UPDATED'
  | 'EARNINGS_UPDATED'
  | 'SOS_CREATED'
  | 'NOTIFICATION_RECEIVED';

export type EventCallback = (payload: any) => void;

export interface IRealtimeService {
  connect: (riderId: string) => void;
  disconnect: () => void;
  subscribe: (event: RealtimeEventType, callback: EventCallback) => () => void;
  emit: (event: RealtimeEventType, payload: any) => void;
}

export class MockRealtimeService implements IRealtimeService {
  private listeners: Map<RealtimeEventType, Set<EventCallback>> = new Map();
  private isConnected: boolean = false;

  connect(riderId: string) {
    this.isConnected = true;
    console.log(`[Realtime] Connected for rider ${riderId}`);
  }

  disconnect() {
    this.isConnected = false;
    console.log('[Realtime] Disconnected');
  }

  subscribe(event: RealtimeEventType, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit(event: RealtimeEventType, payload: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(payload));
    }
  }
}

export const realtimeService = new MockRealtimeService();
