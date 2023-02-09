import * as React from 'react';
import { Button } from 'ui';

// send email from sendgrid
// add them to  contact list
interface SendEmailProps {
  label: string;
  placeholder: string;
}

const SendEmail: React.FC<SendEmailProps> = ({ label, placeholder }) => {
  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    // validate email and send it to sendgrid
  };
  return (
    <form
      className="flex flex-row p-1 border rounded-full bg-bg-light-primary border-default-systemGrey-light-3 sm:px-2 sm:py-2 px-1 py-1 items-center focus-within:border-brand-light-primary"
      onSubmit={handleEmailSubmit}
    >
      <input
        id="email"
        name="email"
        required
        className="text-brand-light-tertiary sm:text-body1 text-body4 flex-grow border-none focus:outline-none sm:px-4 sm:py-2 px-2 py-1"
        placeholder={placeholder}
      />
      <Button type="submit">{label}</Button>
    </form>
  );
};

export default SendEmail;
