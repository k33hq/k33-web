import * as React from 'react';
import { EmailForm } from 'ui';

// send email from sendgrid
// add them to  contact list
interface SendEmailProps {
  label: string;
  placeholder: string;
  listIds: ReadonlyArray<string>;
}

export interface EmailAddressContactList {
  emails: Array<string>;
  listIds: Array<string>;
}

export type PutEmailAddressRequest = EmailAddressContactList;

const SendEmail: React.FC<SendEmailProps> = ({
  label,
  placeholder,
  listIds,
}) => {
  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    // validate email and send it to sendgrid
    const result = await fetch(
      process.env.NEXT_PUBLIC_K33_BACKEND_URL + 'email-subscriptions',
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //@ts-ignore
          emails: [event.target.email!.value as string],
          listIds: listIds,
        } as PutEmailAddressRequest),
      }
    );
  };
  return (
    <EmailForm
      handleSubmit={handleEmailSubmit}
      label={label}
      placeholder={placeholder}
    />
  );
};

export default SendEmail;
