import * as React from 'react';
import { BasicButton } from 'ui';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import { init } from 'core';
import config from '@/firebase/config';

const Header: React.FC = () => {
  const auth = init(config);
  return (
    <nav className="navbar w-full bg-bg-light-primary">
      <div className="md:container items-center justify-between h-20 flex flex-row">
        <Image src={logo} width={133} height={40} alt="k33-logo" />

        <BasicButton size="medium" variant="secondary">
          Get Started
        </BasicButton>
      </div>
    </nav>
  );
};

export default Header;
