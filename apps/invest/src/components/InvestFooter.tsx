'use client';
import * as React from 'react';

import Image from 'next/image';
import logo from '../assets/logo.svg';
import { PlatformFooter } from 'platform-js';

interface InvestFooterProps {}

const InvestFooter: React.FC<InvestFooterProps> = () => {
  return (
    <div>
      <PlatformFooter
        logo={<Image src={logo} width={97} height={40} alt="logo" />}
      />
    </div>
  );
};

export default InvestFooter;
