export type InvestorType =
  | 'PROFESSIONAL'
  | 'ELECTIVE_PROFESSIONAL'
  | 'NON_PROFESSIONAL';

export interface PhoneNumber {
  countryCode: string;
  nationalNumber: string;
}

export interface InvestorInfoOptional {
  company: string;
  name: string;
  phoneNumber: PhoneNumber;
  // cca3 code enum, update it later
  countryCode: string;
  fundName: string;
}

export interface InvestorInfo extends Partial<InvestorInfoOptional> {
  investorType: InvestorType;
}

export interface Fund {
  id: string;
}
