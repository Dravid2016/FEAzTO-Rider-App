export interface IAuthService {
  requestOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; token?: string; error?: string }>;
  logout: () => Promise<void>;
}

export class MockAuthService implements IAuthService {
  async requestOtp(phone: string) {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: 'OTP 1234 sent to ' + phone };
  }

  async verifyOtp(phone: string, otp: string) {
    await new Promise((r) => setTimeout(r, 600));
    if (otp === '1234' || otp.length === 4) {
      return { success: true, token: 'mock_jwt_token_rider_8821' };
    }
    return { success: false, error: 'Invalid OTP' };
  }

  async logout() {
    await new Promise((r) => setTimeout(r, 200));
  }
}

export const authService = new MockAuthService();
