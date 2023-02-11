'use client';
import * as React from 'react';
import SecondaryHeader, { SecondaryHeaderProps } from './SecondaryHeader';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import config from '@/firebase/config';
import { Header } from 'ui';

interface ResearchHeaderProps extends SecondaryHeaderProps {}

const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => (
      <Header
        logo={<Image src={logo} height={24} width={94} alt="company logo" />}
      >
        {null}
      </Header>
    ),
    ssr: false,
  }
);

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ categories }) => {
  return (
    <>
      <AuthHeader
        logo={<Image src={logo} height={24} width={94} alt="company logo" />}
        firebaseConfig={config}
      />
      <SecondaryHeader categories={categories} />
    </>
  );
};

export default ResearchHeader;
