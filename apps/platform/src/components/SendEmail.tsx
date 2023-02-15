import * as React from 'react';
import { emailAdd } from '@/api';
import { BasicButton } from 'ui';

// send email from sendgrid
// add them to  contact list
interface SendEmailProps {
  label: string;
  placeholder: string;
}

const SendEmail: React.FC<SendEmailProps> = ({ label, placeholder }) => {
  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    // validate email and send it to sendgrid
    //@ts-ignore
    const result = await emailAdd(event.target.email!.value as string);
    console.log(result);
  };
  return (
    <form
      className="flex flex-row p-1 border rounded-full bg-bg-light-primary border-default-systemGrey-light-3 md:px-2 md:py-2 px-1 py-1 items-center focus-within:border-brand-light-primary"
      onSubmit={handleEmailSubmit}
    >
      <input
        id="email"
        name="email"
        required
        className="text-brand-light-tertiary text-body1 md:text-body4 sm:text-body2 flex-grow border-none focus:outline-none md:px-4 md:py-2 px-2 py-1"
        placeholder={placeholder}
      />
      <BasicButton type="submit">{label}</BasicButton>
    </form>
  );
};

export default SendEmail;
