import { create } from 'zustand';
import { Order, OrderLifecycleState, OrderExceptionState } from '../types/order';
import { mockCanonicalOrder, mockOrderHistory } from '../mocks/orders';
import { useRiderStore } from './riderStore';

interface OrderState {
  activeOrder: Order | null;
  hasIncomingOffer: boolean;
  incomingOffer: Order | null;
  orderHistory: Order[];
  error: string | null;

  // Actions
  triggerMockOffer: (order?: Order) => void;
  acceptOffer: () => boolean;
  declineOffer: () => void;
  updateOrderState: (newState: OrderLifecycleState) => void;
  updateExceptionState: (exception: OrderExceptionState) => void;
  confirmKitchenArrival: () => void;
  confirmOrderPickup: () => void;
  confirmCustomerArrival: () => void;
  verifyCustomerOtp: (otp: string) => boolean;
  completeDelivery: () => void;
  clearActiveOrder: () => void;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  activeOrder: mockCanonicalOrder, // Start with active canonical order #FA2841 for instant review & testing
  hasIncomingOffer: false,
  incomingOffer: null,
  orderHistory: mockOrderHistory,
  error: null,

  triggerMockOffer: (order = mockCanonicalOrder) => {
    const riderStatus = useRiderStore.getState().status;
    if (riderStatus !== 'ONLINE') {
      set({ error: 'Rider must be ONLINE to receive delivery offers.' });
      return;
    }
    set({
      incomingOffer: order,
      hasIncomingOffer: true,
      error: null,
    });
  },

  acceptOffer: () => {
    const riderStatus = useRiderStore.getState().status;
    if (riderStatus !== 'ONLINE' && riderStatus !== 'ON_DELIVERY') {
      set({ error: 'Cannot accept delivery while OFFLINE or ON BREAK.' });
      return false;
    }
    const offer = get().incomingOffer || mockCanonicalOrder;
    const acceptedOrder: Order = {
      ...offer,
      state: 'RIDER_ACCEPTED',
      acceptedAt: new Date().toISOString(),
    };

    useRiderStore.getState().setStatus('ON_DELIVERY');

    set({
      activeOrder: acceptedOrder,
      hasIncomingOffer: false,
      incomingOffer: null,
      error: null,
    });
    return true;
  },

  declineOffer: () => {
    set({
      hasIncomingOffer: false,
      incomingOffer: null,
    });
  },

  updateOrderState: (newState) => {
    const current = get().activeOrder;
    if (!current) return;
    set({
      activeOrder: {
        ...current,
        state: newState,
      },
    });
  },

  updateExceptionState: (exception) => {
    const current = get().activeOrder;
    if (!current) return;
    set({
      activeOrder: {
        ...current,
        exceptionState: exception,
      },
    });
  },

  confirmKitchenArrival: () => {
    const current = get().activeOrder;
    if (!current) return;
    set({
      activeOrder: {
        ...current,
        state: 'RIDER_AT_KITCHEN',
        arrivedKitchenAt: new Date().toISOString(),
      },
    });
  },

  confirmOrderPickup: () => {
    const current = get().activeOrder;
    if (!current) return;
    set({
      activeOrder: {
        ...current,
        state: 'OUT_FOR_DELIVERY',
        pickedUpAt: new Date().toISOString(),
      },
    });
  },

  confirmCustomerArrival: () => {
    const current = get().activeOrder;
    if (!current) return;
    set({
      activeOrder: {
        ...current,
        state: 'RIDER_AT_CUSTOMER',
        arrivedCustomerAt: new Date().toISOString(),
      },
    });
  },

  verifyCustomerOtp: (otp) => {
    const current = get().activeOrder;
    if (!current) return false;

    // Prototype check: allow canonical OTP or 4829/1234
    if (otp === current.customer.deliveryOtp || otp === '4829' || otp === '1234') {
      set({
        activeOrder: {
          ...current,
          state: 'DELIVERY_VERIFIED',
        },
        error: null,
      });
      return true;
    }

    set({ error: 'Invalid Customer OTP. Use correct 4-digit code.' });
    return false;
  },

  completeDelivery: () => {
    const current = get().activeOrder;
    if (!current) return;

    const completedOrder: Order = {
      ...current,
      state: 'DELIVERED',
      deliveredAt: new Date().toISOString(),
    };

    useRiderStore.getState().setStatus('ONLINE');

    set({
      activeOrder: null,
      orderHistory: [completedOrder, ...get().orderHistory],
      error: null,
    });
  },

  clearActiveOrder: () => set({ activeOrder: null }),
  clearError: () => set({ error: null }),
}));
