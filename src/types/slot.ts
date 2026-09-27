export type SlotStatus = 'AVAILABLE' | 'LIMITED' | 'FULL' | 'BOOKED';

export interface WorkSlot {
  id: string;
  name: string; // Morning, Afternoon, Evening, Night
  timeRange: string; // e.g. "06:00 – 10:00"
  status: SlotStatus;
  expectedDemand: 'HIGH' | 'VERY_HIGH' | 'NORMAL';
  incentiveBonusPerDelivery: number;
  remainingCapacity: number;
  isBooked: boolean;
}
