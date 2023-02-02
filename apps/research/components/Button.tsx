import * as React from 'react';

export type Variant = 'secondary' | 'primary';
export type Size = 'small' | 'medium';

interface ButtonProps {
  label: string;
  variant?: Variant;
  size?: Size;
}

// TODO: update the shadows
const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
}) => {
  const defaultStyle = 'items center';
  const sizeStyles = size === 'medium' ? 'h-10' : '';
  const style =
    variant === 'secondary'
      ? 'border-2 rounded-lg border-brand-light-primary px-4 py-2 text-body1 drop-shadow-xl'
      : '';
  return (
    <button className={defaultStyle + ' ' + style + ' ' + sizeStyles}>
      {label}
    </button>
  );
};

export default Button;
