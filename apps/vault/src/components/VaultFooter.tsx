'use client';
import * as React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { PlatformFooter } from 'platform-js';

interface VaultFooterProps {}

const VaultFooter: React.FC<VaultFooterProps> = () => {
  return (
    <div>
      <PlatformFooter
        logo={<Image src={logo} width={90} height={24} alt="logo" />}
      />
    </div>
  );
};

export default VaultFooter;
