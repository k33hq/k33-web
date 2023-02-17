'use client';
import * as React from 'react';
import SecondaryFooter, { SecondaryFooterProps } from './SecondaryFooter';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { Footer } from 'ui';
import { PlatformFooter } from 'platform-js';

interface ResearchFooterProps extends SecondaryFooterProps {}

const ResearchFooter: React.FC<ResearchFooterProps> = ({ categories }) => {
  return (
    <div>
      <SecondaryFooter categories={categories} />
      <PlatformFooter
        logo={<Image src={logo} width={90} height={24} alt="logo" />}
      />
    </div>
  );
};

export default ResearchFooter;
