'use client';
import * as React from 'react';
import SecondaryHeader, { SecondaryHeaderProps } from './SecondaryHeader';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import { BasicButton } from 'ui';

interface ResearchHeaderProps extends SecondaryHeaderProps {}

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ categories }) => {
  return (
    <>
      <nav className={'navbar w-full bg-bg-light-primary'}>
        <div className="md:container flex items-center h-20 justify-between">
          <Image src={logo} height={24} width={94} alt="company logo" />
          <BasicButton size="medium" variant="secondary">
            Get Started
          </BasicButton>
        </div>
      </nav>
      <SecondaryHeader categories={categories} />
    </>
  );
};

export default ResearchHeader;
