import { PutEmailAddressRequest } from '@/types';

export const emailAdd = async (email: string) => {
  const result = await fetch(
    process.env.NEXT_PUBLIC_K33_BACKEND_URL + 'email-subscriptions',
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: [email],
        listIds: ['d2e4dc82-5cd8-4cc9-ad84-131389919f91'],
      } as PutEmailAddressRequest),
    }
  );

  return result;
};
