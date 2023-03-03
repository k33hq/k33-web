import * as React from 'react';
import { K33ButtonProps } from 'ui';

interface SurveyButtonProps extends K33ButtonProps {
  letter: string;
  label: string;
}

const SurveyButton: React.FC<SurveyButtonProps> = ({
  letter,
  label,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className="flex flex-row gap-2 items-center border-2 rounded-xl border-brand-light-primary pr-2 pl-1 py-1 hover:border-brand-dark-primary hover:bg-brand-light-tertiary hover:text-brand-dark-primary ring-1 ring-brand-light-tertiary ring-opacity-10 text-brand-light-primary text-small md:text-body1"
    >
      <div className="border-2 px-[6px] rounded-lg">{letter}</div>
      {label}
    </button>
  );
};

export default SurveyButton;
