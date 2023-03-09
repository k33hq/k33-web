import * as React from 'react';

export const HorizontleDivider: React.FC = () => {
  return (
    <div className="ui-h-0 ui-w-64 ui-border-1 ui-bg-default-systemGrey-light-5"></div>
  );
};

export const Dot: React.FC = () => (
  <div className="ui-min-h-[4px] ui-min-w-[4px] ui-rounded-full ui-inline-block ui-bg-label-light-secondary" />
);

export const Divider: React.FC = () => {
  return (
    <div className="ui-w-auto ui-h-px ui-bg-default-systemGrey-light-2/20" />
  );
};
