import * as React from 'react';
import MainHeader, { MainHeaderProps } from './Header';
import { Footer } from './Footers';

interface MainLayoutProps extends MainHeaderProps {
  children: React.ReactNode;
}
export const MainLayout: React.FC<MainLayoutProps> = ({ children, logo }) => {
  return (
    <>
      <div className="ui-min-h-screen">
        <MainHeader logo={logo} />
        <main className="ui-flex ui-flex-col md:ui-container">{children}</main>
      </div>
      <Footer logo={logo} />
    </>
  );
};
