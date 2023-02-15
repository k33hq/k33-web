import * as React from 'react';
import { BasicButton } from './Buttons';

interface HeaderProps {
  logo: React.ReactNode;
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ logo, children }) => {
  return (
    <nav className="navbar ui-w-full ui-bg-bg-light-primary">
      <div className="md:ui-container ui-items-center ui-justify-between ui-h-20 ui-flex ui-px-6 md:ui-px-0">
        {logo}
        <div id="header-action-section">{children}</div>
      </div>
    </nav>
  );
};
