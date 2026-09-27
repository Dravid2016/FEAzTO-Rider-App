export type RiderStatus = 'OFFLINE' | 'ONLINE' | 'ON_DELIVERY' | 'ON_BREAK';

export type VerificationStatus = 'PENDING' | 'NEEDS_CORRECTION' | 'VERIFIED' | 'APPROVED';

export interface PersonalDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface DrivingLicence {
  licenceNumber: string;
  expiryDate: string;
  frontImageUri?: string;
  backImageUri?: string;
  status: VerificationStatus;
}

export interface VehicleDetails {
  type: 'BIKE' | 'SCOOTER' | 'ELECTRIC_VEHICLE' | 'BICYCLE';
  registrationNumber: string;
  modelName: string;
  rcDocumentUri?: string;
  insuranceDocumentUri?: string;
  pucDocumentUri?: string;
}

export interface BankUpiDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  upiId: string;
}

export interface RiderProfile {
  id: string;
  riderCode: string;
  status: RiderStatus;
  verificationStatus: VerificationStatus;
  rating: number;
  completedOrdersCount: number;
  joinedDate: string;
  personalDetails: PersonalDetails;
  licence: DrivingLicence;
  vehicle: VehicleDetails;
  bankUpi: BankUpiDetails;
  shiftStartTime?: string;
}
