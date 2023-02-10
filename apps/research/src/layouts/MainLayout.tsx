import * as React from 'react';
import dynamic from 'next/dynamic';
import { CategoryElements } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
  categories: CategoryElements;
}

const DynamicHeader = dynamic(
  async () => {
    return await (
      await import('@/components')
    ).ResearchHeader;
  },
  { ssr: false }
);

const DynanamicFooter = dynamic(
  async () => {
    return await (
      await import('@/components')
    ).ResearchFooter;
  },
  { ssr: false }
);

const MainLayout: React.FC<MainLayoutProps> = ({ children, categories }) => {
  return (
    <>
      <div className="min-h-screen">
        <DynamicHeader categories={categories} />
        <main className="flex flex-col">{children}</main>
      </div>
      <DynanamicFooter categories={categories} />
    </>
  );
};

export default MainLayout;
