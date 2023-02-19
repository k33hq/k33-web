import * as React from 'react';
import { Variant, Size } from './types';

export type K33ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface BasicButtonProps extends K33ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const getSize: Record<Size, string> = {
  large:
    'md:ui-px-6 md:ui-py-4 ui-px-4 ui-py-2 ui-text-body2 md:ui-text-heading8 ui-rounded-full ui-shadow-2xl',
  medium:
    'md:ui-px-4 md:ui-py-2 ui-py-1 ui-px-2 ui-text-body1 ui-rounded-lg ui-shadow-2xl',
  small: '',
};

const getVariant: Record<Variant, string> = {
  primary:
    'ui-bg-brand-light-primary ui-text-label-dark-primary active:ui-to-brand-light-secondary hover:ui-to-brand-light-tertiary disabled:ui-bg-default-systemGrey-light-2 disabled:ui-shadow-none focus:ui-shadow-focus',
  secondary:
    'ui-border-brand-light-primary ui-bg-brand-dark-primary active:ui-to-brand-light-secondary active:ui-border-none hover:ui-border-brand-light-tertiary hover:ui-bg-brand-light-tertiary hover:ui-text-label-dark-primary action:ui-text-label-dark-primary disabled:ui-border-default-systemGrey-light-2 disabled:ui-text-default-systemGrey-light-2 focus:ui-shadow-focus ui-border-2',
  tertiary: '',
};

export const BasicButton: React.FC<BasicButtonProps> = ({
  children,
  size = 'large',
  variant = 'primary',
  fullWidth = false,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`${getSize[size]} ${getVariant[variant]} ${
        fullWidth ? 'ui-w-full' : ''
      }`}
    >
      {children}
    </button>
  );
};

interface BrandButtonProps extends K33ButtonProps {
  logo: React.ReactNode;
  label: string;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  label,
  logo,
  ...props
}) => {
  return (
    <button
      {...props}
      className="active:ui-to-brand-light-secondary active:ui-border-none ui-w-full hover:ui-border-none hover:ui-bg-brand-light-tertiary hover:ui-text-label-dark-primary action:ui-text-label-dark-primary disabled:ui-border-default-systemGrey-light-2 disabled:ui-text-default-systemGrey-light-2 focus:ui-shadow-focus ui-px-4 ui-py-2 ui-text-body1 ui-rounded-lg ui-shadow-md"
    >
      <div className="ui-flex ui-flex-row ui-gap-2 md:ui-gap-4 ui-content-center ui-items-center ui-justify-center ui-w-full">
        {logo}
        {label}
      </div>
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
