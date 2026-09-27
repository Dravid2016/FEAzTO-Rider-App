export type OrderLifecycleState =
  | 'PLACED'
  | 'KITCHEN_ACCEPTED'
  | 'PREPARING'
  | 'READY'
  | 'RIDER_ASSIGNED'
  | 'RIDER_ACCEPTED'
  | 'RIDER_AT_KITCHEN'
  | 'PICKED_UP'
  | 'OUT_FOR_DELIVERY'
  | 'RIDER_AT_CUSTOMER'
  | 'DELIVERY_VERIFIED'
  | 'DELIVERED'
  | 'CLOSED';

export type OrderExceptionState =
  | 'NONE'
  | 'CANCELLED'
  | 'RIDER_DECLINED'
  | 'REASSIGNMENT_REQUIRED'
  | 'KITCHEN_DELAY'
  | 'DELIVERY_DELAY'
  | 'CUSTOMER_UNAVAILABLE'
  | 'DELIVERY_FAILED'
  | 'SUPPORT_ESCALATION';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  instructions?: string;
}

export interface KitchenInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  instructions?: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  instructions?: string;
  deliveryOtp: string;
}

export interface EarningsBreakdown {
  baseEarnings: number;
  rainBonus: number;
  peakBonus: number;
  distanceBonus: number;
  tip: number;
  totalEarnings: number;
}

export interface Order {
  id: string; // Canonical Order ID e.g. "#FA2841"
  state: OrderLifecycleState;
  exceptionState: OrderExceptionState;
  kitchen: KitchenInfo;
  customer: CustomerInfo;
  items: OrderItem[];
  pickupDistanceKm: number;
  deliveryDistanceKm: number;
  estimatedTimeMinutes: number;
  earnings: EarningsBreakdown;
  assignedAt: string;
  acceptedAt?: string;
  arrivedKitchenAt?: string;
  pickedUpAt?: string;
  arrivedCustomerAt?: string;
  deliveredAt?: string;
}
