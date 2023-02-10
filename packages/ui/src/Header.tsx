import * as React from 'react';
import { BasicButton } from './Buttons';

export interface MainHeaderProps {
  logo: React.ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = ({ logo }) => {
  return (
    <nav className="navbar ui-w-full ui-bg-bg-light-primary">
      <div className="sm:ui-container ui-items-center ui-justify-between ui-h-20 flex">
        {logo}
        <BasicButton size="medium" variant="secondary">
          Get Started
        </BasicButton>
      </div>
    </nav>
  );
};

export default MainHeader;
