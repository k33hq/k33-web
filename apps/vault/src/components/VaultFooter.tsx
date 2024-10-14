import * as React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { PlatformFooter } from 'platform-js';

const VaultFooter: React.FC = () => {
  return (
    <div>
      <PlatformFooter
        logo={<Image src={logo} width={97} height={40} alt="logo" />}
      />
    </div>
  );
};

export default VaultFooter;
