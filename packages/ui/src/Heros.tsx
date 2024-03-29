import * as React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  bigImage: React.ReactNode;
  children: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  bigImage,
  children,
}) => {
  return (
    <div className="ui-w-full ui-flex ui-flex-col ui-mx-auto md:ui-container ui-px-6 md:ui-px-0 md:ui-flex-row ui-gap-9 ui-items-center ui-justify-between">
      <div className="ui-flex ui-flex-col ui-gap-4">
        <p className="ui-text-heading4 md:ui-text-heading2">{title}</p>
        <p className="ui-text-brand-light-tertiary md:ui-text-body4 ui-text-body3">
          {subtitle}
        </p>
        {children}
      </div>
      {bigImage}
    </div>
  );
};
