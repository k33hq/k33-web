import * as React from 'react';
import { BasicButton } from './Buttons';

interface HeaderProps {
  logo: React.ReactNode;
  children: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  children,
  transparent = false,
}) => {
  return (
    <nav
      className={`navbar ui-w-full ${
        transparent ? '' : 'ui-bg-bg-light-primary'
      }`}
    >
      <div className="ui-container ui-items-center ui-justify-between ui-h-20 ui-flex ui-px-6">
        {logo}
        <div
          id="header-action-section"
          className="ui-flex ui-flex-row ui-gap-2 ui-items-center ui-transition-all"
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

interface SecondaryHeaderProps {
  branding: React.ReactNode;
  children: React.ReactNode;
}

export const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
  branding,
  children,
}) => {
  return (
    <nav className="ui-navbar ui-w-full ui-bg-bg-dark-primary">
      <div className="ui-container ui-flex ui-flex-row ui-gap-6 ui-items-center ui-h-10 ui-px-6 ui-overflow-auto">
        {branding}
        <div className="ui-flex-1" />
        {children}
        <div className="ui-flex-1" />
      </div>
    </nav>
  );
};
