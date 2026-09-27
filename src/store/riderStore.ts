import { create } from 'zustand';
import { RiderProfile, RiderStatus, VerificationStatus } from '../types/rider';
import { mockRiderProfile } from '../mocks/rider';

interface RiderState {
  profile: RiderProfile;
  status: RiderStatus;
  shiftMinutesCount: number;
  breakStartTime: string | null;
  helmetVerified: boolean;
  raincoatVerified: boolean;
  vehicleReadyVerified: boolean;
  sosActive: boolean;

  // Actions
  setStatus: (status: RiderStatus) => void;
  goOnline: () => boolean;
  goOffline: () => void;
  startBreak: () => void;
  endBreak: () => void;
  toggleHelmetCheck: () => void;
  toggleRaincoatCheck: () => void;
  toggleVehicleCheck: () => void;
  triggerSos: () => void;
  cancelSos: () => void;
  updateProfileDetails: (details: Partial<RiderProfile['personalDetails']>) => void;
  updateLicenceDetails: (licence: Partial<RiderProfile['licence']>) => void;
  updateVehicleDetails: (vehicle: Partial<RiderProfile['vehicle']>) => void;
  updateBankDetails: (bank: Partial<RiderProfile['bankUpi']>) => void;
  setVerificationStatus: (status: VerificationStatus) => void;
}

export const useRiderStore = create<RiderState>((set, get) => ({
  profile: mockRiderProfile,
  status: 'OFFLINE',
  shiftMinutesCount: 140, // 2h 20m
  breakStartTime: null,
  helmetVerified: true,
  raincoatVerified: true,
  vehicleReadyVerified: true,
  sosActive: false,

  setStatus: (status) => set({ status }),

  goOnline: () => {
    const { helmetVerified, vehicleReadyVerified } = get();
    if (!helmetVerified || !vehicleReadyVerified) {
      return false; // Safety check required
    }
    set({
      status: 'ONLINE',
      shiftMinutesCount: get().shiftMinutesCount || 1,
    });
    return true;
  },

  goOffline: () => set({ status: 'OFFLINE' }),

  startBreak: () =>
    set({
      status: 'ON_BREAK',
      breakStartTime: new Date().toISOString(),
    }),

  endBreak: () =>
    set({
      status: 'ONLINE',
      breakStartTime: null,
    }),

  toggleHelmetCheck: () => set((state) => ({ helmetVerified: !state.helmetVerified })),
  toggleRaincoatCheck: () => set((state) => ({ raincoatVerified: !state.raincoatVerified })),
  toggleVehicleCheck: () => set((state) => ({ vehicleReadyVerified: !state.vehicleReadyVerified })),

  triggerSos: () => set({ sosActive: true }),
  cancelSos: () => set({ sosActive: false }),

  updateProfileDetails: (details) =>
    set((state) => ({
      profile: {
        ...state.profile,
        personalDetails: { ...state.profile.personalDetails, ...details },
      },
    })),

  updateLicenceDetails: (licence) =>
    set((state) => ({
      profile: {
        ...state.profile,
        licence: { ...state.profile.licence, ...licence },
      },
    })),

  updateVehicleDetails: (vehicle) =>
    set((state) => ({
      profile: {
        ...state.profile,
        vehicle: { ...state.profile.vehicle, ...vehicle },
      },
    })),

  updateBankDetails: (bank) =>
    set((state) => ({
      profile: {
        ...state.profile,
        bankUpi: { ...state.profile.bankUpi, ...bank },
      },
    })),

  setVerificationStatus: (status) =>
    set((state) => ({
      profile: { ...state.profile, verificationStatus: status },
    })),
}));
