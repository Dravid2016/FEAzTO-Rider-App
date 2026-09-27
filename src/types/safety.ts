export interface SafetyChecklist {
  helmetVerified: boolean;
  raincoatVerified: boolean;
  vehicleReadyVerified: boolean;
  lastCheckedAt?: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface SafetyState {
  checklist: SafetyChecklist;
  emergencyContact: EmergencyContact;
  sosActive: boolean;
  shiftMinutesCount: number;
  breakRecommended: boolean;
  onBreak: boolean;
  breakStartedAt?: string;
}
