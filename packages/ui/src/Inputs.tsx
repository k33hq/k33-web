import * as React from 'react';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="ui-border-2 ui-rounded-3xl ui-px-6 ui-py-7 ui-bg-bg-light-primary ui-border-default-systemGrey-light-3 ui-text-brand-light-tertiary ui-text-body2"
    />
  );
};
