import * as React from 'react';
import { BasicButton } from '../Buttons';

export interface EmailFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  placeholder: string;
  label: string;
}

const EmailForm: React.FC<EmailFormProps> = ({
  handleSubmit,
  placeholder,
  label,
}) => {
  return (
    <form
      className="ui-flex ui-flex-row ui-p-1 ui-border ui-rounded-xl ui-bg-bg-light-primary ui-border-default-systemGrey-light-3 ui-px-1 ui-py-1 ui-items-center focus-within:ui-border-brand-light-primary ui-w-full"
      onSubmit={handleSubmit}
    >
      <input
        id="email"
        name="email"
        required
        className="ui-text-brand-light-tertiary ui-text-body1 md:ui-text-body1 sm:ui-text-body2 ui-flex-grow ui-border-none focus:ui-outline-none md:ui-px-4 md:ui-py-2 ui-px-2 ui-py-1"
        placeholder={placeholder}
      />
      <BasicButton type="submit">{label}</BasicButton>
    </form>
  );
};

export default EmailForm;
