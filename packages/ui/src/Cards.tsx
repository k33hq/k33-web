import * as React from 'react';

interface BasicCardsProps {
  logo: React.ReactNode;
  title: string;
  description: string;
}

export const BasicCards: React.FC<BasicCardsProps> = ({
  logo,
  title,
  description,
}) => {
  return (
    <div className="ui-flex ui-flex-col ui-gap-4 ui-w-80">
      {logo}
      <p className="ui-text-heading8 ui-text-label-light-primary">{title}</p>
      <p className="ui-text-heading8 ui-text-label-light-tertiary">
        {description}
      </p>
    </div>
  );
};
