import type { PhoneNumber } from '.';

export interface PersonalRegistration extends PhoneNumber {
  name: string;
  country: string;
  own_initiative: boolean;
  terms_and_condition: boolean;
}
