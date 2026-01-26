// Form data types for the application form
export type ReferralSource = 
  | 'social'
  | 'email'
  | 'tv'
  | 'friend'
  | 'event'
  | 'other';

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  age: number;
  occupation: string;
  experience: string;
  whyYou: string;
  socials: string;
  video: FileList;
  referral: ReferralSource;
  consent: boolean;
}

export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState {
  data: Partial<ApplicationFormData>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
  lastSaved?: Date;
}

