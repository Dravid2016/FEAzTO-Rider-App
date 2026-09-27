import { RiderProfile } from '../types/rider';

export const mockRiderProfile: RiderProfile = {
  id: 'RIDER_10294',
  riderCode: 'FA-R-8821',
  status: 'OFFLINE',
  verificationStatus: 'APPROVED',
  rating: 4.92,
  completedOrdersCount: 428,
  joinedDate: '2024-03-15',
  personalDetails: {
    fullName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.rider@feazto.com',
    address: '14, 2nd Main Road, Anna Nagar, Chennai, TN',
    emergencyContactName: 'Suresh Kumar (Brother)',
    emergencyContactPhone: '+91 98765 00000',
  },
  licence: {
    licenceNumber: 'TN-01-2021-0098765',
    expiryDate: '2031-10-24',
    frontImageUri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    backImageUri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    status: 'VERIFIED',
  },
  vehicle: {
    type: 'SCOOTER',
    registrationNumber: 'TN 07 CA 4920',
    modelName: 'TVS Jupiter 125',
    rcDocumentUri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    insuranceDocumentUri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    pucDocumentUri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
  },
  bankUpi: {
    accountHolderName: 'Rajesh Kumar',
    accountNumber: '9988221100345',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank',
    upiId: 'rajeshkumar@upi',
  },
};
