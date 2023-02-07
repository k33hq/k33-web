import * as React from 'react';

export interface MainHeaderProps {
  logo: React.ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = ({ logo }) => {
  return (
    <nav className="navbar ui-w-full ui-bg-bg-light-primary">
      <div className="md:ui-container ui-items-center ui-justify-between ui-h-20 flex">
        {logo}
      </div>
    </nav>
  );
};

export default MainHeader;
