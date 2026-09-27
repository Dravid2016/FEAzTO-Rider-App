import { RiderProfile, RiderStatus, VerificationStatus } from '../types/rider';
import { mockRiderProfile } from '../mocks/rider';

export interface IRiderService {
  getProfile: () => Promise<RiderProfile>;
  updateStatus: (status: RiderStatus) => Promise<boolean>;
  submitOnboardingDocuments: (profile: RiderProfile) => Promise<VerificationStatus>;
}

export class MockRiderService implements IRiderService {
  async getProfile() {
    await new Promise((r) => setTimeout(r, 400));
    return mockRiderProfile;
  }

  async updateStatus(status: RiderStatus) {
    await new Promise((r) => setTimeout(r, 300));
    return true;
  }

  async submitOnboardingDocuments(profile: RiderProfile) {
    await new Promise((r) => setTimeout(r, 1000));
    return 'APPROVED' as VerificationStatus;
  }
}

export const riderService = new MockRiderService();
