import * as React from 'react';
import { Header, Footer } from '@/components';
import dynamic from 'next/dynamic';

interface MainLayoutProps {
  children: React.ReactNode;
}

const DynamicHeader = dynamic(
  async () => {
    return await (
      await import('@/components')
    ).Header;
  },
  { ssr: false }
);

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen">
        <DynamicHeader />
        <main className="flex lex-col md:container">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
