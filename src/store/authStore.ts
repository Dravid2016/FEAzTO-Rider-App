import { create } from 'zustand';
import { VerificationStatus } from '../types/rider';

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string;
  otpSent: boolean;
  isLoading: boolean;
  error: string | null;
  verificationStatus: VerificationStatus;
  
  // Actions
  setPhoneNumber: (phone: string) => void;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  setVerificationStatus: (status: VerificationStatus) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default to authenticated for dev prototype flow
  phoneNumber: '+91 98765 43210',
  otpSent: false,
  isLoading: false,
  error: null,
  verificationStatus: 'APPROVED',

  setPhoneNumber: (phone) => set({ phoneNumber: phone }),

  sendOtp: async (phone) => {
    set({ isLoading: true, error: null });
    await new Promise((res) => setTimeout(res, 800));
    if (phone.trim().length < 10) {
      set({ isLoading: false, error: 'Please enter a valid 10-digit mobile number' });
      return false;
    }
    set({ phoneNumber: phone, otpSent: true, isLoading: false });
    return true;
  },

  verifyOtp: async (otp) => {
    set({ isLoading: true, error: null });
    await new Promise((res) => setTimeout(res, 800));
    if (otp !== '1234' && otp.length !== 4) {
      set({ isLoading: false, error: 'Invalid OTP. Use 1234 for testing.' });
      return false;
    }
    set({ isAuthenticated: true, isLoading: false, otpSent: false });
    return true;
  },

  setVerificationStatus: (status) => set({ verificationStatus: status }),

  logout: () =>
    set({
      isAuthenticated: false,
      phoneNumber: '',
      otpSent: false,
      error: null,
    }),

  clearError: () => set({ error: null }),
}));
