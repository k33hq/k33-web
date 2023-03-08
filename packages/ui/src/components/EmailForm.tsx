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
      className="ui-flex ui-flex-row ui-border ui-rounded-xl ui-bg-bg-light-primary ui-border-default-systemGrey-light-3 ui-items-center md:ui-px-2 md:ui-py-2 ui-px-2 ui-py-2 focus-within:ui-border-brand-light-primary ui-justify-between"
      onSubmit={handleSubmit}
    >
      <input
        id="email"
        name="email"
        required
        className="ui-text-brand-light-tertiary ui-font-[300] ui-text-[14px] ui-leading-6 md:ui-text-body1 ui-border-none focus:ui-outline-none md:ui-py-2 md:ui-pl-6 ui-px-1 ui-py-0 ui-w-full md:ui-text-[20px]"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="ui-text-caption ui-text-label-dark-primary ui-px-3 ui-py-[6px] ui-rounded-md ui-drop-shadow-xl ui-bg-brand-light-primary ui-min-w-[100px] md:ui-min-w-[186px] md:ui-rounded-xl md:ui-px-6 md:ui-py-4 md:ui-font-[500] md:ui-text-[24px] md:ui-leading-8"
      >
        {label}
      </button>
    </form>
  );
};

export default EmailForm;
