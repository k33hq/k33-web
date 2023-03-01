import * as React from 'react';
import { Switch, Combobox, Transition } from '@headlessui/react';

export type K33InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface InputProps extends K33InputProps {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="ui-border-2 ui-rounded-3xl ui-px-6 ui-py-7 ui-bg-bg-light-primary ui-border-default-systemGrey-light-3 ui-text-brand-light-tertiary ui-text-body2"
    />
  );
};

interface ToggleProps {
  enabled?: boolean;
  setEnabled?: (checked?: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  setEnabled,
  enabled = false,
  disabled = false,
}) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        disabled
          ? 'ui-border-default-systemGrey-light-3 ui-cursor-not-allowed ui-flex ui-flex-col ui-justify-center ui-text-center ui-items-center ui-content-center'
          : 'ui-inline-flex ui-cursor-pointer ui-relative ui-transition-colors ui-duration-200 ui-ease-in-out focus:ui-outline-none focus-visible:ui-ring-2  focus-visible:ui-ring-white focus-visible:ui-ring-opacity-75'
      }
ui-h-[28px] ui-w-[48px] ui-shrink-0 ui-rounded-full ui-border-2 ui-border-transparent`}
    >
      {disabled ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 12C1.5 10.3453 2.84297 9 4.5 9H19.5C21.1547 9 22.5 10.3453 22.5 12V21C22.5 22.6547 21.1547 24 19.5 24H4.5C2.84297 24 1.5 22.6547 1.5 21V12Z"
            fill="#C7C7CC"
          />
          <path
            opacity="0.4"
            d="M12 3C9.92812 3 8.25 4.67906 8.25 6.75V9H5.25V6.75C5.25 3.02203 8.27344 0 12 0C15.7266 0 18.75 3.02203 18.75 6.75V9H15.75V6.75C15.75 4.67906 14.0719 3 12 3Z"
            fill="#C7C7CC"
          />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className={`${enabled ? 'ui-translate-x-5' : 'ui-translate-x-0'}
ui-pointer-events-none ui-inline-block ui-h-[24px] ui-w-[24px] ui-transform ui-rounded-full ui-bg-brand-light-primary ui-shadow-lg ui-ring-0 ui-transition ui-duration-200 ui-ease-in-out`}
        />
      )}
    </Switch>
  );
};
