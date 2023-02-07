'use client';
import * as React from 'react';
import SecondaryHeader, { SecondaryHeaderProps } from './SecondaryHeader';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import Button from './Button';

interface ResearchHeaderProps extends SecondaryHeaderProps {}

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ categories }) => {
  return (
    <>
      <nav className={'navbar w-full bg-bg-light-primary'}>
        <div className="md:container flex items-center h-20 justify-between">
          <Image src={logo} height={24} width={94} alt="company logo" />
          <Button size="medium" variant="secondary" label="Get Started" />
        </div>
      </nav>
      <SecondaryHeader categories={categories} />
    </>
  );
};

export default ResearchHeader;
