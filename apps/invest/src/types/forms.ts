import type { PhoneNumber } from '.';

export interface PersonalRegistration extends PhoneNumber {
  name: string;
  country: string;
}
