import * as React from 'react';
import dynamic from 'next/dynamic';
import { CategoryElements } from '@/types';
import { ResearchFooter, ResearchHeader } from '@/components';

interface MainLayoutProps {
  children: React.ReactNode;
  categories: CategoryElements;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, categories }) => {
  return (
    <>
      <div className="min-h-screen pb-12">
        <ResearchHeader categories={categories} />
        <main className="flex flex-col">{children}</main>
      </div>
      <ResearchFooter categories={categories} />
    </>
  );
};

export default MainLayout;