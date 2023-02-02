import * as React from 'react';
import ResearchHeader from '../ResearchHeader';
import ResearchFooter from '../ResearchFooter';
import { CategoryElements } from '@/types/domain';

interface MainProps {
  categories: CategoryElements;
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children, categories }) => {
  return (
    <>
      <ResearchHeader categories={categories} />
      <main className="flex flex-col">{children}</main>
      <ResearchFooter categories={categories} />
    </>
  );
};

export default Main;
