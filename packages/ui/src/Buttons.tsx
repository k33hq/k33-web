import * as React from 'react';
import { Variant, Size } from './types';

interface BasicButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
}

const getSize: Record<Size, string> = {
  large: 'ui-px-6 ui-py-4 ui-text-heading8 ui-rounded-full ui-shadow-2xl',
  medium: 'ui-px-4 ui-py-2 ui-text-body1 ui-rounded-lg ui-shadow-2xl',
  small: '',
};

const getVariant: Record<Variant, string> = {
  primary:
    'ui-bg-brand-light-primary ui-text-label-dark-primary active:ui-to-brand-light-secondary hover:ui-to-brand-light-tertiary disabled:ui-bg-default-systemGrey-light-2 disabled:ui-shadow-none focus:ui-shadow-focus',
  secondary:
    'ui-border-brand-light-primary active:ui-to-brand-light-secondary active:ui-border-none hover:ui-border-none hover:ui-bg-brand-light-tertiary hover:ui-text-label-dark-primary action:ui-text-label-dark-primary disabled:ui-border-default-systemGrey-light-2 disabled:ui-text-default-systemGrey-light-2 focus:ui-shadow-focus ui-border-2',
  tertiary: '',
};

export const BasicButton: React.FC<BasicButtonProps> = ({
  children,
  size = 'large',
  variant = 'primary',
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`${getSize[size]} ${getVariant[variant]}`}
    >
      {children}
    </button>
  );
};

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
      className="ui-text-label-dark-primary ui-py-2 ui-px-4 ui-text-body4 ui-rounded-full md:ui-py-4 md:ui-px-6 ui-bg-brand-light-primary md:ui-text-heading8 hover:ui-bg-brand-light-tertiary ui-shadow-xl "
    >
      {children}
    </button>
  );
};
