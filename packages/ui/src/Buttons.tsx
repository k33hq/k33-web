import * as React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="ui-text-label-dark-primary ui-py-2 ui-px-4 ui-text-body4 ui-rounded-full sm:ui-py-4 sm:ui-px-6 ui-bg-brand-light-primary sm:ui-text-heading8 hover:ui-bg-brand-light-tertiary ui-shadow-xl"
    >
      {children}
    </button>
  );
};
