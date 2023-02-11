'use client';
import * as React from 'react';
import SecondaryFooter, { SecondaryFooterProps } from './SecondaryFooter';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { Footer } from 'ui';

interface ResearchFooterProps extends SecondaryFooterProps {}

const ResearchFooter: React.FC<ResearchFooterProps> = ({ categories }) => {
  return (
    <div>
      <SecondaryFooter categories={categories} />
      <Footer logo={<Image src={logo} width={90} height={24} alt="logo" />} />
    </div>
  );
};

export default ResearchFooter;
