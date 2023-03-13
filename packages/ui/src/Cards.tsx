import * as React from 'react';
import { Variants } from './types';

interface BasicCardsProps {
  logo: React.ReactNode;
  children: React.ReactNode;
  description: string;
  variant?: Variants;
}

export const BasicCards: React.FC<BasicCardsProps> = ({
  logo,
  children,
  description,
  variant = 'primary',
}) => {
  return (
    <div
      className={`ui-flex ui-flex-col ui-gap-4 ui-w-80 ${
        variant === 'secondary'
          ? 'ui-items-center ui-justify-center ui-content-center'
          : 'ui-items-center ui-justify-center ui-content-center sm:ui-items-start sm:ui-justify-start sm:ui-content-start'
      }`}
    >
      {logo}

      <div>{children}</div>
      <p
        className={
          variant === 'primary'
            ? 'ui-text-heading7 ui-text-label-light-secondary ui-text-center sm:ui-text-start'
            : 'ui-text-body1 ui-text-default-systemGrey-light-1 ui-text-center'
        }
      >
        {description}
      </p>
    </div>
  );
};
