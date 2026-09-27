import { create } from 'zustand';
import { WorkSlot } from '../types/slot';

interface SlotState {
  slots: WorkSlot[];
  selectedSlotId: string | null;
  bookSlot: (slotId: string) => void;
  cancelSlot: (slotId: string) => void;
}

const mockSlots: WorkSlot[] = [
  {
    id: 'SLOT_MORNING',
    name: 'Morning Peak',
    timeRange: '06:00 – 10:00',
    status: 'AVAILABLE',
    expectedDemand: 'HIGH',
    incentiveBonusPerDelivery: 15,
    remainingCapacity: 12,
    isBooked: true,
  },
  {
    id: 'SLOT_AFTERNOON',
    name: 'Lunch Rush',
    timeRange: '12:00 – 16:00',
    status: 'LIMITED',
    expectedDemand: 'VERY_HIGH',
    incentiveBonusPerDelivery: 25,
    remainingCapacity: 3,
    isBooked: false,
  },
  {
    id: 'SLOT_EVENING',
    name: 'Dinner Peak',
    timeRange: '17:00 – 21:00',
    status: 'AVAILABLE',
    expectedDemand: 'VERY_HIGH',
    incentiveBonusPerDelivery: 30,
    remainingCapacity: 20,
    isBooked: true,
  },
  {
    id: 'SLOT_NIGHT',
    name: 'Late Night Shift',
    timeRange: '21:00 – 00:00',
    status: 'FULL',
    expectedDemand: 'NORMAL',
    incentiveBonusPerDelivery: 20,
    remainingCapacity: 0,
    isBooked: false,
  },
];

export const useSlotStore = create<SlotState>((set) => ({
  slots: mockSlots,
  selectedSlotId: 'SLOT_MORNING',

  bookSlot: (slotId) =>
    set((state) => ({
      slots: state.slots.map((s) =>
        s.id === slotId ? { ...s, isBooked: true } : s
      ),
      selectedSlotId: slotId,
    })),

  cancelSlot: (slotId) =>
    set((state) => ({
      slots: state.slots.map((s) =>
        s.id === slotId ? { ...s, isBooked: false } : s
      ),
      selectedSlotId: state.selectedSlotId === slotId ? null : state.selectedSlotId,
    })),
}));
